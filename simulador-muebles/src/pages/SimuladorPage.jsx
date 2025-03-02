import React from 'react';
import { styled } from '@mui/material/styles';
import WardrobeSimulator from '../components/simulator/components/WardrobeSimulator';

const SimulatorPageContainer = styled('div')({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#ffffff',
  position: 'relative'
});

const SimuladorPage = () => {
  return (
    <SimulatorPageContainer>
      <WardrobeSimulator />
    </SimulatorPageContainer>
  );
};

export default SimuladorPage;