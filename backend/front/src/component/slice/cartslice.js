import { createSlice } from "@reduxjs/toolkit"
const initialState ={
    item : [],
    tempitem : [],
    totalprice : 0,
}
export const cartslice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
    addToCart(state, action) {
        const existingItem = state.item.find(item => item._id === action.payload._id);

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.item.push({ ...action.payload, quantity: 1 });
        }
    
        
        state.totalprice = state.item.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
    
        state.tempitem = [...state.item];
        localStorage.setItem('cartItems', JSON.stringify(state.item));
        localStorage.setItem('totalPrice', JSON.stringify(state.totalprice));
        },
        removeFromCart(state, action) {
        const removedItem = state.item.find(item => item._id === action.payload);
        
        if (removedItem) {
          state.totalprice -= removedItem.price * removedItem.quantity;
        }
      
        state.item = state.item.filter(item => item._id !== action.payload);
        state.tempitem = [...state.item];
        localStorage.setItem('cartItems', JSON.stringify(state.item));
        localStorage.setItem('totalPrice', JSON.stringify(state.totalprice));
        },
        updateQuantity(state, action) {
        const { productId, quantity } = action.payload;
        const item = state.item.find(item => item._id === productId);
        
        if (item) {
          const oldTotal = item.price * item.quantity;
          item.quantity = quantity;
          const newTotal = item.price * item.quantity;
          state.totalprice = state.totalprice - oldTotal + newTotal;
        }
        
        state.tempitem = [...state.item];
        localStorage.setItem('cartItems', JSON.stringify(state.item));
        localStorage.setItem('totalPrice', JSON.stringify(state.totalprice));
        },  

        clearCart(state, action){
          state.item = []
          
        }
        
      }
}
)
export default cartslice.reducer
export const {addToCart, removeFromCart, updateQuantity, clearCart }= cartslice.actions