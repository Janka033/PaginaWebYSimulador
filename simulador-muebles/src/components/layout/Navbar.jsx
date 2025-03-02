import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { scrollToSection } from '../../utils/scrollUtils'
import React from 'react';

const NavContainer = styled('nav')(({ isScrolled }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  padding: '15px 50px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
  backdropFilter: isScrolled ? 'blur(10px)' : 'none',
  transition: 'all 0.3s ease-in-out',
  boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none'
}))

const Logo = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  textDecoration: 'none',
  color: 'inherit'
})

const LogoImage = styled('img')({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  objectFit: 'cover'
})

const NavLinks = styled('div')({
  display: 'flex',
  gap: '40px',
  alignItems: 'center'
})

const NavLink = styled('a')({
  textDecoration: 'none',
  color: '#333',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#85473E'
  }
})

const CTAButton = styled('a')({
  backgroundColor: '#85473E',
  color: 'white',
  padding: '12px 30px',
  borderRadius: '25px',
  textDecoration: 'none',
  fontWeight: '500',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#6a372f',
    transform: 'translateY(-2px)'
  }
})
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (sectionId) => (e) => {
    e.preventDefault()
    scrollToSection(sectionId)
  }

  return (
    <NavContainer isScrolled={isScrolled}>
      <Logo to="/">
        <LogoImage src="/images/kook.jpeg" alt="KOOK Logo" />
        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>KOOK</span>
      </Logo>

      <NavLinks>
        <NavLink onClick={handleNavClick('inicio')}>Inicio</NavLink>
        <NavLink onClick={handleNavClick('productos')}>Productos</NavLink>
        <NavLink onClick={handleNavClick('sobre-nosotros')}>Sobre Nosotros</NavLink>
        <NavLink onClick={handleNavClick('contacto')}>Contacto</NavLink>
        <CTAButton href="/simulador">¡Comienza Ya!</CTAButton>
      </NavLinks>
    </NavContainer>
  )
}

export default Navbar