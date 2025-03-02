import { styled } from '@mui/material/styles';

// Estilos para el simulador
export const SimulatorPageContainer = styled('div')({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#F9FAFB',
  position: 'relative'
});

// Estilos para el contenedor del modelo 3D
export const ModelContainer = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  backgroundColor: '#f5f5f5',
  '& canvas': {
    display: 'block'
  }
});

// Estilos para los controles del modelo
export const ModelControlsContainer = styled('div')({
  position: 'absolute',
  bottom: '20px',
  right: '20px',
  display: 'flex',
  gap: '10px',
  zIndex: 10
});

export const ModelControlButton = styled('button')({
  width: '40px',
  height: '40px',
  backgroundColor: 'white',
  border: 'none',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f0f0f0'
  }
});

// Estilos para los modales
export const ModalOverlay = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
});

export const ModalContent = styled('div')({
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '24px',
  maxWidth: '800px',
  width: '90%',
  maxHeight: '80vh',
  overflow: 'auto',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
});

// Estilos para la selección de productos
export const ProductGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: '20px',
  marginTop: '20px'
});

export const ProductCard = styled('div')({
  backgroundColor: 'white',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
  }
});

// Estilos para los controles de divisiones
export const DivisionControl = styled('div')({
  marginBottom: '20px',
  padding: '15px',
  backgroundColor: '#F9FAFB',
  borderRadius: '8px',
  border: '1px solid #E5E7EB'
});

export const ControlLabel = styled('label')({
  display: 'block',
  marginBottom: '8px',
  fontSize: '14px',
  fontWeight: '500',
  color: '#4B5563'
});

export const ControlRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
});

export const ConfigButton = styled('button')(({ primary }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '6px 12px',
  backgroundColor: primary ? '#3B82F6' : 'white',
  color: primary ? 'white' : '#4B5563',
  border: primary ? 'none' : '1px solid #E5E7EB',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: primary ? '#2563EB' : '#F9FAFB'
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed'
  }
}));

// Tooltips para ayuda contextual
export const Tooltip = styled('div')({
  position: 'relative',
  display: 'inline-block',
  '&:hover::after': {
    content: 'attr(data-tooltip)',
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#374151',
    color: 'white',
    textAlign: 'center',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    zIndex: 100
  }
});

// Estilos para la visualización de dimensiones
export const DimensionLine = styled('div')(({ orientation, length, position }) => {
  const common = {
    position: 'absolute',
    backgroundColor: '#3B82F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    color: 'white'
  };

  if (orientation === 'horizontal') {
    return {
      ...common,
      height: '2px',
      width: `${length}px`,
      top: `${position.y}px`,
      left: `${position.x}px`
    };
  } else {
    return {
      ...common,
      width: '2px',
      height: `${length}px`,
      top: `${position.y}px`,
      left: `${position.x}px`
    };
  }
});

export const DimensionLabel = styled('div')(({ position }) => ({
  position: 'absolute',
  top: `${position.y}px`,
  left: `${position.x}px`,
  backgroundColor: 'white',
  border: '1px solid #E5E7EB',
  borderRadius: '4px',
  padding: '2px 6px',
  fontSize: '12px',
  pointerEvents: 'none',
  whiteSpace: 'nowrap'
}));

// Estilos para las vistas previa
export const PreviewContainer = styled('div')({
  border: '1px solid #E5E7EB',
  borderRadius: '8px',
  padding: '16px',
  backgroundColor: 'white',
  marginBottom: '20px'
});

export const PreviewTitle = styled('h3')({
  fontSize: '16px',
  fontWeight: '500',
  marginBottom: '12px',
  color: '#4B5563'
});

// Estilos para los paneles de configuración
export const ConfigSection = styled('div')({
  marginBottom: '24px'
});

export const ConfigTitle = styled('h3')({
  fontSize: '16px',
  fontWeight: '500',
  marginBottom: '12px',
  color: '#374151'
});

// Estilos para los inputs
export const InputGroup = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '12px'
});

export const InputLabel = styled('label')({
  flex: '1',
  fontSize: '14px',
  color: '#4B5563'
});

export const Input = styled('input')({
  width: '80px',
  padding: '8px',
  border: '1px solid #D1D5DB',
  borderRadius: '4px',
  textAlign: 'center'
});

export const RangeInput = styled('input')({
  flex: '1',
  margin: '0 12px'
});

// Estilos para acciones
export const ActionButton = styled('button')(({ primary }) => ({
  padding: '10px 16px',
  backgroundColor: primary ? '#85473E' : 'white',
  color: primary ? 'white' : '#4B5563',
  border: primary ? 'none' : '1px solid #E5E7EB',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: primary ? '500' : 'normal',
  '&:hover': {
    backgroundColor: primary ? '#6a372f' : '#F9FAFB'
  }
}));

// Añadir animaciones
export const fadeIn = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const slideIn = `
  @keyframes slideIn {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

// Añadir estilos de animación al documento si se ejecuta en el navegador
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = `${fadeIn} ${slideIn}`;
  document.head.appendChild(styleSheet);
}