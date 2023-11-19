import { createReducer, on } from '@ngrx/store';
import {
  addCart,
  addPrdCart,
  destroyCart,
  loadCart,
  removeCart,
  removePrdCart,
  updateCart,
} from './cart.action';
import { ICart } from '~/app/@types';

const initialState: { cart: ICart[]; loading: boolean; error: any } = {
  cart: [],
  loading: false,
  error: null,
};

export const cartReducer = createReducer(
  initialState,

  on(loadCart, (state) => {
    const data = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart')!)
      : state.cart;

    return {
      ...state,
      cart: data.cart,
      loading: false,
      error: null,
    };
  }),

  on(addCart, (state, { cart }) => {
    if (
      state &&
      state?.cart &&
      state?.cart?.some((prd) => prd._id === cart._id)
    ) {
      const newCart = state?.cart.map((prd) =>
        prd._id === cart._id
          ? { ...prd, amount: prd.amount + cart.amount }
          : prd
      );
      const newState = {
        ...state,
        cart: newCart,
      };
      localStorage.setItem('cart', JSON.stringify(newState));

      return newState;
    }

    const newState = {
      ...state,
      cart: state.cart ? [cart, ...state.cart] : [cart],
    };

    localStorage.setItem('cart', JSON.stringify(newState));

    return newState;

    // Lưu trạng thái vào localStorage
  }),

  on(removePrdCart, (state, { id }) => {
    const newCart = state.cart.map((prd) =>
      prd._id === id
        ? { ...prd, amount: prd.amount - 1 < 1 ? 1 : prd.amount - 1 }
        : prd
    );
    const newState = {
      ...state,
      cart: newCart,
    };
    localStorage.setItem('cart', JSON.stringify(newState));

    return newState;
  }),
  on(addPrdCart, (state, { id }) => {
    const newCart = state.cart.map((prd) =>
      prd._id === id ? { ...prd, amount: prd.amount + 1 } : prd
    );
    const newState = {
      ...state,
      cart: newCart,
    };
    localStorage.setItem('cart', JSON.stringify(newState));

    return newState;
  }),
  on(updateCart, (state, { id, amount }) => {
    const newCart = state.cart.map((prd) => {
      if (prd._id === id) {
        return { ...prd, amount: amount < 1 ? 1 : amount };
      }
      return prd;
    });
    const newState = {
      ...state,
      cart: newCart,
    };
    localStorage.setItem('cart', JSON.stringify(newState));

    return newState;
  }),
  on(removeCart, (state, { id }) => {
    const newCart = state.cart.filter((prd) => prd._id !== id);
    const newState = {
      ...state,
      cart: newCart,
    };

    // Lưu trạng thái vào localStorage
    localStorage.setItem('cart', JSON.stringify(newState));

    return newState;
  }),
  on(destroyCart, (state) => {
    const newState = {
      ...state,
      cart: [],
    };

    // Lưu trạng thái vào localStorage
    localStorage.setItem('cart', JSON.stringify(newState));

    return newState;
  })
);
