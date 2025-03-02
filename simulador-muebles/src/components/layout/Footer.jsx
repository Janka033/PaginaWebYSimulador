import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import React from 'react';

const FooterContainer = styled("footer")({
  backgroundColor: "#f5f5f5",
  padding: "40px 0",
  marginTop: "auto",
});

const FooterContent = styled("div")({
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 20px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "40px",
});

const FooterSection = styled("div")({
  "& h3": {
    color: "#333",
    marginBottom: "20px",
  },
  "& ul": {
    listStyle: "none",
    padding: 0,
  },
  "& li": {
    marginBottom: "10px",
  },
  "& a": {
    color: "#666",
    textDecoration: "none",
    "&:hover": {
      color: "#a13d14",
    },
  },
});

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>KOOK</h3>
          <p>Diseña tus muebles a medida con nuestro innovador simulador.</p>
        </FooterSection>

        <FooterSection>
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/simulator">Simulador</Link>
            </li>
            <li>
              <Link to="/sobre-nosotros">Sobre Nosotros</Link>
            </li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Contacto</h3>
          <ul>
            <li>Teléfono: 123-456-7890</li>
            <li>Email: info@kook.com</li>
            <li>Dirección: Santiago de Cali, Colombia</li>
          </ul>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;
