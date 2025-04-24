import React, { useRef, useState, useEffect } from 'react';
import tvTuboImage from './images/tv-tubo.png';
import senacImage from './images/senac.png';
import lingprogImage from './images/lingprog.png';
import mkImage from './images/mk.png';
import tabletImage from './images/tablet.jpg';

const timelineContainerStyle = {
  display: 'flex',
  overflowX: 'auto',
  overflowY: 'hidden',
  width: '100%',
  border: '1px solid #ccc',
  height: '100vh',
  position: 'relative',
  cursor: 'grab',
  userSelect: 'none',
  scrollBehavior: 'smooth'
};

const yearSectionStyle = {
  width: '100%',
  flexShrink: 0,
  height: '100%',
  padding: '20px',
  boxSizing: 'border-box',
  scrollSnapAlign: 'start',
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden'
};

const middleLineStyle = {
  position: 'absolute',
  top: '50%',
  left: 0,
  height: '3px',
  width: `${7 * 100}%`, // Adjust width based on number of items
  transform: 'translateY(-50%)',
  zIndex: 1,
  background: 'linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.6), rgba(0,0,0,0.1))',
  animation: 'pulse-line 3s infinite ease-in-out'
};

const yearMarkerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '12px',
  height: '12px',
  backgroundColor: '#555',
  borderRadius: '50%',
  border: '2px solid white',
  zIndex: 3
};

const contentBlockStyle = {
  textAlign: 'center',
  padding: '10px 0',
  transform: 'translateY(0)' // Default transform
};

const timelineData = [
  { year: '2011', content: 'Foi entre 2011 e 2012 que comecei a mexer no computador e na internet. Foram nesses momentos iniciais que eu descobri que gostava de jogar e usar o computador.' },
  {
    year: '2015',
    content: 'Em 2015 ganhei meu primeiro tablet, e comecei a usar ainda mais o computador para jogos, gostava dos jogos de navergador, como agar.io, slither.io, roblox. Além de ter conhecido o Skype e o gmail.',
    image: tabletImage,
    imageBelow: true // Indicate image should be below the text/year
  },
  {
    year: '2022',
    content: 'Foi nesse ano em que eu descobri a programação de fato. Tive aulas sobre python, html e css de forma bem básica no Dom alberto. E foram com esses conhecimentos básicos que criei meu primeiro site, sobre atletlas de fisiculturismo.',
    image: lingprogImage,
    textAbove: true, // Indicate text should be above the image
    imageBelow: true // Even if text is above, specify image position relative to midline logic
  },
  {
    year: '2023',
    content: '2023 surgiram oportunidade de desenvolvimento na área da programação, por estar estudando no Senac. Também cheguei a fazer meu primeiro curso focado no que eu queria seguir, que era o curso de lógica de programação. Foi nesse ano que coloquei todos os meus conhecimentos adquiridos em prática, fazendo, principalmente, sites e alguns jogos simples.',
    image: senacImage,
    textBelow: true, // Indicate text should be below the image
    imageAbove: true // Specify image position relative to midline logic
  },
  {
    year: '2024',
    content: 'Ano passado entrei para a MK Solutions, uma empresa de tecnologia, que vem de frente com o que desejo para o meu futuro. Já aprendi várias coisas, nem todas relacionadas a programação, mas outras coisas muito importantes do mercado de trabalho. E espero coseguir alcançar um setor em que mexa especificamente com programação para que eu possa continuar em aprendizado na programação, mas de forma mais prática e já aplicada no mercado de trabaho.',
    image: mkImage,
    imageBelow: true // Indicate image should be below the text/year
  },
  { year: <span style={{ fontWeight: 'bold' }}>Futuro</span>, content: 'Bom, o que eu desejo para o meu futuro é trabalhar como full-stack, escrevendo códigos, especificamente. Pretendo trabalhar para uma empresa do exterior e já estar morando no exterior também.' },
  // Swapped year and content as requested
  { year: 'Qual sentido para mim?', content: 'Acho que a programação bate com diversos ideias meus, como a liberdade, de poder trabalhar de casa, e sobrar tempo para a família, quando eu tiver uma. Além de explorar o racíocio lógico e a criatividade, que eu acho que são pontos muitos importantes nas nossas vidas, também explora a questão da inovação, porque sempre há um jeito novo ou melhor de escrever o código que esta escrito. ' }
];

const Timeline = () => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);

  useEffect(() => {
    // Adjust cursor style based on dragging state
    if (containerRef.current) {
      containerRef.current.style.cursor = isDragging ? 'grabbing' : 'grab';
      // Ensure snap is enabled initially or after drag ends
      containerRef.current.style.scrollSnapType = 'x mandatory';
    }
  }, [isDragging]);

  const enableSnap = () => {
    if (containerRef.current) {
      containerRef.current.style.scrollSnapType = 'x mandatory';
    }
  };

  const disableSnap = () => {
    if (containerRef.current) {
      containerRef.current.style.scrollSnapType = 'none'; // Temporarily disable snap during drag
    }
  };

  const handleMouseDown = (e) => {
    if (!containerRef.current) return;
    disableSnap(); // Disable snap when starting drag
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeftStart(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      enableSnap(); // Re-enable snap when mouse leaves container while dragging
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      enableSnap(); // Re-enable snap when drag finishes
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault(); // Prevent default drag behavior
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Multiplier for faster scrolling feel
    containerRef.current.scrollLeft = scrollLeftStart - walk;
  };

  // Touch event handlers mirroring mouse events
  const handleTouchStart = (e) => {
    if (!containerRef.current || e.touches.length === 0) return;
    disableSnap();
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeftStart(containerRef.current.scrollLeft);
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      enableSnap();
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !containerRef.current || e.touches.length === 0) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeftStart - walk;
  };

  return (
    <div
      ref={containerRef}
      style={timelineContainerStyle}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      {/* Center Line */}
      <div style={middleLineStyle} />

      {/* Background Image */}
      <img
        src={tvTuboImage}
        alt="TV Tubo"
        style={{
          position: 'absolute',
          top: 'calc(50% + 25px)', // Position below the midline
          left: '50%', // Centered horizontally
          transform: 'translateX(-50%)',
          zIndex: 1, // Behind content but above background
          width: '300px', // Adjust size as needed
          opacity: 0.8, // Slightly transparent
          pointerEvents: 'none' // Prevent interaction
        }}
      />

      {/* Map through timeline data */}
      {timelineData.map((item, index) => (
        // Each year gets a full-width section for snapping
        <div key={index} style={{ width: '100%', flexShrink: 0 }}>
          <div
            style={{
              ...yearSectionStyle,
              // Adjust padding for specific items if needed (example for 2024)
              paddingTop: item.year === '2024' ? '0px' : '20px',
              paddingBottom: item.year === '2024' ? '0px' : '20px'
            }}
          >
            {/* Year Marker on the Center Line */}
            <div style={yearMarkerStyle}></div>

            {/* Conditional Rendering for Image Above Text */}
            {item.imageAbove && (
              <img
                src={item.image}
                alt={`Imagem de ${item.year}`}
                style={{
                  marginBottom: '40px', // Space between image and midline/text
                  width: '200px', // Adjust size
                  borderRadius: '8px',
                  zIndex: 4 // Ensure image is above the line/marker
                }}
              />
            )}

            {/* Conditional Rendering for Text Above Image/Midline */}
            {item.textAbove && (
              <div style={{
                ...contentBlockStyle,
                marginBottom: '5px', // Space below text block
                transform: 'translateY(-5px)' // Fine-tune vertical position
              }}>
                <p>{item.content}</p>
                <h2 style={{ marginTop: '4px' }}>{item.year}</h2>
              </div>
            )}

            {/* Default Content Block (Alternating position based on index) */}
            {!item.textAbove && !item.textBelow && (
              <div style={{
                ...contentBlockStyle,
                 // Adjust margins for specific items or based on index for alternating effect
                marginBottom: item.year === '2015' ? '30px' :
                  item.year === '2024' ? '30px' :
                  // Conditional margin for the last item (index 6 after swapping)
                  index === 6 ? '60px' : // Example: Push last item down
                  index % 2 === 0 ? '60px' : 0, // Push down if even index (excluding last)
                marginTop: item.year === '2024' ? '10px' :
                  // Conditional margin for the last item (index 6 after swapping)
                  index === 6 ? 0 : // Example: No top margin for last item
                  index % 2 !== 0 ? '60px' : 0, // Push up if odd index (excluding last)
                // Apply transform to vertically shift based on index for alternating effect
                 transform: `translateY(${
                    item.year === '2024' ? '0' :
                    // Conditional transform for the last item
                    index === 6 ? '-20px' : // Example: Shift last item up slightly
                    index % 2 === 0 ? '-20px' : '20px'})` // Alternating shift for others
              }}>
                <p>{item.content}</p>
                <h2>{item.year}</h2>
              </div>
            )}

            {/* Conditional Rendering for Text Below Image/Midline */}
            {item.textBelow && (
              <div style={{ ...contentBlockStyle /* Add specific styling if needed */ }}>
                {/* Ensure year is styled consistently */}
                <h2 style={{ margin: '0 0 4px 0' }}>{item.year}</h2>
                <p>{item.content}</p>
              </div>
            )}

            {/* Conditional Rendering for Image Below Text */}
            {item.imageBelow && (
              <img
                src={item.image}
                alt={`Imagem de ${item.year}`}
                style={{
                  marginTop: item.year === '2015' ? '20px' : item.year === '2024' ? '5px' : '10px', // Space above image
                  width: '200px', // Adjust size
                  borderRadius: '8px',
                  zIndex: 4 // Ensure image is above the line/marker
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;