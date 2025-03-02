import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';


const WardrobeModel = ({ 
  dimensions = { width: 200, height: 220, depth: 45 }, 
  selectedCompartment = null,
  compartments = [],
  onError,
  openedComponents = {},
  onPartClick,
}) => {
  // Acceder al contexto de Three.js para monitorear recursos
  const { gl } = useThree();

  // Refs para las partes interactivas
  const doorLeftRef = useRef();
  const doorRightRef = useRef();
  const drawerRefs = useRef([]);
  
  // Estado para seguimiento de partes
  const [partsMap, setPartsMap] = useState({});

  
  // Referencia al modelo 3D
  const [loadError, setLoadError] = useState(null);
  const groupRef = useRef();
  const [modelParts, setModelParts] = useState({});
  const [modelLoaded, setModelLoaded] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  
  // Callback para capturar errores de carga
  const handleError = useCallback((error) => {
    console.error('Error loading model:', error);
    setLoadError(error);
    
    // Propagar el error hacia arriba si se proporcionó un manejador
    if (typeof onError === 'function') {
      onError(error);
    }
  }, [onError]);

// Monitorear recursos WebGL
useEffect(() => {
  if (!gl) {
    console.warn("Contexto WebGL no disponible");
    return;
  }

  try {
    console.log("Inicializando renderizador 3D");
    
    // Si gl.capabilities existe, podemos loguear el tamaño máximo de textura
    if (gl.capabilities && gl.capabilities.maxTextureSize) {
      console.log("Tamaño máximo de textura:", gl.capabilities.maxTextureSize);
    }
    
    // El resto de la información de WebGL es opcional, así que la omitimos
  } catch (error) {
    console.error("Error al verificar capacidades WebGL:", error);
  }
}, [gl]);

  // Intenta cargar el modelo con manejo de errores mejorado
  let gltf = {};
  try {
    gltf = useGLTF('/models/wardrobe.glb');
  } catch (error) {
    console.error("Error al cargar el modelo con useGLTF:", error);
    handleError(new Error(`No se pudo cargar el modelo: ${error.message}`));
  }

  const { scene } = gltf;
  
  // Factor de corrección para la profundidad - ajustar según sea necesario
  const DEPTH_CORRECTION_FACTOR = 1; 
  
  // Paleta de colores premium
  const COLORS = {
    // Estructura principal en tono madera claro
    frame: '#e5d3b3',
    // Color para los divisores interiores
    dividers: '#e5d3b3',
    // Color para los estantes
    shelves: '#e5d3b3',
    // Cajones y puertas en color beige claro
    drawerFront: '#e6ded4',
    // Interior de los cajones
    drawerBase: '#e5d3b3',
    // Tiradores en gris metálico
    handles: '#a0a0a0',
    // Color blanco para algunos interiores
    interiorWhite: '#ffffff',
    // Color para los huecos de colgador
    hangingSpace: '#e8e8e8'
  };
  
  // Escala base para dimensionar el modelo correctamente 
  const BASE_SCALE = 0.5; // Aumentamos la escala a 0.3 según lo solicitado por el usuario
  
  // Calcular las escalas adecuadas basadas en las dimensiones proporcionadas
  // Normalizamos las escalas basadas en las dimensiones del usuario
  const normalizedScaleX = dimensions.width / 200; // Considerando 200cm como ancho de referencia
  const normalizedScaleY = dimensions.height / 220; // Considerando 220cm como alto de referencia
  const normalizedScaleZ = dimensions.depth / 45;   // Considerando 45cm como profundidad de referencia
  
  // Aplicamos estas proporciones a la escala base
  const scaleX = BASE_SCALE * normalizedScaleX;
  const scaleY = BASE_SCALE * normalizedScaleY; // Sin factor de corrección adicional
  const scaleZ = BASE_SCALE * normalizedScaleZ;

  // Registro para debugging cuando el componente se monta
  useEffect(() => {
    console.log("WardrobeModel: Componente montado");
    console.log("Intentando cargar modelo desde: /models/wardrobe.glb");
    
    // Establecer un tiempo límite para la carga
    const timeoutId = setTimeout(() => {
      if (!modelLoaded && !loadError) {
        const timeoutError = new Error("Tiempo de espera excedido al cargar el modelo");
        handleError(timeoutError);
      }
    }, 10000); // 10 segundos de tiempo límite
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [modelLoaded, loadError, handleError]);

  // Modificar y preparar el modelo
  useEffect(() => {
    if (!scene) {
      console.log("WardrobeModel: La escena no está disponible todavía");
      // Si ya intentamos varias veces y sigue sin estar disponible, informar del error
      if (loadAttempts > 3) {
        handleError(new Error("No se pudo cargar el modelo después de varios intentos"));
      } else {
        // Incrementar contador de intentos
        setLoadAttempts(prev => prev + 1);
      }
      return;
    }
    
    console.log("Modelo cargado:", scene);
    
    // Dentro del useEffect donde cargas el modelo (justo después de scene.traverse)
// Añade este código para mostrar en consola todos los nombres de objetos:
console.log("=== DIAGNÓSTICO DE MODELO 3D ===");
const partNames = [];
scene.traverse((child) => {
  if (child.isMesh) {
    partNames.push(child.name);
    console.log(`Objeto encontrado: "${child.name}" (${child.type})`);
  }
});
console.log("Nombres de todas las partes:", partNames);
console.log("=== FIN DIAGNÓSTICO ===");
    // Limpiar cualquier contenido previo
    if (groupRef.current) {
      while (groupRef.current.children.length > 0) {
        groupRef.current.remove(groupRef.current.children[0]);
      }
    }
    
    try {
      // Verificar si la escena tiene geometrías válidas
      let hasMeshes = false;
      scene.traverse((child) => {
        if (child.isMesh) hasMeshes = true;
      });
      
      if (!hasMeshes) {
        throw new Error("El modelo cargado no contiene geometrías válidas");
      }
      
      // Verificar el tamaño del modelo para evitar modelos extremadamente grandes
      const box = new THREE.Box3().setFromObject(scene);
      const modelSize = new THREE.Vector3();
      box.getSize(modelSize);
      
      if (Math.max(modelSize.x, modelSize.y, modelSize.z) > 1000) {
        console.warn("El modelo es extremadamente grande, puede causar problemas de rendimiento");
      }
      
      // Clonar la escena para evitar modificar el original
      const clonedScene = scene.clone(true);
      
      // Obtener dimensiones reales del modelo
      const modelCenter = new THREE.Vector3();
      box.getCenter(modelCenter);
      
      // Ajustar la posición para centrar el modelo en el origen
      clonedScene.position.set(-modelCenter.x, -modelCenter.y, -modelCenter.z);
      
      // Cambiar la rotación para que el frente del armario mire directamente hacia la cámara
      // El valor de Math.PI/2 girará el modelo 90 grados para que se vea de frente
      clonedScene.rotation.set(0, Math.PI/2, 0);
      
      // Registrar todas las partes del modelo para manipulación
      const partsMap = {};
      clonedScene.traverse((child) => {
        if (child.isMesh) {
          // Guardar referencia a la malla
          partsMap[child.name] = child;
          // Identificar partes interactivas por su nombre
        if (child.name.includes('door_left') || child.name.includes('puerta_izquierda')) {
          doorLeftRef.current = child;
        }
        else if (child.name.includes('door_right') || child.name.includes('puerta_derecha')) {
          doorRightRef.current = child;
        }
        else if (child.name.includes('drawer') || child.name.includes('cajon')) {
          // Extraer el número o índice del cajón del nombre
          const drawerMatch = child.name.match(/(\d+)/);
          if (drawerMatch) {
            const drawerIndex = parseInt(drawerMatch[0], 10);
            if (!drawerRefs.current[drawerIndex]) {
              drawerRefs.current[drawerIndex] = child;
            }
          }
        }
                // Configurar interactividad para detectar clicks
        child.userData.clickable = child.name.includes('door') || 
                                  child.name.includes('puerta') || 
                                  child.name.includes('drawer') || 
                                  child.name.includes('cajon');

          // Optimizar geometrías
          if (child.geometry) {
            child.geometry.computeBoundingBox();
            child.geometry.computeVertexNormals();
          }
          
          // Mejorar material con colores nuevos
          if (child.material) {
            // Crear un nuevo material para cada malla para evitar compartirlos
            const newMaterial = new THREE.MeshStandardMaterial({
              color: COLORS.frame,
              emissive: 0x000000,
              side: THREE.DoubleSide,
              flatShading:true
            });
            
            // Asignar colores según el tipo de parte
            if (child.name.includes('frame') || child.name.includes('estructura')) {
              newMaterial.color.set(COLORS.frame);
            } else if (child.name.includes('shelf') || child.name.includes('estante')) {
              newMaterial.color.set(COLORS.shelves);
            } else if (child.name.includes('drawer') || child.name.includes('cajon')) {
              if (child.name.includes('front') || child.name.includes('frente')) {
                newMaterial.color.set(COLORS.drawerFront);
              } else {
                newMaterial.color.set(COLORS.drawerBase);
              }
            } else if (child.name.includes('handle') || child.name.includes('tirador')) {
              newMaterial.color.set(COLORS.handles);
              newMaterial.metalness = 0.7;
              newMaterial.roughness = 0.2;
            } else if (child.name.includes('divider') || child.name.includes('divisor')) {
              newMaterial.color.set(COLORS.dividers);
            } else {
              // Color por defecto para otras partes
              newMaterial.color.set(COLORS.frame);
            }
            
            child.material = newMaterial;
          }
          
          // Configurar sombras pero limitar el número de sombras para mejorar rendimiento
          if (partsMap && Object.keys(partsMap).length < 50) {
            child.castShadow = true;
            child.receiveShadow = true;
          } else {
            // Para modelos complejos, solo activar sombras en las partes principales
            child.castShadow = child.name.includes('frame') || child.name.includes('front');
            child.receiveShadow = true;
          }
        }
      });
      
      setModelParts(partsMap);
      setModelLoaded(true);
      
      // Añadir la escena clonada al grupo contenedor
      groupRef.current.add(clonedScene);
      
      // Configuración de debug para visualizar los ejes y orientación
      // No mostramos los ejes en la versión final para una visualización más limpia
      // const axesHelper = new THREE.AxesHelper(1);
      // groupRef.current.add(axesHelper);
      
    // Aplicar escala inicial
groupRef.current.scale.set(scaleX, scaleY, scaleZ);

// Ajustamos la posición para una mejor visualización
groupRef.current.position.y = 0.6;     // Subimos el modelo (valores más altos = más arriba)
groupRef.current.position.x = 0;     // Aseguramos que esté centrado horizontalmente
groupRef.current.position.z = -1.5;  // Ajustamos la profundidad para mejor visualización
      console.log("WardrobeModel: Modelo configurado correctamente");
    } catch (error) {
      console.error("Error al preparar el modelo:", error);
      handleError(error);
    }
  }, [scene, handleError, loadAttempts]);

  // Actualizar escala cuando cambian las dimensiones
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.scale.set(scaleX, scaleY, scaleZ);
    }
  }, [dimensions, scaleX, scaleY, scaleZ]);

// Animaciones con react-spring
const doorLeftAnimation = useSpring({
  rotation: openedComponents.doorLeft ? [0, Math.PI * 0.7, 0] : [0, 0, 0],
  config: { mass: 1, tension: 170, friction: 26 }
});

const doorRightAnimation = useSpring({
  rotation: openedComponents.doorRight ? [0, -Math.PI * 0.7, 0] : [0, 0, 0],
  config: { mass: 1, tension: 170, friction: 26 }
});

// Genera animaciones para todos los cajones disponibles
const drawerAnimations = Array.from({ length: 6 }).map((_, index) => 
  useSpring({
    position: openedComponents[`drawer${index}`] ? [0, 0, 0.2] : [0, 0, 0],
    config: { mass: 1, tension: 180, friction: 28 }
  })
);

// Función para manejar clics en las partes
const handlePartClick = (partName) => {
  if (onPartClick) {
    onPartClick(partName);
  }
};

// Usar useFrame para aplicar animaciones manualmente si fuera necesario
useFrame(() => {
  // Si necesitas animaciones manuales para algún componente específico
  if (modelParts && Object.keys(modelParts).length > 0) {
    // Ejemplo: animar manualmente alguna parte si es necesario
    // (la mayoría se hará con react-spring)
  }
});

  // Crear estructura interna del armario basada en la configuración
  const createInternalStructure = () => {
    if (!compartments.length) return null;
    
    // Calcular dimensiones de la cuadrícula
    const gridColumns = Math.max(...compartments.map(c => c.col)) + 1 || 4;
    const gridRows = Math.max(...compartments.map(c => c.row)) + 1 || 3;

    // Constantes para alineación perfecta
    const FRAME_THICKNESS = 0.015;     // Grosor del marco
    const DRAWER_INSET = 0.005;        // Espacio adicional para encajar perfectamente
    const EXACT_FRAME_WIDTH = 0.99;    // Ancho exacto del marco
    const EXACT_FRAME_HEIGHT = 0.99;   // Alto exacto del marco
    
    // Generar elementos internos basados en configuración de compartimentos
    return compartments.map((comp, index) => {
      if (comp.type === 'empty') return null;
      
      // Posicionamiento preciso para alineación perfecta
      const cellWidth = EXACT_FRAME_WIDTH / gridColumns;
      const cellHeight = EXACT_FRAME_HEIGHT / gridRows;
      
      // Calcular posición exacta dentro del marco, contando con el grosor de los divisores
      const xPos = -EXACT_FRAME_WIDTH/2 + FRAME_THICKNESS + cellWidth * comp.col + cellWidth/2;
      const yPos = EXACT_FRAME_HEIGHT/2 - FRAME_THICKNESS - cellHeight * comp.row - cellHeight/2;
      
      // Calcular dimensiones exactas del compartimento, ajustando para divisores
      const actualWidth = cellWidth - FRAME_THICKNESS - DRAWER_INSET;
      const actualHeight = cellHeight - FRAME_THICKNESS - DRAWER_INSET;
      
      switch (comp.type) {
        case 'shelf': {
          // Crear estantes horizontales con color madera clara
          const numShelves = 4;
          const shelves = [];
          
          for (let i = 0; i < numShelves; i++) {
            const shelfY = -actualHeight/2 + (i + 1) * actualHeight / (numShelves + 1);
            
            shelves.push(
              <mesh 
                key={`shelf-${index}-${i}`} 
                position={[0, shelfY, 0]} 
                castShadow
                receiveShadow
              >
                <boxGeometry args={[actualWidth, 0.01, 0.78]} />
                <meshStandardMaterial color={COLORS.shelves} roughness={0.7} />
              </mesh>
            );
          }
          
          return (
            <group key={`compartment-${index}`} position={[xPos, yPos, 0]}>
              {shelves}
            </group>
          );
        }
        
        case 'drawer': {
          // Crear cajones con frente beige claro y tiradores metálicos
          const numDrawers = 4;
          const spacing = 0.01; // Espacio entre cajones
          const drawerHeight = (actualHeight - spacing * (numDrawers - 1)) / numDrawers;
          const drawers = [];
          
          for (let i = 0; i < numDrawers; i++) {
            // Posición vertical exacta de cada cajón
            const drawerY = -actualHeight/2 + drawerHeight/2 + i * (drawerHeight + spacing);
            const drawerId = `drawer_${comp.id}_${i}`;
          const isOpen = openedComponents[drawerId] || false;
          
            drawers.push(
              <animated.group 
              key={`drawer-${index}-${i}`} 
              position={[0, drawerY, 0]}
              // Aplicar animación de apertura
              {...useSpring({
                position: isOpen ? [0, drawerY, 0.3] : [0, drawerY, 0],
                config: { mass: 1, tension: 180, friction: 28 }
              })}
              onClick={() => handlePartClick(drawerId)}
            >
              {/* El resto del contenido del cajón como antes */}
              {/* Base del cajón */}
              <mesh castShadow receiveShadow>
                <boxGeometry args={[actualWidth, drawerHeight, 0.75]} />
                <meshStandardMaterial color={COLORS.drawerBase} roughness={0.7} />
              </mesh>
              
              {/* Frente del cajón */}
              <mesh position={[0, 0, 0.375]} castShadow receiveShadow>
                <boxGeometry args={[actualWidth, drawerHeight, 0.01]} />
                <meshStandardMaterial color={COLORS.drawerFront} roughness={0.5} />
              </mesh>
              
              {/* Tirador */}
              <mesh position={[0, 0, 0.38]} castShadow receiveShadow>
                <boxGeometry args={[actualWidth * 0.6, 0.015, 0.01]} />
                <meshStandardMaterial color={COLORS.handles} metalness={0.8} roughness={0.2} />
              </mesh>
            </animated.group>
          );
        }
        
        return (
          <group key={`compartment-${index}`} position={[xPos, yPos, 0]}>
            {drawers}
          </group>
        );
      }
        
        case 'hanging': {
          // Barra para colgar ropa
          return (
            <group key={`compartment-${index}`} position={[xPos, yPos, 0]}>
              {/* Espacio para colgar - blanco claro */}
              <mesh position={[0, 0, 0]} scale={[0.98, 0.98, 0.9]} castShadow receiveShadow>
                <boxGeometry args={[actualWidth, actualHeight, 0.8]} />
                <meshStandardMaterial color={COLORS.hangingSpace} roughness={0.5} />
              </mesh>
              
              {/* Barra horizontal metálica */}
              <mesh position={[0, actualHeight * 0.3, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
                <cylinderGeometry args={[0.008, 0.008, actualWidth * 0.85, 8]} />
                <meshStandardMaterial color={COLORS.handles} metalness={0.8} roughness={0.2} />
              </mesh>
            </group>
          );
        }
        
        case 'door': {

          const doorId = `door_${comp.id}`;
          const isOpen = openedComponents[doorId] || false;
          return (
            <animated.group 
              key={`compartment-${index}`} 
              position={[xPos, yPos, 0.375]}
              // Animar la rotación para abrir/cerrar
              {...useSpring({
                // La rotación depende de la posición horizontal para abrir en la dirección correcta
                rotation: isOpen ? [0, comp.col < layoutConfig.columns / 2 ? Math.PI * 0.7 : -Math.PI * 0.7, 0] : [0, 0, 0],
                config: { mass: 1, tension: 170, friction: 26 }
              })}
              onClick={() => handlePartClick(doorId)}
            >
              {/* Panel de la puerta */}
              <mesh castShadow receiveShadow>
                <boxGeometry args={[actualWidth, actualHeight, 0.01]} />
                <meshStandardMaterial color={COLORS.drawerFront} roughness={0.5} />
              </mesh>
              
              {/* Tirador */}
              <mesh 
                position={[comp.col < layoutConfig.columns / 2 ? -actualWidth * 0.35 : actualWidth * 0.35, 0, 0.005]} 
                castShadow 
                receiveShadow
              >
                <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
                <meshStandardMaterial color={COLORS.handles} metalness={0.8} roughness={0.2} />
              </mesh>
            </animated.group>
          );
        }
        
        // Los otros casos pueden mantenerse igual...
        default:
          return null;
      }
    });
  };

  // Crear un marco estructural si no hay modelo cargado
  const createStructuralFrame = () => {
    // Solo mostrar el marco de respaldo si el modelo no ha cargado
    if (modelLoaded) return null;
    
    console.log("Creando estructura de respaldo porque el modelo no se ha cargado");
    
    // Marco estructural de respaldo por si el GLB no carga
    return (
      <group>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1, 1, 0.5]} />
          <meshStandardMaterial color={COLORS.frame} roughness={0.6} />
        </mesh>
        {/* Mostrar mensaje de error si lo hay */}
        {loadError && (
          <Html position={[0, -0.7, 0]} center transform>
            <div style={{ 
              backgroundColor: 'rgba(255, 0, 0, 0.7)', 
              color: 'white', 
              padding: '8px 12px', 
              borderRadius: '4px',
              fontFamily: 'Arial, sans-serif',
              fontSize: '12px',
              whiteSpace: 'nowrap'
            }}>
              Error al cargar el modelo
            </div>
          </Html>
        )}
      </group>
    );
  };

  // Monitorear performance y detener animaciones si hay problemas
  useFrame((state, delta) => {
    // Si el delta es demasiado grande (fps muy bajos), podríamos reducir la calidad
    if (delta > 0.1) { // Menos de 10 FPS
      console.warn("Rendimiento bajo detectado, considerando optimizaciones");
    }
  });

  return (
    <group ref={groupRef}>
      {/* Renderizar contenido generado por compartimentos */}
      {createInternalStructure()}
      
      {/* Si no hay modelo visible, mostrar marco básico */}
      {!modelLoaded && createStructuralFrame()}
    </group>
  );
};

export default WardrobeModel;

// Función de utilidad para precargar el modelo
const preloadModel = () => {
  try {
    // Precargar el modelo con captura de errores
    useGLTF.preload('/models/wardrobe.glb');
    console.log("Precarga de modelo wardrobe.glb iniciada");
  } catch (error) {
    console.error("Error al precargar el modelo:", error);
  }
};

// Intentar precargar el modelo
preloadModel();