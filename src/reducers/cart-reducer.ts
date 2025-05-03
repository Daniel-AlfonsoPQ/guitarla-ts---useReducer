import { db } from "../data/db";
import { CarItem, Guitar } from "../types";

export type CartActions = 
    { type: 'add-to-cart', payload: { item: Guitar } } |
    { type: 'remove-from-cart', payload: { id: Guitar['id'] } } |
    { type: 'update-cart-quantity', payload: { id: Guitar['id'], action: 'increment' | 'decrement' } } |
    { type: 'clear-cart' }

export type CartState = {
    data: Guitar[]
    cart: CarItem[]
}

const initialCart = () : CarItem[] => {
        const cart = localStorage.getItem('cart')
        return cart ? JSON.parse(cart) : []
}

export const initialState: CartState = {
    data: db,
    cart: initialCart()
}

const MAX_ITEMS = 5
const MIN_ITEMS = 1

export const cartReducer = (
        state: CartState = initialState,
        action: CartActions
    ) => {

    if(action.type === 'add-to-cart') {

        const itemInCart = state.cart.find(cartItem => cartItem.id === action.payload.item.id)

        let updatedCart : CarItem[] = []
        if(itemInCart) {
            updatedCart = state.cart.map(cartItem => {
                if (cartItem.id === action.payload.item.id && cartItem.quantity < MAX_ITEMS) {
                    return { ...cartItem, quantity: cartItem.quantity + 1 }
                } else {
                    return cartItem
                }
            })
        } else {
            const newItem: CarItem = { ...action.payload.item, quantity: 1 }
            updatedCart = [...state.cart, newItem]
        }

        return { ...state, cart: updatedCart }
    }

    if(action.type === 'remove-from-cart') {
        return { ...state, cart: state.cart.filter(cartItem => cartItem.id !== action.payload.id) }
    }

    if(action.type === 'update-cart-quantity'){
        const updatedCart = state.cart.map(cartItem => {
            if (cartItem.id === action.payload.id) {
              if (action.payload.action === 'increment' && cartItem.quantity < MAX_ITEMS) {
                return { ...cartItem, quantity: cartItem.quantity + 1 }
              }
              if (action.payload.action === 'decrement' && cartItem.quantity > MIN_ITEMS) {
                return { ...cartItem, quantity: cartItem.quantity - 1 }
              }
            }
            return cartItem
          })
        
          return { ...state, cart: updatedCart }
    }


    if(action.type === 'clear-cart'){
        return { ...state, cart: []}
    }

    return state;
}