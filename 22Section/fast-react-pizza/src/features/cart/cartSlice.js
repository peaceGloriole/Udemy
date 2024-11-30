import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  //   cart: [
  //     {
  //       pizzaId: 12,
  //       name: `Meat Pizza`,
  //       quantity: 1,
  //       unitPrice: 16,
  //       totalPrice: 32,
  //     },
  //   ],
};

const cartSlice = createSlice({
  name: `cart`,
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    incItemQty(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decItemQty(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addToCart, deleteItem, incItemQty, decItemQty, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0);

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((acc, item) => acc + item.quantity, 0);
