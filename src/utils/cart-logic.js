// This function calculates the total price of items in the store
export const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// This function adds an item and returns the new cart state
export const addToCart = (currentCart, product) => {
    const existingItem = currentCart.find(item => item.id === product.id);
    if (existingItem) {
        return currentCart.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
    }
    return [...currentCart, { ...product, quantity: 1 }];
};
