import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Info } from 'lucide-react';

const PanelContainer = styled('div')({
  backgroundColor: '#ffffff',
  height: '100%',
  overflow: 'auto'
});

const SectionHeader = styled('div')({
  backgroundColor: '#F3F4F6',
  padding: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid #E5E7EB',
  cursor: 'pointer'
});

const SectionIcon = styled('span')({
  color: '#3B82F6',
  marginRight: '8px'
});

const SectionContent = styled('div')({
  padding: '16px',
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
  width: '60px',
  padding: '4px 8px',
  border: '1px solid #E5E7EB',
  borderRadius: '4px',
  textAlign: 'center'
});

const OrganizationGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '8px',
  marginBottom: '16px'
});

const GridCell = styled('div')(({ active, type }) => ({
  padding: '12px 8px',
  backgroundColor: active ? '#EBF5FF' : '#F9FAFB',
  border: `1px solid ${active ? '#3B82F6' : '#E5E7EB'}`,
  borderRadius: '4px',
  textAlign: 'center',
  cursor: 'pointer',
  fontSize: '12px',
  position: 'relative',
  '&:hover': {
    backgroundColor: active ? '#EBF5FF' : '#F3F4F6'
  },
  ...(type === 'shelves' && {
    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 5px, #D1D5DB 5px, #D1D5DB 6px)',
    backgroundSize: '100% 20px',
    backgroundPosition: '0 10px'
  }),
  ...(type === 'drawers' && {
    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 15px, #D1D5DB 15px, #D1D5DB 16px)',
    backgroundSize: '100% 20px'
  }),
  ...(type === 'hanging' && {
    '&:after': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '50%',
      width: '2px',
      height: '8px',
      backgroundColor: '#D1D5DB'
    }
  })
}));

const LayoutPreview = styled('div')(({ columns, rows }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  gridTemplateRows: `repeat(${rows}, 1fr)`,
  gap: '2px',
  border: '2px solid #85473E',
  height: '180px',
  marginBottom: '16px',
  backgroundColor: '#F3F4F6'
}));

const CompartmentCell = styled('div')(({ type, selected }) => ({
  backgroundColor: selected ? '#EBF5FF' : '#FFFFFF',
  border: `1px solid ${selected ? '#3B82F6' : '#E5E7EB'}`,
  cursor: 'pointer',
  position: 'relative',
  ...(type === 'shelf' && {
    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 15px, #D1D5DB 15px, #D1D5DB 16px)',
    backgroundSize: '100% 25px',
    backgroundPosition: '0 10px'
  }),
  ...(type === 'drawer' && {
    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, #D1D5DB 20px, #D1D5DB 21px)',
    backgroundSize: '100% 30px'
  }),
  ...(type === 'hanging' && {
    '&:after': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '50%',
      width: '2px',
      height: '15px',
      backgroundColor: '#D1D5DB'
    }
  }),
  '&:hover': {
    backgroundColor: selected ? '#EBF5FF' : '#F9FAFB'
  }
}));

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

const SaveButton = styled('button')({
  width: '100%',
  padding: '10px',
  backgroundColor: '#85473E',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '16px',
  '&:hover': {
    backgroundColor: '#6a372f'
  }
});

const WardrobeOrganizationPanel = ({ 
  onDimensionsChange, 
  onOrganizationChange, 
  onCompartmentSelect,
  initialDimensions = { width: 200, height: 220, depth: 45 }
}) => {
  const [dimensions, setDimensions] = useState(initialDimensions);
  const [sections, setSections] = useState({
    dimensions: true,
    organization: false,
    configuration: false,
    colors: false
  });
  
  const [layoutConfig, setLayoutConfig] = useState({
    columns: 4,
    rows: 3
  });
  
  const [compartments, setCompartments] = useState([]);
  const [selectedCompartment, setSelectedCompartment] = useState(null);
  const [selectedOrganization, setSelectedOrganization] = useState('empty');

  // Inicializar compartimentos
  useEffect(() => {
    const initialCompartments = [];
    for (let row = 0; row < layoutConfig.rows; row++) {
      for (let col = 0; col < layoutConfig.columns; col++) {
        initialCompartments.push({
          id: `${row}-${col}`,
          row,
          col,
          type: 'empty',
        });
      }
    }
    setCompartments(initialCompartments);
  }, [layoutConfig.rows, layoutConfig.columns]);

  const toggleSection = (section) => {
    setSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleDimensionChange = (dimension, value) => {
    // Asegurarse de que value sea un número
    const numValue = Number(value);
    if (isNaN(numValue)) return;
    
    const newDimensions = { ...dimensions, [dimension]: numValue };
    setDimensions(newDimensions);
    
    if (onDimensionsChange) {
      onDimensionsChange(newDimensions);
    }
  };

  const handleCompartmentClick = (compartment) => {
    setSelectedCompartment(compartment);
    
    if (onCompartmentSelect) {
      onCompartmentSelect(compartment);
    }
  };

  const applyOrganizationType = () => {
    if (!selectedCompartment) return;
    
    const updatedCompartments = compartments.map(comp => 
      comp.id === selectedCompartment.id 
        ? { ...comp, type: selectedOrganization }
        : comp
    );
    
    setCompartments(updatedCompartments);
    
    if (onOrganizationChange) {
      onOrganizationChange(updatedCompartments);
    }
  };

  const handleLayoutChange = (type, value) => {
    // Validar que sea un número entre 1 y 6
    const numValue = Math.min(Math.max(Number(value), 1), 6);
    
    setLayoutConfig(prev => ({
      ...prev,
      [type]: numValue
    }));
  };

  return (
    <PanelContainer>
      {/* Sección de Dimensiones */}
      <SectionHeader onClick={() => toggleSection('dimensions')}>
        <div>
          <SectionIcon>📏</SectionIcon>
          <span>Dimensiones exteriores</span>
        </div>
        <span>{sections.dimensions ? '−' : '+'}</span>
      </SectionHeader>
      
      {sections.dimensions && (
        <SectionContent>
          <RangeContainer>
            <RangeLabel>
              <span>Ancho en cm</span>
              <Info size={16} />
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
                min="100"
                max="300"
                value={dimensions.width}
                onChange={(e) => handleDimensionChange('width', e.target.value)}
              />
            </RangeInputGroup>
          </RangeContainer>

          <RangeContainer>
            <RangeLabel>
              <span>Altura en cm</span>
              <Info size={16} />
            </RangeLabel>
            <RangeInputGroup>
              <RangeInput
                type="range"
                min="180"
                max="240"
                value={dimensions.height}
                onChange={(e) => handleDimensionChange('height', e.target.value)}
              />
              <NumberInput
                type="number"
                min="180"
                max="240"
                value={dimensions.height}
                onChange={(e) => handleDimensionChange('height', e.target.value)}
              />
            </RangeInputGroup>
          </RangeContainer>

          <RangeContainer>
            <RangeLabel>
              <span>Profundidad en cm</span>
              <Info size={16} />
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
                min="40"
                max="80"
                value={dimensions.depth}
                onChange={(e) => handleDimensionChange('depth', e.target.value)}
              />
            </RangeInputGroup>
          </RangeContainer>
        </SectionContent>
      )}

      {/* Sección de Distribución */}
      <SectionHeader onClick={() => toggleSection('organization')}>
        <div>
          <SectionIcon>📋</SectionIcon>
          <span>Distribución</span>
        </div>
        <span>{sections.organization ? '−' : '+'}</span>
      </SectionHeader>
      
      {sections.organization && (
        <SectionContent>
          <RangeContainer>
            <RangeLabel>
              <span>Número de columnas</span>
            </RangeLabel>
            <RangeInputGroup>
              <RangeInput
                type="range"
                min="1"
                max="6"
                value={layoutConfig.columns}
                onChange={(e) => handleLayoutChange('columns', e.target.value)}
              />
              <NumberInput
                type="number"
                min="1"
                max="6"
                value={layoutConfig.columns}
                onChange={(e) => handleLayoutChange('columns', e.target.value)}
              />
            </RangeInputGroup>
          </RangeContainer>

          <RangeContainer>
            <RangeLabel>
              <span>Número de filas</span>
            </RangeLabel>
            <RangeInputGroup>
              <RangeInput
                type="range"
                min="1"
                max="6"
                value={layoutConfig.rows}
                onChange={(e) => handleLayoutChange('rows', e.target.value)}
              />
              <NumberInput
                type="number"
                min="1"
                max="6"
                value={layoutConfig.rows}
                onChange={(e) => handleLayoutChange('rows', e.target.value)}
              />
            </RangeInputGroup>
          </RangeContainer>

          <div style={{ marginTop: '16px' }}>
            <p style={{ fontSize: '14px', marginBottom: '8px' }}>Vista previa:</p>
            <LayoutPreview columns={layoutConfig.columns} rows={layoutConfig.rows}>
              {compartments.map(comp => (
                <CompartmentCell 
                  key={comp.id}
                  type={comp.type}
                  selected={selectedCompartment?.id === comp.id}
                  onClick={() => handleCompartmentClick(comp)}
                />
              ))}
            </LayoutPreview>
          </div>
        </SectionContent>
      )}

      {/* Sección de Configuración de compartimentos */}
      <SectionHeader onClick={() => toggleSection('configuration')}>
        <div>
          <SectionIcon>🛠️</SectionIcon>
          <span>Configuración</span>
        </div>
        <span>{sections.configuration ? '−' : '+'}</span>
      </SectionHeader>
      
      {sections.configuration && (
        <SectionContent>
          <p style={{ fontSize: '14px', marginBottom: '12px' }}>
            {selectedCompartment 
              ? `Configurando compartimento ${selectedCompartment.row + 1}-${selectedCompartment.col + 1}` 
              : 'Selecciona un compartimento para configurar'}
          </p>

          <OrganizationGrid>
            <GridCell 
              active={selectedOrganization === 'empty'}
              onClick={() => setSelectedOrganization('empty')}
            >
              Vacío
            </GridCell>
            <GridCell 
              active={selectedOrganization === 'shelf'}
              type="shelves"
              onClick={() => setSelectedOrganization('shelf')}
            >
              Estantes
            </GridCell>
            <GridCell 
              active={selectedOrganization === 'drawer'}
              type="drawers"
              onClick={() => setSelectedOrganization('drawer')}
            >
              Cajones
            </GridCell>
            <GridCell 
              active={selectedOrganization === 'hanging'}
              type="hanging"
              onClick={() => setSelectedOrganization('hanging')}
            >
              Colgador
            </GridCell>
            <GridCell 
              active={selectedOrganization === 'door'}
              onClick={() => setSelectedOrganization('door')}
            >
              Puerta
            </GridCell>
          </OrganizationGrid>

          <ActionButton 
            onClick={applyOrganizationType}
            disabled={!selectedCompartment}
            style={{ 
              opacity: selectedCompartment ? 1 : 0.5,
              cursor: selectedCompartment ? 'pointer' : 'not-allowed'
            }}
          >
            Aplicar al compartimento
          </ActionButton>
        </SectionContent>
      )}

      {/* Sección de Colores */}
      <SectionHeader onClick={() => toggleSection('colors')}>
        <div>
          <SectionIcon>🎨</SectionIcon>
          <span>Colores y acabados</span>
        </div>
        <span>{sections.colors ? '−' : '+'}</span>
      </SectionHeader>
      
      {sections.colors && (
        <SectionContent>
          <p style={{ fontSize: '14px', marginBottom: '12px' }}>
            Elije los colores para tu armario
          </p>
          
          {/* Aquí puedes agregar una selección de colores */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {['#ffffff', '#F3F4F6', '#D1D5DB', '#85473E', '#6a372f', '#4B5563'].map(color => (
              <div
                key={color}
                style={{
                  width: '30px',
                  height: '30px',
                  backgroundColor: color,
                  border: '1px solid #E5E7EB',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </SectionContent>
      )}

      <div style={{ padding: '16px' }}>
        <SaveButton>
          Guardar Configuración
        </SaveButton>
      </div>
    </PanelContainer>
  );
};

export default WardrobeOrganizationPanel;