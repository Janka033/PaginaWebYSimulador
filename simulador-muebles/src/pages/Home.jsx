import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import SlidingBanner from '../components/common/SlidingBanner';
import VideoBackground from '../components/common/VideoBackground';
import ProductCarousel from '../components/products/ProductCarousel';
import AboutSection from '../components/sections/AboutSection';
import ContactSection from '../components/sections/ContactSection';
const MainContent = styled('main')({
  minHeight: 'calc(100vh - 64px)',
  display: 'flex',
  flexDirection: 'column',
});

const SimulatorSection = styled('section')({
  padding: '4rem 2rem',
  textAlign: 'center',
  backgroundColor: '#f8f9fa',
});

const SimulatorButton = styled(Link)({
  display: 'inline-block',
  padding: '1rem 2rem',
  backgroundColor: '#007bff',
  color: '#ffffff',
  textDecoration: 'none',
  borderRadius: '4px',
  fontSize: '1.1rem',
  marginTop: '2rem',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
});

const Home = () => {
  return (
    <MainContent>
      <VideoBackground />
      <SlidingBanner />
      <ProductCarousel />
      <AboutSection />
      <SimulatorSection>
      <ContactSection />
        <h2>Diseña tu Armario Ideal</h2>
        <p>Utiliza nuestro simulador 3D para crear el armario perfecto para tu espacio</p>
        <SimulatorButton to="/simulador">
          Probar Simulador 3D
        </SimulatorButton>
      </SimulatorSection>
    </MainContent>
  );
};

export default Home;