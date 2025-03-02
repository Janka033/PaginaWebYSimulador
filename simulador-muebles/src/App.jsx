import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';
import SimuladorPage from './pages/SimuladorPage';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre-nosotros" element={<AboutSection />} />
          <Route path="/contacto" element={<ContactSection />} />
          <Route path="/simulador" element={<SimuladorPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;