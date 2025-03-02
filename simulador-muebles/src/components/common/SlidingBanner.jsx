import { styled } from '@mui/material/styles'
import React from 'react';

const BannerContainer = styled('div')({
  width: '100%',
  overflow: 'hidden',
  background: '#ffffff',
  padding: '25px 0',
  borderTop: '1px solid #eee',
  borderBottom: '1px solid #eee'
})

const SlidingTrack = styled('div')({
  display: 'flex',
  width: 'fit-content',
  animation: 'scroll 30s linear infinite',
  '@keyframes scroll': {
    '0%': {
      transform: 'translateX(0)'
    },
    '100%': {
      transform: 'translateX(-50%)'
    }
  },
  '&:hover': {
    animationPlayState: 'paused'
  }
})

const TextGroup = styled('div')({
  display: 'flex',
  whiteSpace: 'nowrap'
})

const TextItem = styled('span')({
  display: 'inline-block',
  padding: '0 30px',
  fontSize: '32px',
  fontWeight: '700',
  color: '#000000'
})

function SlidingBanner() {
  const features = [
    'Personalizado',
    'Fácil de Usar',
    'Materiales de Calidad',
    'Simulación Realista',
    'Asesoría Experta'
  ]

  return (
    <BannerContainer>
      <SlidingTrack>
        {/* First set of text */}
        <TextGroup>
          {features.map((text, index) => (
            <TextItem key={index}>{text} * </TextItem>
          ))}
        </TextGroup>
        {/* Duplicated set for seamless loop */}
        <TextGroup>
          {features.map((text, index) => (
            <TextItem key={`duplicate-${index}`}>{text} * </TextItem>
          ))}
        </TextGroup>
      </SlidingTrack>
    </BannerContainer>
  )
}

export default SlidingBanner