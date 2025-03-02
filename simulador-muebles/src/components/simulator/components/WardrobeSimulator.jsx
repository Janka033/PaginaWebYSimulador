import React, { useState, Suspense, useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Center, Stage, Html } from '@react-three/drei';
import { RotateCcw, ZoomIn, ZoomOut, Save } from 'lucide-react';
import WardrobeModel from '../3d/WardrobeModel';
import WardrobeOrganizationPanel from './WardrobeOrganizationPanel';
import useCartStore from '../../../store/cartStore';
import ErrorBoundary from './ErrorBoundary'; // Importamos el componente ErrorBoundary

// Modelo básico alternativo por si falla la carga del modelo principal
const BasicWardrobeModel = ({ dimensions }) => {
  // Crear una representación básica del armario con primitivas de Three.js
  const { width, height, depth } = dimensions;
  const normalizedWidth = width / 200;
  const normalizedHeight = height / 220;
  const normalizedDepth = depth / 45;
  
  return (
    <group>
      {/* Estructura principal - base del armario */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[normalizedWidth, normalizedHeight, normalizedDepth]} />
        <meshStandardMaterial color="#e5d3b3" roughness={0.6} />
      </mesh>
      
      {/* Puertas frontales */}
      <mesh castShadow receiveShadow position={[0, 0, normalizedDepth/2 + 0.01]}>
        <boxGeometry args={[normalizedWidth - 0.05, normalizedHeight - 0.05, 0.02]} />
        <meshStandardMaterial color="#e6ded4" roughness={0.5} />
      </mesh>
      
      {/* Tiradores */}
      <mesh castShadow receiveShadow position={[normalizedWidth/4, 0, normalizedDepth/2 + 0.03]}>
        <cylinderGeometry args={[0.01, 0.01, 0.2, 8]} rotation={[Math.PI/2, 0, 0]} />
        <meshStandardMaterial color="#a0a0a0" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Segunda puerta tirador */}
      <mesh castShadow receiveShadow position={[-normalizedWidth/4, 0, normalizedDepth/2 + 0.03]}>
        <cylinderGeometry args={[0.01, 0.01, 0.2, 8]} rotation={[Math.PI/2, 0, 0]} />
        <meshStandardMaterial color="#a0a0a0" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

const SimulatorContainer = styled('div')({
  display: 'flex',
  width: '100%',
  minHeight: 'calc(100vh - 64px)',
  marginTop: '64px',
  backgroundColor: '#f5f5f5',
  position: 'relative'
});

const PanelContainer = styled('div')({
  width: '350px',
  minWidth: '350px',
  backgroundColor: '#ffffff',
  boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
  height: 'calc(100vh - 64px)',
  overflowY: 'auto',
  position: 'fixed',
  left: 0,
  top: '64px',
  zIndex: 10
});

const ViewerContainer = styled('div')({
  flex: 1,
  marginLeft: '350px',
  position: 'relative',
  height: 'calc(100vh - 64px)',
  width: 'calc(100% - 350px)'
});

const ControlsContainer = styled('div')({
  position: 'absolute',
  bottom: '20px',
  right: '20px',
  display: 'flex',
  gap: '10px',
  zIndex: 5
});

// Renamed to avoid conflict with SimulatorStyles.js
const ViewerControlButton = styled('button')({
  width: '40px',
  height: '40px',
  backgroundColor: '#ffffff',
  border: 'none',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  '&:hover': {
    backgroundColor: '#f0f0f0'
  }
});

const SaveButton = styled('button')({
  position: 'absolute',
  bottom: '20px',
  left: '380px',
  padding: '10px 20px',
  backgroundColor: '#85473E',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontWeight: 'bold',
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  '&:hover': {
    backgroundColor: '#6a372f'
  },
  zIndex: 1000 // Aseguramos que siempre esté por encima
});

// Componente de carga mejorado con feedback visual y control de errores
const LoadingIndicator = () => (
  <>
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#85473E" />
    </mesh>
    <Html position={[0, -1, 0]} center>
      <div style={{ 
        color: 'white', 
        background: 'rgba(133, 71, 62, 0.7)', 
        padding: '10px', 
        borderRadius: '5px',
        fontFamily: 'Arial, sans-serif'
      }}>
        Cargando modelo 3D...
      </div>
    </Html>
  </>
);

// Componente para mostrar errores dentro del canvas
const ErrorMessage = ({ message }) => (
  <Html position={[0, 0, 0]} center>
    <div style={{ 
      color: 'white', 
      background: 'rgba(220, 53, 69, 0.8)', 
      padding: '15px', 
      borderRadius: '5px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '300px',
      textAlign: 'center'
    }}>
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        Error al cargar el modelo 3D
      </div>
      <div>{message}</div>
    </div>
  </Html>
);

const WardrobeSimulator = () => {
  const [dimensions, setDimensions] = useState({
    width: 200,
    height: 220,
    depth: 45
  });
  
  const [compartments, setCompartments] = useState([]);
  const [selectedCompartment, setSelectedCompartment] = useState(null);
  const [modelLoadError, setModelLoadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const cameraRef = useRef();
  const controlsRef = useRef();
  const { addItem, toggleCart } = useCartStore();

  // Función para manejar errores de WebGL
  useEffect(() => {
    const handleWebGLError = (event) => {
      console.error("Error WebGL:", event);
      setModelLoadError(true);
      setErrorMessage("Problema con la renderización 3D. Intenta refrescar la página.");
    };

    window.addEventListener('webglcontextlost', handleWebGLError);
    window.addEventListener('error', (e) => {
      if (e.message.includes('WebGL') || e.message.includes('three') || e.message.includes('3d')) {
        handleWebGLError(e);
      }
    });
    
    return () => {
      window.removeEventListener('webglcontextlost', handleWebGLError);
      window.removeEventListener('error', handleWebGLError);
    };
  }, []);

  const handleModelError = (error) => {
    console.error("Error en el modelo:", error);
    setModelLoadError(true);
    setErrorMessage("No se pudo cargar el modelo 3D. Verificar que el archivo existe en /models/wardrobe.glb");
  };

  const handleDimensionsChange = (newDimensions) => {
    console.log("Nuevas dimensiones:", newDimensions);
    
    // Validar valores para evitar valores inválidos
    const validatedDimensions = {
      width: Math.max(100, Math.min(300, Number(newDimensions.width) || 200)),
      height: Math.max(180, Math.min(240, Number(newDimensions.height) || 220)),
      depth: Math.max(20, Math.min(100, Number(newDimensions.depth) || 45))
    };
    
    // Actualizar estado
    setDimensions(validatedDimensions);
  };

  const handleOrganizationChange = (newCompartments) => {
    setCompartments(newCompartments);
  };

  const handleCompartmentSelect = (compartment) => {
    setSelectedCompartment(compartment);
  };

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleZoomIn = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyIn(1.2); // Acercar cámara
      controlsRef.current.update();
    }
  };

  const handleZoomOut = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyOut(1.2); // Alejar cámara
      controlsRef.current.update();
    }
  };

  const handleSaveDesign = () => {
    // Añadir al carrito
    addItem({
      id: `armario-${Date.now()}`,
      name: `Armario Personalizado ${dimensions.width}x${dimensions.height}x${dimensions.depth}cm`,
      price: calculatePrice(),
      image: '/images/armario.png',
      quantity: 1
    });
    
    // Mostrar el carrito
    toggleCart();
  };

  const calculatePrice = () => {
    // Cálculo básico del precio basado en dimensiones y compartimentos
    const basePrice = 299;
    const sizeFactor = (dimensions.width * dimensions.height * dimensions.depth) / (200 * 220 * 45);
    const sizePrice = basePrice * sizeFactor;
    
    // Precio adicional por compartimentos especiales
    const compartmentPrices = compartments.reduce((total, comp) => {
      switch (comp.type) {
        case 'drawer': return total + 25;
        case 'hanging': return total + 15;
        case 'door': return total + 30;
        case 'shelf': return total + 10;
        default: return total;
      }
    }, 0);
    
    return Math.round(sizePrice + compartmentPrices);
  };

  return (
    <SimulatorContainer>
      <PanelContainer>
        <WardrobeOrganizationPanel 
          onDimensionsChange={handleDimensionsChange} 
          onOrganizationChange={handleOrganizationChange}
          onCompartmentSelect={handleCompartmentSelect}
          initialDimensions={dimensions}
        />
      </PanelContainer>

      <ErrorBoundary>
        <ViewerContainer>
        <Canvas 
  gl={{ antialias: true, preserveDrawingBuffer: true }}
  shadows={true}
  dpr={[1, 2]} 
  camera={{ position: [0, 0.7, 12], fov: 30 }}  // Ángulo ligeramente más alto, campo visual más estrecho
  style={{ background: '#f5f5f5' }}
>
            <Suspense fallback={<LoadingIndicator />}>
              {/* Fondo */}
              <color attach="background" args={['#f5f5f5']} />
              
              {/* Iluminación mejorada y más eficiente */}
              <group>
              <ambientLight intensity={0.5} /> {/* Reducir la intensidad de la luz ambiental */}
<directionalLight 
  position={[10, 10, 10]} // Alejar la luz principal
  intensity={0.5} // Reducir intensidad
  castShadow
  shadow-mapSize={[1024, 1024]}
/>
<hemisphereLight 
  skyColor="#f0e9d8" 
  groundColor="#705e46" 
  intensity={0.3} 
/>
<directionalLight
  position={[-15, 10, -10]}
  intensity={0.2}
  castShadow={false}
/>
  {modelLoadError ? (
    <>
      <BasicWardrobeModel dimensions={dimensions} />
      <ErrorMessage message={errorMessage} />
    </>
  ) : (
    <WardrobeModel 
      dimensions={dimensions}
      selectedCompartment={selectedCompartment}
      compartments={compartments}
      onError={handleModelError}
    />
  )}
</group>
              {/* Mostrar modelo básico si hay error, o el completo si no hay error */}
              <Stage 
        environment={null}  // Cambiamos a null para no cargar ningún entorno HDR
              intensity={0.2} 
              shadows={false} 
              adjustCamera={false} 
              preset="rembrandt"
              center
>
                {modelLoadError ? (
                  <>
                    <BasicWardrobeModel dimensions={dimensions} />
                    <ErrorMessage message={errorMessage} />
                  </>
                ) : (
                  <WardrobeModel 
                    dimensions={dimensions}
                    selectedCompartment={selectedCompartment}
                    compartments={compartments}
                    onError={handleModelError}
                  />
                )}
              </Stage>
              
              {/* Controles de cámara mejorados */}
              <OrbitControls 
  ref={controlsRef}
  enablePan={true}
  enableZoom={true}
  enableRotate={true}
  minDistance={0.8}  // Permitir acercarse un poco más
  maxDistance={15}   // Permitir alejarse más
  target={[0, 0.5, 0]}
  makeDefault
/>
            </Suspense>
          </Canvas>

          <ControlsContainer>
            <ViewerControlButton onClick={handleResetCamera}>
              <RotateCcw size={20} />
            </ViewerControlButton>
            <ViewerControlButton onClick={handleZoomIn}>
              <ZoomIn size={20} />
            </ViewerControlButton>
            <ViewerControlButton onClick={handleZoomOut}>
              <ZoomOut size={20} />
            </ViewerControlButton>
          </ControlsContainer>
        </ViewerContainer>
      </ErrorBoundary>

      <SaveButton onClick={handleSaveDesign}>
        <Save size={18} />
        Guardar diseño (${calculatePrice()})
      </SaveButton>
    </SimulatorContainer>
  );
};

export default WardrobeSimulator;