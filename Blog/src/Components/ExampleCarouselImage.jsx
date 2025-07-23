// src/components/ExampleCarouselImage.jsx
import React from 'react';

function ExampleCarouselImage({ text }) {
  return (
    <div style={{ position: 'relative' }}>
      <img
        src="https://via.placeholder.com/800x400"
        alt={text}
        className="d-block w-100 h-90"
      />
      {/* Optional overlay text */}
      {/* <div style={{ position: 'absolute', top: '10%', left: '10%', color: 'white' }}>{text}</div> */}
    </div>
  );
}

export default ExampleCarouselImage;
