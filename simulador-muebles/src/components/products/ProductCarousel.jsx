import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import ProductCard from './ProductCard'
import React from 'react';

const CarouselSection = styled('div')({
  padding: '80px 0',
  backgroundColor: 'rgb(255, 248, 225)', // Matching yellow background
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
})

const Container = styled('div')({
  maxWidth: '1400px', // Aumentado para acomodar 4 productos
  margin: '0 auto',
  padding: '0 40px'
})

const CarouselHeader = styled('div')({
  textAlign: 'center',
  marginBottom: '50px'
})

const Title = styled('h2')({
  fontSize: '2.5rem',
  color: '#000',
  marginBottom: '20px'
})

const CarouselContainer = styled('div')({
  position: 'relative',
  overflow: 'hidden'
})

const CarouselTrack = styled('div')({
  display: 'flex',
  gap: '30px',
  transition: 'transform 0.5s ease'
})

const CardWrapper = styled('div')({
  flex: '0 0 calc(25% - 22.5px)', // 25% para 4 productos, ajustando el gap
  maxWidth: 'calc(25% - 22.5px)',
})

const NavigationButton = styled('button')(({ position }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  [position]: '-20px',
  width: '40px',
  height: '40px',
  backgroundColor: '#85473E',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: '#6a372f'
  }
}))
const products = [
  {
    id: 1,
    title: 'Mueble Modular',
    price: 299,
    description: 'Diseña tu propio mueble modular, perfecto para cualquier espacio. ¡Versatilidad total!',
    image: '/images/mueble.webp'
  },
  {
    id: 2,
    title: 'Armario Personalizado',
    price: 499,
    description: 'Crea un armario que se adapte a tu estilo. ¡Hazlo único!',
    image: '/images/armario.png'
  },
  {
    id: 3,
    title: 'Cocina Soñada',
    price: 799,
    description: 'Diseña la cocina de tus sueños con nuestro simulador. ¡Cocina como un chef!',
    image: '/images/cocina.jpg'
  },
  {
    id: 4,
    title: 'Comedor Elegante',
    price: 699,
    description: 'Transforma tu espacio con un comedor diseñado a tu medida',
    image: '/images/comedor.jpg'
  },
  {
    id: 5,
    title: 'Escritorio Ejecutivo',
    price: 399,
    description: 'El espacio de trabajo perfecto para tu hogar u oficina',
    image: '/images/escritorio.jpg'
  },
  {
    id: 6,
    title: 'Librero Moderno',
    price: 299,
    description: 'Organiza tus libros con estilo y elegancia',
    image: '/images/librero.jpg'
  },
  {
    id: 7,
    title: 'Nocheros Creativos',
    price: 199,
    description: 'Complementa tu habitación con nocheros únicos',
    image: '/images/nocheros.jpg'
  },
  {
    id: 8,
    title: 'Repisas',
    price: 149,
    description: 'Optimiza tu espacio con repisas elegantes y funcionales',
    image: '/images/repisa.jpg'
  }
]

function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const productsPerView = 4 // Fijo en 4 productos

  const moveCarousel = (direction) => {
    const maxIndex = Math.ceil(products.length / productsPerView) - 1
    if (direction === 'next') {
      setCurrentIndex(prev => Math.min(prev + 1, maxIndex))
    } else {
      setCurrentIndex(prev => Math.max(prev - 1, 0))
    }
  }

  return (
    <CarouselSection id="productos">
      <Container>
        <CarouselHeader>
          <Title>Nuestros Productos</Title>
        </CarouselHeader>
        <CarouselContainer>
          <CarouselTrack style={{
            transform: `translateX(-${currentIndex * 100}%)`
          }}>
            {products.map((product, index) => (
              <CardWrapper key={product.id}>
                <ProductCard product={product} />
              </CardWrapper>
            ))}
          </CarouselTrack>

          {currentIndex > 0 && (
            <NavigationButton
              position="left"
              onClick={() => moveCarousel('prev')}
            >
              ←
            </NavigationButton>
          )}

          {currentIndex < (products.length / productsPerView) - 1 && (
            <NavigationButton
              position="right"
              onClick={() => moveCarousel('next')}
            >
              →
            </NavigationButton>
          )}
        </CarouselContainer>
      </Container>
    </CarouselSection>
  )
}

export default ProductCarousel