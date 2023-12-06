import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (existingItemIndex !== -1) {
        const updatedCartItems = state.cartItems.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        });
        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }
    case 'REDUCE_QUANTITY':
      const reduceItemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (reduceItemIndex !== -1) {
        const updatedCartItems = state.cartItems.map((item, index) => {
          if (index === reduceItemIndex) {
            return {
              ...item,
              quantity: Math.max(0, item.quantity - 1),
            };
          } else {
            return item;
          }
        });
        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        return state;
      }
    case 'APPLY_PROMO':
      console.log(action.payload);
      return {
        ...state,
        promoCode: action.payload.promoCode,
        promoDiscount: action.payload.promoDiscount,
      };
    case 'REMOVE_FROM_CART':
      const removeCartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
        cartItems: removeCartItems,
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const initialState = { cartItems: [], promoCode: '', promoDiscount: 0, discountPrice: 0 };
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const getTotalCartItems = () => {
    return state.cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPriceCart = () => {
    let totalPrice = state.cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    let discount = state.promoDiscount;
    let discountPrice = Math.max(0, totalPrice * discount);
    if (discount) {
      return { totalPrice, discountPrice, priceAfterDiscount: Math.max(0, totalPrice - discountPrice) };
    } else {
      return { totalPrice };
    }
  };

  return (
    <CartContext.Provider value={{ state, dispatch, getTotalCartItems, getTotalPriceCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { useCart };

export default CartContext;
