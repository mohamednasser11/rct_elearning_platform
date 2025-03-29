import React, { useContext } from 'react';
import { CartContext } from '../../contexts/cartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useContext(CartContext);
    const { id, title, price, quantity, image } = item;

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1) return;
        updateQuantity(id, newQuantity);
    };

    return (
        <div className="cart-item">
            <img src={image} alt={title} className="cart-item-image" />
            <div className="cart-item-details">
                <h3 className="cart-item-title">{title}</h3>
                <div className="cart-item-price">${price}</div>
            </div>
            <div className="cart-item-controls">
                <div className="quantity-controls">
                    <button 
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="quantity-btn"
                    >
                        -
                    </button>
                    <span className="quantity">{quantity}</span>
                    <button 
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="quantity-btn"
                    >
                        +
                    </button>
                </div>
                <button 
                    onClick={() => removeFromCart(id)}
                    className="remove-btn"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItem;
