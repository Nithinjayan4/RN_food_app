import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './sllices/cartSlice'
import restaurantSlice from './sllices/restaurantSlice'

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    restaurant:restaurantSlice
  },
})