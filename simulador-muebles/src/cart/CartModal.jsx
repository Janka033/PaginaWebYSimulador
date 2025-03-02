import { styled } from "@mui/material/styles";
import useCartStore from "../store/cartStore";
import { Close, Add, Remove } from '@mui/icons-material';
import React from 'react';


const CartContainer = styled('div')(({ isOpen }) => ({
  position: 'fixed',
  top: 0,
  right: isOpen ? 0 : '-400px',
  width: '400px',
  height: '100vh',
  backgroundColor: 'white',
  boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
  transition: 'right 0.3s ease-in-out',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column'
}));

const CartHeader = styled('div')({
  padding: '20px',
  backgroundColor: '#85473E',
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const CloseButton = styled('button')({
  background: 'none',
  border: 'none',
  color: 'white',
  fontSize: '24px',
  cursor: 'pointer',
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    opacity: 0.8
  }
});

const CartItemContainer = styled('div')({
  padding: '15px',
  borderBottom: '1px solid #eee',
  display: 'flex',
  alignItems: 'center',
  gap: '15px'
});

const ItemImage = styled('img')({
  width: '80px',
  height: '80px',
  objectFit: 'cover',
  borderRadius: '4px'
});

const ItemDetails = styled('div')({
  flex: 1
});

const QuantityControls = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginTop: '10px'
});

const QuantityButton = styled('button')({
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: '50%',
  backgroundColor: '#85473E',
  color: 'white',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#6a372f'
  }
});

const CartFooter = styled('div')({
  marginTop: 'auto',
  padding: '20px',
  borderTop: '1px solid #eee',
  backgroundColor: '#f9f9f9'
});

const CheckoutButton = styled('button')({
  width: '100%',
  padding: '12px',
  backgroundColor: '#85473E',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '500',
  '&:hover': {
    backgroundColor: '#6a372f'
  }
});

function CartModal() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, clearCart } = useCartStore();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert('¡Gracias por tu compra!');
    clearCart();
    toggleCart();
  };

  return (
    <CartContainer isOpen={isOpen}>
      <CartHeader>
        <h3>Carrito de Compras</h3>
        <CloseButton onClick={toggleCart}>
          <Close />
        </CloseButton>
      </CartHeader>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {items.map(item => (
          <CartItemContainer key={item.id}>
            <ItemImage src={item.image} alt={item.name} />
            <ItemDetails>
              <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
              <p style={{ margin: '0 0 5px 0', color: '#85473E', fontWeight: 'bold' }}>
                ${item.price}
              </p>
              <QuantityControls>
                <QuantityButton onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}>
                  <Remove fontSize="small" />
                </QuantityButton>
                <span>{item.quantity}</span>
                <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Add fontSize="small" />
                </QuantityButton>
                <button
                  onClick={() => removeItem(item.id)}
                  style={{
                    marginLeft: 'auto',
                    padding: '5px 10px',
                    backgroundColor: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Eliminar
                </button>
              </QuantityControls>
            </ItemDetails>
          </CartItemContainer>
        ))}
      </div>

      <CartFooter>
        <h3 style={{ marginBottom: '15px' }}>Total: ${total}</h3>
        <CheckoutButton onClick={handleCheckout}>
          Proceder al pago
        </CheckoutButton>
      </CartFooter>
    </CartContainer>
  );
}

export default CartModal;
