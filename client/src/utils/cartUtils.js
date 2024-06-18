export const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

export const updateCart = (state) => {
    //item price
    state.itemsPrice = addDecimal(state.cartItems.reduce((acc, item) => acc + item.price * item.qty,0))

    //tax price 10%
    state.taxPrice = addDecimal(Number(state.itemsPrice * 0.1).toFixed(2))
    
    //shipping price $10 under $50, free over $50
    state.shippingPrice = addDecimal(state.itemsPrice > 50 ? 0 : 10)
    
    //total price
    state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state))

    return state;
}