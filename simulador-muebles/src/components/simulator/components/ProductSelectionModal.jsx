import { Close } from "@mui/icons-material";
import {
  ModalOverlay,
  ModalContent,
  ProductGrid,
  ProductCard,
} from "../styles/SimulatorStyles";
import React from 'react';

function ProductSelectionModal({ onClose, onSelectProduct }) {
  const products = [
    {
      id: "armario",
      name: "Armario",
      image: "/images/armario.png",
      basePrice: 499,
      description: "Armario personalizable con múltiples configuraciones",
    },
    {
      id: "mesa",
      name: "Mesa Comedor",
      image: "/images/comedor.jpg",
      basePrice: 699,
      description: "Mesa de comedor elegante y espaciosa",
    },
    {
      id: "cocina",
      name: "Cocina",
      image: "/images/cocina.jpg",
      basePrice: 799,
      description: "Cocina integral con diseño moderno",
    },
    {
      id: "nochero",
      name: "Nochero",
      image: "/images/nocheros.jpg",
      basePrice: 199,
      description: "Nochero funcional con acabados premium",
    },
  ];

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2>Selecciona un Producto</h2>
          <button
            onClick={onClose}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Close />
          </button>
        </div>

        <ProductGrid>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              onClick={() => onSelectProduct(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "15px" }}>
                <h3 style={{ marginBottom: "8px" }}>{product.name}</h3>
                <p
                  style={{
                    color: "#666",
                    marginBottom: "12px",
                    fontSize: "14px",
                  }}
                >
                  {product.description}
                </p>
                <p
                  style={{
                    color: "#85473E",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  Desde ${product.basePrice}
                </p>
              </div>
            </ProductCard>
          ))}
        </ProductGrid>
      </ModalContent>
    </ModalOverlay>
  );
}

export default ProductSelectionModal;
