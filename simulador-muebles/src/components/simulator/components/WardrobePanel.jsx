import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { styled } from '@mui/material/styles';

const PanelContainer = styled('div')({
  backgroundColor: '#ffffff',
  height: '100%',
  overflow: 'auto'
});

const Header = styled('div')({
  backgroundColor: '#4B5563',
  color: 'white',
  padding: '12px',
  fontSize: '14px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const DimensionsSection = styled('div')({
  backgroundColor: '#F3F4F6',
  padding: '12px',
  borderBottom: '1px solid #E5E7EB'
});

const RangeContainer = styled('div')({
  marginBottom: '16px'
});

const RangeLabel = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '8px',
  color: '#6B7280',
  fontSize: '14px'
});

const RangeInputGroup = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
});

const RangeInput = styled('input')({
  flex: 1,
  height: '4px',
  backgroundColor: '#E5E7EB',
  borderRadius: '2px',
  '&::-webkit-slider-thumb': {
    appearance: 'none',
    width: '16px',
    height: '16px',
    backgroundColor: '#3B82F6',
    borderRadius: '50%',
    cursor: 'pointer'
  }
});

const NumberInput = styled('input')({
  width: '80px',
  padding: '4px 8px',
  border: '1px solid #E5E7EB',
  borderRadius: '4px',
  textAlign: 'center'
});

const SectionButton = styled('button')({
  width: '100%',
  padding: '12px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  border: 'none',
  borderBottom: '1px solid #E5E7EB',
  backgroundColor: 'transparent',
  color: '#3B82F6',
  textAlign: 'left',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#F3F4F6'
  }
});

const ActionButton = styled('button')({
  width: '100%',
  padding: '8px',
  backgroundColor: 'transparent',
  border: '1px solid #3B82F6',
  borderRadius: '4px',
  color: '#3B82F6',
  cursor: 'pointer',
  marginBottom: '8px',
  '&:hover': {
    backgroundColor: '#EBF5FF'
  }
});

const WardrobePanel = ({ onDimensionsChange }) => {
  const [dimensions, setDimensions] = useState({
    width: 200,
    height: 220,
    depth: 45
  });

  const handleDimensionChange = (dimension, value) => {
    const newDimensions = { ...dimensions, [dimension]: value };
    setDimensions(newDimensions);
    onDimensionsChange?.(newDimensions);
  };

  return (
    <PanelContainer>
      <Header>
        <span>KOOK-Modulares</span>
        <span>▲</span>
      </Header>

      <DimensionsSection>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-blue-500">📏</span>
          <span className="font-medium">Dimensiones exteriores</span>
          <span>-</span>
        </div>

        <RangeContainer>
          <RangeLabel>
            <span>Ancho en cm</span>
            <Info size={16} className="text-blue-500" />
          </RangeLabel>
          <RangeInputGroup>
            <RangeInput
              type="range"
              min="100"
              max="300"
              value={dimensions.width}
              onChange={(e) => handleDimensionChange('width', e.target.value)}
            />
            <NumberInput
              type="number"
              value={dimensions.width}
              onChange={(e) => handleDimensionChange('width', e.target.value)}
            />
          </RangeInputGroup>
        </RangeContainer>

        <RangeContainer>
          <RangeLabel>
            <span>Altura en cm (sin incluir los pies)</span>
            <Info size={16} className="text-blue-500" />
          </RangeLabel>
          <RangeInputGroup>
            <RangeInput
              type="range"
              min="180"
              max="250"
              value={dimensions.height}
              onChange={(e) => handleDimensionChange('height', e.target.value)}
            />
            <NumberInput
              type="number"
              value={dimensions.height}
              onChange={(e) => handleDimensionChange('height', e.target.value)}
            />
          </RangeInputGroup>
        </RangeContainer>

        <RangeContainer>
          <RangeLabel>
            <span>Profundidad en cm</span>
            <Info size={16} className="text-blue-500" />
          </RangeLabel>
          <RangeInputGroup>
            <RangeInput
              type="range"
              min="40"
              max="80"
              value={dimensions.depth}
              onChange={(e) => handleDimensionChange('depth', e.target.value)}
            />
            <NumberInput
              type="number"
              value={dimensions.depth}
              onChange={(e) => handleDimensionChange('depth', e.target.value)}
            />
          </RangeInputGroup>
        </RangeContainer>
      </DimensionsSection>

      <SectionButton>
        <span className="text-blue-500">📋</span>
        <span>Organización</span>
        <span className="ml-auto">+</span>
      </SectionButton>

      <SectionButton>
        <span className="text-blue-500">🎨</span>
        <span>Colores</span>
        <span className="ml-auto">+</span>
      </SectionButton>

      <SectionButton>
        <span className="text-blue-500">👁</span>
        <span>Visualización</span>
        <span className="ml-auto">+</span>
      </SectionButton>

      <div className="p-4">
        <ActionButton>
          Anular y comenzar de nuevo
        </ActionButton>
        <ActionButton>
          Anular y configurar un nuevo mueble
        </ActionButton>
      </div>
    </PanelContainer>
  );
};

export default WardrobePanel;