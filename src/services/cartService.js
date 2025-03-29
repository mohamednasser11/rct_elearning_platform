const CART_STORAGE_KEY = 'shopping_cart';

const cartService = {
    getCart: () => {
        const cart = localStorage.getItem(CART_STORAGE_KEY);
        return cart ? JSON.parse(cart) : [];
    },

    saveCart: (cart) => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    },

    addToCart: (course) => {
        const cart = cartService.getCart();
        const existingItem = cart.find(item => item.id === course.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...course, quantity: 1 });
        }

        cartService.saveCart(cart);
        return cart;
    },

    removeFromCart: (courseId) => {
        const cart = cartService.getCart();
        const updatedCart = cart.filter(item => item.id !== courseId);
        cartService.saveCart(updatedCart);
        return updatedCart;
    },

    updateQuantity: (courseId, quantity) => {
        const cart = cartService.getCart();
        const item = cart.find(item => item.id === courseId);
        
        if (item) {
            item.quantity = Math.max(1, quantity);
            cartService.saveCart(cart);
        }
        
        return cart;
    },

    clearCart: () => {
        localStorage.removeItem(CART_STORAGE_KEY);
        return [];
    }
};

export default cartService;
