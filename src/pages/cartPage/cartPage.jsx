import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/cartContext';
import './cartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartCount } = useCart();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // Assuming 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart {cartCount > 0 && <span>({cartCount} items)</span>}</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    {item.image ? (
                      <img src={item.image} alt={item.title} />
                    ) : (
                      <div className="placeholder-image">No Image</div>
                    )}
                  </div>
                  <div className="item-details">
                    <h3>{item.title}</h3>
                    <p className="item-price">${item.price}</p>
                  </div>
                  <div className="item-quantity">
                    <button 
                      className="quantity-btn" 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      className="quantity-btn" 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="item-total">
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button 
                    className="remove-item" 
                    onClick={() => removeFromCart(item.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
              <div className="cart-actions">
                <button className="clear-cart" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            </>
          ) : (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <Link to="/courses" className="continue-shopping">Continue Shopping</Link>
            </div>
          )}
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>${calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Tax</span>
            <span>${calculateTax().toFixed(2)}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
          <button 
            className="checkout-button" 
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
