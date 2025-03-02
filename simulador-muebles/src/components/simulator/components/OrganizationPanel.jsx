import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { styled } from '@mui/material/styles';

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

const SectionContent = styled('div')({
  padding: '16px',
  backgroundColor: '#ffffff'
});

const InteractiveButton = styled('button')(({ isActive }) => ({
  width: '100%',
  padding: '10px 12px',
  marginBottom: '8px',
  backgroundColor: isActive ? '#EBF5FF' : '#ffffff',
  border: '1px solid #E5E7EB',
  borderRadius: '4px',
  textAlign: 'left',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: '#F3F4F6'
  }
}));

const DivisionConfig = styled('div')({
  marginTop: '16px',
  borderTop: '1px solid #E5E7EB',
  paddingTop: '16px'
});

const DivisionTitle = styled('h4')({
  fontSize: '14px',
  fontWeight: '500',
  marginBottom: '12px',
  color: '#4B5563'
});

const DivisionInput = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '12px'
});

const Icon = styled('span')({
  display: 'inline-flex',
  marginRight: '8px',
  color: '#3B82F6'
});

const OrganizationPanel = ({ onPartSelect, onConfigChange }) => {
  // Estado para controlar qué secciones están expandidas
  const [expandedSections, setExpandedSections] = useState({
    organization: true
  });

  // Estado para la parte seleccionada actualmente
  const [selectedPart, setSelectedPart] = useState(null);

  // Estado para la configuración de divisiones
  const [divisions, setDivisions] = useState({
    horizontal: 2, // Número de divisiones horizontales
    vertical: 1,   // Número de divisiones verticales
    drawers: 2     // Número de cajones
  });

  // Función para alternar la expansión de secciones
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Función para manejar la selección de partes
  const handlePartSelect = (partId) => {
    const newSelection = selectedPart === partId ? null : partId;
    setSelectedPart(newSelection);
    onPartSelect?.(newSelection);
  };

  // Función para manejar cambios en el número de divisiones
  const handleDivisionChange = (type, value) => {
    // Asegurarse de que el valor sea un número y esté dentro de los límites
    const numValue = parseInt(value, 10);
    
    // Límites para cada tipo de división
    const limits = {
      horizontal: { min: 1, max: 4 },
      vertical: { min: 1, max: 3 },
      drawers: { min: 0, max: 6 }
    };
    
    // Aplicar límites
    const limitedValue = Math.max(
      limits[type].min,
      Math.min(numValue, limits[type].max)
    );
    
    // Actualizar estado
    const newDivisions = { ...divisions, [type]: limitedValue };
    setDivisions(newDivisions);
    
    // Notificar al componente padre
    onConfigChange?.({ divisions: newDivisions });
  };

  return (
    <PanelContainer>
      {/* Sección de Organización */}
      <SectionHeader onClick={() => toggleSection('organization')}>
        <div className="flex items-center gap-2">
          <Icon>📋</Icon>
          <span>Organización</span>
        </div>
        <span>{expandedSections.organization ? '-' : '+'}</span>
      </SectionHeader>

      {expandedSections.organization && (
        <SectionContent>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '16px' }}>
            Configura la organización interna de tu armario
          </p>

          {/* Botones interactivos para seleccionar partes */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
              Interactúa con las partes:
            </p>
            
            <InteractiveButton
              isActive={selectedPart === 'leftDoor'}
              onClick={() => handlePartSelect('leftDoor')}
            >
              <Icon>🚪</Icon> Puerta Izquierda
            </InteractiveButton>

            <InteractiveButton
              isActive={selectedPart === 'rightDoor'}
              onClick={() => handlePartSelect('rightDoor')}
            >
              <Icon>🚪</Icon> Puerta Derecha
            </InteractiveButton>

            {[...Array(divisions.drawers)].map((_, index) => (
              <InteractiveButton
                key={`drawer${index}`}
                isActive={selectedPart === `drawer${index}`}
                onClick={() => handlePartSelect(`drawer${index}`)}
              >
                <Icon>🗄️</Icon> Cajón {index + 1}
              </InteractiveButton>
            ))}
          </div>

          {/* Configuración de divisiones */}
          <DivisionConfig>
            <DivisionTitle>Configuración de Espacios</DivisionTitle>
            
            <DivisionInput>
              <label style={{ flex: 1, fontSize: '14px' }}>Divisiones Horizontales:</label>
              <input
                type="number"
                min="1"
                max="4"
                value={divisions.horizontal}
                onChange={(e) => handleDivisionChange('horizontal', e.target.value)}
                style={{
                  width: '60px',
                  padding: '4px 8px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}
              />
            </DivisionInput>
            
            <DivisionInput>
              <label style={{ flex: 1, fontSize: '14px' }}>Divisiones Verticales:</label>
              <input
                type="number"
                min="1"
                max="3"
                value={divisions.vertical}
                onChange={(e) => handleDivisionChange('vertical', e.target.value)}
                style={{
                  width: '60px',
                  padding: '4px 8px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}
              />
            </DivisionInput>
            
            <DivisionInput>
              <label style={{ flex: 1, fontSize: '14px' }}>Número de Cajones:</label>
              <input
                type="number"
                min="0"
                max="6"
                value={divisions.drawers}
                onChange={(e) => handleDivisionChange('drawers', e.target.value)}
                style={{
                  width: '60px',
                  padding: '4px 8px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}
              />
            </DivisionInput>
            
            <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '8px' }}>
              Las divisiones se distribuirán de manera simétrica según el ancho y alto del armario.
            </p>
          </DivisionConfig>
        </SectionContent>
      )}
    </PanelContainer>
  );
};

export default OrganizationPanel;