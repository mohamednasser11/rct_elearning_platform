import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsCartCheckFill } from "react-icons/bs";
import { FaShoppingBag, FaTrashAlt, FaLongArrowAltRight, FaTag, FaCheckCircle } from 'react-icons/fa';
import { useCart } from '../../contexts/cartContext';
import './cartPage.css';

// Promo codes with their discount percentages
const PROMO_CODES = {
  'WELCOME10': 10,
  'STUDENT25': 25,
  'SAVE15': 15
};

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartCount } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    if (appliedPromo) {
      return calculateSubtotal() * (appliedPromo.discount / 100);
    }
    return 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (!code) {
      setPromoError('Please enter a promo code');
      return;
    }

    if (PROMO_CODES[code]) {
      setAppliedPromo({
        code: code,
        discount: PROMO_CODES[code]
      });
      setPromoError('');
      // Show notification
      setNotificationMessage(`Promo code ${code} applied! ${PROMO_CODES[code]}% discount`);
      setShowNotification(true);
      
      // Hide notification after 5 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    } else {
      setPromoError('Invalid promo code');
      setAppliedPromo(null);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError('');
    // Show notification for removing promo
    setNotificationMessage('Promo code removed');
    setShowNotification(true);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  return (
    <div className="cart-container">
      <h1><BsCartCheckFill className="cart-icon" size={24} /> Shopping Cart {cartCount > 0 && <span>({cartCount} items)</span>}</h1>
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
                      <div className="placeholder-image">
                        <FaShoppingBag size={24} />
                      </div>
                    )}
                  </div>
                  <div className="item-details">
                    <h3>{item.title}</h3>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="item-total">
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button 
                    className="remove-item" 
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>
              ))}
              <div className="cart-actions">
                <button className="clear-cart" onClick={clearCart}>
                  <FaTrashAlt size={16} /> Clear Cart
                </button>
                <Link to="/courses" className="continue-shopping">
                  Continue Shopping
                </Link>
              </div>
            </>
          ) : (
            <div className="empty-cart">
              <BsCartCheckFill size={60} color="#d1d5db" />
              <p>Your cart is empty</p>
              <p className="empty-cart-message">Looks like you haven't added any courses to your cart yet.</p>
              <Link to="/courses" className="continue-shopping">
                Browse Courses <FaLongArrowAltRight size={16} />
              </Link>
            </div>
          )}
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>${calculateSubtotal().toFixed(2)}</span>
          </div>
          {appliedPromo && (
            <div className="summary-item discount-line">
              <span>Discount ({appliedPromo.discount}%)</span>
              <span className="discount-amount">-${calculateDiscount().toFixed(2)}</span>
            </div>
          )}
          <div className="summary-total">
            <span>Total</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
          {/* Promo Code Section */}
          <div className="promo-code-section">
            <div className="promo-code-header">
              <FaTag className="promo-icon" size={16} />
              <span>Promo Code</span>
            </div>
            <div className="promo-code-input-group">
              <input 
                type="text" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                disabled={appliedPromo !== null}
                className={promoError ? 'promo-error' : ''}
              />
              {!appliedPromo ? (
                <button 
                  className="apply-promo-btn" 
                  onClick={handleApplyPromo}
                >
                  Apply
                </button>
              ) : (
                <button 
                  className="remove-promo-btn" 
                  onClick={handleRemovePromo}
                >
                  Remove
                </button>
              )}
            </div>
            {promoError && <p className="promo-error-message">{promoError}</p>}
          </div>
          <button 
            className="checkout-button" 
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
          {cartItems.length > 0 && (
            <div className="promo-hint">
              <p><small>Hint: Try promo codes 'WELCOME10', 'STUDENT25', or 'SAVE15'</small></p>
            </div>
          )}
        </div>
      </div>
      
      {/* Notification popup */}
      {showNotification && (
        <div className="notification-popup">
          <FaCheckCircle className="notification-icon" size={24} />
          <span>{notificationMessage}</span>
        </div>
      )}
    </div>
  );
};

export default CartPage;
