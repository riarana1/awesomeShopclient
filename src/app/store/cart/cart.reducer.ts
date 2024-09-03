import { CartActions } from './cart.actions';
import { Cart, HttpError } from '../model';
import { createReducer, on } from '@ngrx/store';

export interface CartState {
  cart: Cart | null;
  errors: Array<HttpError>;
  loading: boolean;
  fetchLoading: boolean;
}

const initialState: CartState = {
  cart: null,
  errors: [],
  loading: false,
  fetchLoading: false,
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.setCart, (state, { cart, effect }) => ({
    ...state,
    cart,
    errors: [...state.errors.filter((error) => error.errorEffect !== effect)],
    loading: false,
    fetchLoading: state.fetchLoading,
  })),
  on(CartActions.fetchCart, (state) => ({
    ...state,
    fetchLoading: true,
  })),
  on(CartActions.fetchCartSuccess, (state, { cart, effect }) => ({
    ...state,
    cart,
    errors: [...state.errors.filter((error) => error.errorEffect !== effect)],
    loading: false,
    fetchLoading: false,
  })),

  on(CartActions.applyDiscountSuccess, (state, { effect }) => ({
    ...state,
    errors: [...state.errors.filter((error) => error.errorEffect !== effect)],
    loading: false,
  })),

  on(
    CartActions.addToCart,
    CartActions.removeFromCart,
    CartActions.applyDiscount,
    CartActions.incrementCart,
    CartActions.decrementCart,
    (state) => ({
      ...state,
      loading: true,
    })
  ),

  on(CartActions.cartError, (state, { cartError }) => {
    const errors = [...state.errors];
    const index = errors.findIndex(
      (error) => error.errorEffect === cartError.errorEffect
    );
    if (index !== -1) {
      errors[index] = cartError;
    } else {
      errors.push(cartError);
    }
    return {
      ...state,
      loading: false,
      errors,
    };
  }),
  on(CartActions.emptyCartSuccess, (state) => {
    return initialState;
  })
);
