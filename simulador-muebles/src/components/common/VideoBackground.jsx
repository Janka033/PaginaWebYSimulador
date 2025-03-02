import { styled } from '@mui/material/styles'
import { scrollToSection } from '../../utils/scrollUtils'
import React from 'react';

const VideoContainer = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const Video = styled('video')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '100%',
  minHeight: '100%',
  width: 'auto',
  height: 'auto',
  objectFit: 'cover',
  zIndex: 0
})

const Overlay = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1
})

const Content = styled('div')({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  maxWidth: '800px',
  padding: '0 20px'
})

const Title = styled('h1')({
  fontSize: '48px',
  fontWeight: 'bold',
  color: '#ffc091',
  marginBottom: '20px',
  '@media (max-width: 768px)': {
    fontSize: '36px'
  }
})

const Subtitle = styled('p')({
  fontSize: '24px',
  color: 'white',
  marginBottom: '40px',
  '@media (max-width: 768px)': {
    fontSize: '18px'
  }
})

const ExploreButton = styled('button')({
  padding: '15px 40px',
  fontSize: '18px',
  borderRadius: '30px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontWeight: '500',
  backgroundColor: 'transparent',
  border: '2px solid white',
  color: 'white',
  '&:hover': {
    backgroundColor: 'white',
    color: '#000',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  }
})

function VideoBackground() {
  const handleExplore = () => {
    scrollToSection('productos')
  }

  return (
    <VideoContainer id="inicio">
      <Video autoPlay muted loop playsInline>
        <source src="/videos/kook.mp4" type="video/mp4" />
      </Video>
      <Overlay />
      <Content>
        <Title>Construye a tu manera</Title>
        <Subtitle>¡Dale vida a tus ideas con nuestro simulador!</Subtitle>
        <ExploreButton onClick={handleExplore}>
          Explorar Ahora
        </ExploreButton>
      </Content>
    </VideoContainer>
  )
}

export default VideoBackground