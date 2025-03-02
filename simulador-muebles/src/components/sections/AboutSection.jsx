import { styled } from '@mui/material/styles'
import React from 'react';

const AboutContainer = styled('section')({
  padding: '80px 0',
  backgroundColor: '#ffffff',
  position: 'relative'
})

const ContentContainer = styled('div')({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
  display: 'flex',
  alignItems: 'center',
  gap: '50px',
  '@media (max-width: 968px)': {
    flexDirection: 'column',
    textAlign: 'center'
  }
})

const TextContent = styled('div')({
  flex: 1,
  '@media (max-width: 968px)': {
    order: 2
  }
})

const ImageContent = styled('div')({
  flex: 1,
  '@media (max-width: 968px)': {
    order: 1,
    width: '100%',
    maxWidth: '500px'
  }
})

const Title = styled('h1')({
  fontSize: '48px',
  marginBottom: '30px',
  color: '#333'
})

const Description = styled('p')({
  fontSize: '16px',
  lineHeight: 1.6,
  marginBottom: '20px',
  color: '#666'
})

const Image = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '20px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
})

function AboutSection() {
  return (
    <AboutContainer id="sobre-nosotros">
      <ContentContainer>
        <TextContent>
          <Title>Sobre Nosotros</Title>
          <Description>
            En KOOK, creemos que cada hogar merece un toque personal. Nuestro simulador te permite diseñar muebles que reflejan tu estilo único y se adaptan perfectamente a tu espacio.
          </Description>
          <Description>
            Nuestro equipo está formado por diseñadores apasionados y expertos en muebles que han trabajado incansablemente para traerte esta herramienta innovadora. Entendemos que cada espacio es único, y por eso nos dedicamos a crear soluciones personalizadas que transforman tu visión en realidad.
          </Description>
          <Description>
            Con años de experiencia en el sector del mueble y un compromiso inquebrantable con la calidad, nos enorgullece ofrecer un servicio que combina tecnología de vanguardia con artesanía tradicional.
          </Description>
        </TextContent>
        <ImageContent>
          <Image 
            src="/images/nosotros.jpeg" 
            alt="Equipo KOOK trabajando en diseños"
          />
        </ImageContent>
      </ContentContainer>
    </AboutContainer>
  )
}

export default AboutSection