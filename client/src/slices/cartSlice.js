import { createSlice } from "@reduxjs/toolkit";

const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems: []}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((i) => i._id === item._id);
            if (existItem) {
                state.cartItems = state.cartItems.map((i) => i._id === existItem._id ? item : i)
            } else{
                state.cartItems = [...state.cartItems, item]
            }

            //item price
            state.itemPrice = addDecimal(state.cartItems.reduce((acc, item) => acc + item.price * item.qty,0))
            
            //tax price 10%
            state.taxPrice = addDecimal(Number(state.itemPrice * 0.1).toFixed(2))
            
            //shipping price $10 under $50, free over $50
            state.shippingPrice = addDecimal(state.itemPrice > 50 ? 0 : 10)
            
            //total price
            state.totalPrice = (Number(state.itemPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

            localStorage.setItem('cart', JSON.stringify(state))

        }
    }
})

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer