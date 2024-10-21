import { createSlice } from "@reduxjs/toolkit";
 
const initialState = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.push({
        id: action.payload.id,
        name: action.payload.name,
        qty: action.payload.qty,
        size: action.payload.size,
        price: action.payload.price,
        img: action.payload.img,
      });
    },
    removeItem(state, action) {
      state.splice(action.payload.index, 1);
    },
    dropCart() {
      return []; 
    },
    updateItem(state, action) {
      const existingItem = state.find((food) => food.id === action.payload.id);
      if (existingItem) {
        existingItem.qty += parseInt(action.payload.qty);
        existingItem.price += action.payload.price;
      }
    },
  },
});

export const { addItem, removeItem, dropCart, updateItem } = cartSlice.actions;
export default cartSlice.reducer;