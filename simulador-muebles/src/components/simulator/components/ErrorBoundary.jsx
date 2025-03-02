import React from 'react';

/**
 * Componente ErrorBoundary que captura errores en componentes hijos
 * y muestra una interfaz alternativa en lugar de que la aplicación falle por completo.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  /**
   * Método del ciclo de vida de React que se llama cuando un error es lanzado
   * en cualquier parte dentro de este componente o sus hijos.
   */
  static getDerivedStateFromError(error) {
    // Actualiza el estado para que el siguiente renderizado muestre la UI alternativa
    return { 
      hasError: true, 
      error 
    };
  }

  /**
   * Método que se ejecuta después de que ocurre un error, útil para logging.
   */
  componentDidCatch(error, errorInfo) {
    // Registrar el error en la consola
    console.error("Error capturado por ErrorBoundary:", error);
    console.error("Componente stack trace:", errorInfo.componentStack);
    
    // Guardar la información del error en el estado
    this.setState({
      errorInfo: errorInfo
    });
  }

  /**
   * Método para reintentar la carga del componente, reiniciando el estado del error
   */
  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null,
      errorInfo: null
    });
  };

  render() {
    // Si hay un error, mostrar la UI alternativa
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#fff8f8', 
          border: '1px solid #ffcdd2',
          borderRadius: '4px',
          margin: '20px',
          fontFamily: 'Arial, sans-serif',
          color: '#333',
          maxWidth: '800px',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '40px',
          marginBottom: '40px'
        }}>
          <h2 style={{ color: '#d32f2f' }}>Ha ocurrido un error en el simulador</h2>
          <p>Lo sentimos, ha habido un problema al cargar el modelo 3D o al renderizar el componente:</p>
          <pre style={{ 
            padding: '10px', 
            backgroundColor: '#f5f5f5', 
            overflowX: 'auto',
            fontSize: '14px',
            color: '#d32f2f',
            borderRadius: '4px',
            marginBottom: '15px'
          }}>
            {this.state.error?.toString()}
          </pre>
          
          {this.state.errorInfo && (
            <details style={{ marginBottom: '15px' }}>
              <summary style={{ cursor: 'pointer', color: '#555', fontWeight: 'bold' }}>
                Ver detalles técnicos
              </summary>
              <pre style={{ 
                padding: '10px', 
                backgroundColor: '#f5f5f5', 
                overflowX: 'auto',
                fontSize: '12px',
                color: '#555',
                borderRadius: '4px',
                marginTop: '10px',
                whiteSpace: 'pre-wrap'
              }}>
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
          
          <p>Puedes intentar las siguientes soluciones:</p>
          <ul style={{ marginBottom: '15px', lineHeight: '1.5' }}>
            <li>Verificar que el archivo del modelo <code>/models/wardrobe.glb</code> existe en la carpeta correcta</li>
            <li>Comprobar que tu navegador es compatible con WebGL</li>
            <li>Reiniciar el navegador o usar uno diferente (Chrome o Firefox son recomendados)</li>
            <li>Desactivar extensiones o plugins que puedan interferir con WebGL</li>
          </ul>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={this.handleRetry} 
              style={{
                padding: '8px 16px',
                backgroundColor: '#85473E',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Reintentar
            </button>
            
            <button 
              onClick={() => window.location.reload()} 
              style={{
                padding: '8px 16px',
                backgroundColor: '#f5f5f5',
                color: '#333',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    // Si no hay error, renderizar los hijos normalmente
    return this.props.children;
  }
}

export default ErrorBoundary;