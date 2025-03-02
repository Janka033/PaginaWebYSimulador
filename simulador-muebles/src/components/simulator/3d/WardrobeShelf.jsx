import React from 'react';

const WardrobeShelf = ({ position, dimensions }) => {
  // Calcular dimensiones del estante
  const width = dimensions.width - 0.1;
  const height = 0.02;
  const depth = dimensions.depth - 0.05;
  
  // Posición en el armario basada en la posición relativa (0-1)
  const yPosition = -dimensions.height / 2 + dimensions.height * position;
  
  return (
    <mesh 
      position={[0, yPosition, 0]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color="#e5d3b3" />
    </mesh>
  );
};

export default WardrobeShelf;