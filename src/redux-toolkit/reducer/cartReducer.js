import { createSlice } from '@reduxjs/toolkit';
import { filter } from 'lodash';
import { Chance } from 'chance';

const chance = new Chance();

const initialState = {
  checkout: {
    step: 0,
    products: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null,
    payment: {
      type: 'free',
      method: 'cod',
      card: '',
    },
  },
};

let subtotal;
let result;

let latestProducts;
let newProduct;
let inCartProduct;
let oldSubTotal;
let amount;
let difference;
let newShipping;

export const cartReducer = createSlice({
  name: '@cart',
  initialState,
  reducers: {
    ADD_PRODUCTS: (state, action) => {
      newProduct = { ...action.product, itemId: chance.timestamp() };

      subtotal = newProduct?.quantity * newProduct.offerPrice;

      inCartProduct = filter(state.checkout.products, {
        id: newProduct.id,
        color: newProduct.color,
        size: newProduct.size,
      });
      if (inCartProduct && inCartProduct.length > 0) {
        const newProducts = state.checkout.products.map((item) => {
          if (
            newProduct?.id === item.id &&
            newProduct?.color === item.color &&
            newProduct.size === item.size
          ) {
            return {
              ...newProduct,
              quantity: newProduct.quantity + inCartProduct[0].quantity,
            };
          }
          return item;
        });
        latestProducts = newProducts;
      } else {
        latestProducts = [...state.checkout.products, newProduct];
      }

      return {
        ...state,
        checkout: {
          ...state.checkout,
          products: latestProducts,
          subtotal: state.checkout.subtotal + subtotal,
          total: state.checkout.total + subtotal,
        },
      };
    },

    REMOVE_PRODUCT: (state, action) => {
      result = filter(state.checkout.products, { itemId: action.id });
      subtotal = result[0].quantity * result[0].offerPrice;

      return {
        ...state,
        checkout: {
          ...state.checkout,
          products: filter(
            state.checkout.products,
            (item) => item.itemId !== action.id
          ),
          subtotal: state.checkout.subtotal - subtotal,
          total: state.checkout.total + -subtotal,
        },
      };
    },
    UPDATE_QUANTITY: (state, action) => {
      result = filter(state.checkout.products, { itemId: action.id });
      subtotal = action.quantity * result[0].offerPrice;
      oldSubTotal = 0;

      latestProducts = state.checkout.products.map((item) => {
        if (action.id === item.itemId) {
          oldSubTotal = item.quantity * item.offerPrice;
          return { ...item, quantity: action.quantity };
        }
        return item;
      });

      return {
        ...state,
        checkout: {
          ...state.checkout,
          products: latestProducts,
          subtotal: state.checkout.subtotal - oldSubTotal + subtotal,
          total: state.checkout.total - oldSubTotal + subtotal,
        },
      };
    },

    SET_STEP: (state, action) => {
      return {
        ...state,
        checkout: {
          ...state.checkout,
          step: action.step,
        },
      };
    },

    BACK_STEP: (state) => {
      return {
        ...state,
        checkout: {
          ...state.checkout,
          step: state.checkout.step - 1,
        },
      };
    },

    NEXT_STEP: (state) => {
      return {
        ...state,
        checkout: {
          ...state.checkout,
          step: state.checkout.step + 1,
        },
      };
    },

    SET_BILLING_ADDRESS: (state, action) => {
      return {
        ...state,
        checkout: {
          ...state.checkout,
          billing: action.address,
        },
      };
    },

    SET_DISCOUNT: (state, action) => {
      amount = 0;
      difference = 0;
      if (state.checkout.total > 0) {
        switch (action.code) {
          case 'BERRY50':
            amount = chance.integer({
              min: 1,
              max: state.checkout.total < 49 ? state.checkout.total : 49,
            });
            break;
          case 'FLAT05':
            amount = state.checkout.total < 5 ? state.checkout.total : 5;
            break;
          case 'SUB150':
            amount = state.checkout.total < 150 ? state.checkout.total : 150;
            break;
          case 'UPTO200':
            amount = chance.integer({
              min: 1,
              max: state.checkout.total < 199 ? state.checkout.total : 199,
            });
            break;
          default:
            amount = 0;
        }
      }
      if (state.checkout.discount > 0) {
        difference = state.checkout.discount;
      }

      return {
        ...state,
        checkout: {
          ...state.checkout,
          discount: amount,
          total: state.checkout.total + difference - amount,
        },
      };
    },

    SET_SHIPPING_CHARGE: (state, action) => {
      newShipping = 0;
      if (state.checkout.shipping > 0 && action.charge === 'free') {
        newShipping = -5;
      }
      if (action.charge === 'fast') {
        newShipping = 5;
      }
      return {
        ...state,
        checkout: {
          ...state.checkout,
          shipping: action.charge === 'fast' ? 5 : 0,
          total: state.checkout.total + newShipping,
          payment: {
            ...state.checkout.payment,
            type: action.charge,
          },
        },
      };
    },

    SET_PAYMENT_METHOD: (state, action) => {
      return {
        ...state,
        checkout: {
          ...state.checkout,
          payment: {
            ...state.checkout.payment,
            method: action.method,
          },
        },
      };
    },

    SET_PAYMENT_CARD: (state, action) => {
      return {
        ...state,
        checkout: {
          ...state.checkout,
          payment: {
            ...state.checkout.payment,
            card: action.card,
          },
        },
      };
    },

    RESET_CART: (state) => {
      return state;
    },
  },
});

export const {
  ADD_PRODUCTS,
  REMOVE_PRODUCT,
  UPDATE_QUANTITY,
  SET_STEP,
  BACK_STEP,
  NEXT_STEP,
  SET_BILLING_ADDRESS,
  SET_DISCOUNT,
  SET_SHIPPING_CHARGE,
  SET_PAYMENT_METHOD,
  RESET_CART,
} = cartReducer.actions;

export default cartReducer.reducer;
