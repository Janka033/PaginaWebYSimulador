import { styled } from "@mui/material/styles";
import useCartStore from '../../store/cartStore';
import React from 'react';

const Card = styled("div")({
  backgroundColor: "rgb(255, 248, 225)",
  borderRadius: "20px",
  overflow: "hidden",
  transition: "transform 0.3s ease",
  padding: "15px",
  height: "100%", // Ensure all cards have same height
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    transform: "translateY(-5px)",
  },
});

const BuyButton = styled('button')({
  width: '100%',
  padding: '12px',
  marginTop: '15px',
  backgroundColor: '#85473E',  // Color marrón por defecto
  color: 'white',    // Texto blanco
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontSize: '14px',
  fontWeight: '500',
  '&:hover': {
    backgroundColor: '#6a372f',  // Un tono más oscuro al hover
    transform: 'translateY(-2px)'  // Efecto sutil de elevación
  }
});

const ContentWrapper = styled("div")({
  backgroundColor: "white",
  borderRadius: "15px",
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  height: "100%", // Make white background fill entire height
});

const ImageContainer = styled("div")({
  width: "100%",
  height: "220px", // Fixed height for all images
  overflow: "hidden",
});

const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const Content = styled("div")({
  padding: "20px",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1, // Allow content to fill remaining space
  justifyContent: "space-between", // Space elements evenly
});

const Title = styled("h3")({
  fontSize: "1.25rem",
  fontWeight: "bold",
  marginBottom: "8px",
  color: "#000",
});

const Price = styled("p")({
  color: "#85473E",
  fontSize: "1.2rem",
  fontWeight: "bold",
  marginBottom: "12px",
});

const Description = styled("p")({
  color: "#666",
  fontSize: "0.95rem",
  lineHeight: "1.5",
  marginBottom: "20px",
  flexGrow: 1, // Allow description to take up remaining space
});


function ProductCard({ product }) {
  const { addItem, toggleCart } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    toggleCart();
  };

  return (
    <Card>
      <ContentWrapper>
        <ImageContainer>
          <Image src={product.image} alt={product.title} />
        </ImageContainer>
        <Content>
          <div>
            <Title>{product.title}</Title>
            <Price>${product.price}</Price>
            <Description>{product.description}</Description>
          </div>
          <BuyButton onClick={handleAddToCart}>Comprar Ahora</BuyButton>
        </Content>
      </ContentWrapper>
    </Card>
  );
}

export default ProductCard;
