import { styled } from '@mui/material/styles'
import React from 'react';

const ContactContainer = styled('section')({
  padding: '80px 0',
  backgroundColor: 'rgb(255, 248, 225)',
  minHeight: '100vh'
})

const Container = styled('div')({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px'
})

const Title = styled('h2')({
  textAlign: 'center',
  fontSize: '36px',
  marginBottom: '50px',
  color: '#333'
})

const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '60px'
})

const Form = styled('form')({
  width: '100%',
  maxWidth: '600px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
})

const InputRow = styled('div')({
  display: 'flex',
  gap: '20px',
  width: '100%',
  '@media (max-width: 600px)': {
    flexDirection: 'column'
  }
})

const Input = styled('input')({
  flex: 1,
  padding: '15px',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: 'white',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  '&:focus': {
    outline: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  }
})

const TextArea = styled('textarea')({
  width: '100%',
  padding: '15px',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: 'white',
  minHeight: '150px',
  resize: 'vertical',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  '&:focus': {
    outline: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  }
})

const SubmitButton = styled('button')({
  width: 'fit-content',
  padding: '12px 30px',
  backgroundColor: '#85473E',
  color: 'white',
  border: 'none',
  borderRadius: '25px',
  cursor: 'pointer',
  alignSelf: 'center',
  '&:hover': {
    backgroundColor: '#6a372f'
  }
})

const ContactInfo = styled('div')({
  textAlign: 'center',
  marginBottom: '40px'
})

const ContactInfoTitle = styled('h3')({
  fontSize: '28px',
  marginBottom: '30px',
  color: '#333'
})

const InfoContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: '40px',
  marginBottom: '40px'
})

const InfoBox = styled('div')({
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  flex: 1,
  maxWidth: '500px'
})

const MapContainer = styled('div')({
  borderRadius: '10px',
  overflow: 'hidden',
  height: '300px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  flex: 1,
  maxWidth: '500px'
})

function ContactSection() {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulario enviado')
  }

  return (
    <ContactContainer id="contacto">
      <Container>
        <Title>Contáctanos Ahora</Title>
        
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <InputRow>
              <Input type="text" placeholder="Nombre" required />
              <Input type="email" placeholder="Correo" required />
            </InputRow>
            <TextArea placeholder="Mensaje" required />
            <SubmitButton type="submit">Enviar Mensaje</SubmitButton>
          </Form>
        </FormContainer>

        <ContactInfo>
          <ContactInfoTitle>Datos de Contacto</ContactInfoTitle>
          <InfoContainer>
            <InfoBox>
              <p>Teléfono: 123-456-7890</p>
              <p>WhatsApp: 123-456-7890</p>
              <p>Email: info@mueblescreativos.com</p>
              <p>Dirección: Santiago de Cali, Colombia</p>
              <p>Horario de Atención: Lunes a Viernes: 9am - 6pm</p>
            </InfoBox>
            <MapContainer>
              <iframe 
                src="https://www.openstreetmap.org/export/embed.html?bbox=-76.5853,3.3748,-76.5097,3.4524&layer=mapnik"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                title="Ubicación de la tienda"
              />
            </MapContainer>
          </InfoContainer>
        </ContactInfo>
      </Container>
    </ContactContainer>
  )
}

export default ContactSection