import Navbar from './Navbar'
import CartModal from '../../cart/CartModal';
import React from 'react';

function Layout({ children }) {
  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {children}
        <CartModal/>
      </main>
    </div>
  )
}

export default Layout