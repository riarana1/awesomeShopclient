import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Cart, HttpError } from '../model';

export const ADD_TO_CART = 'ADD_TO_CART';
export const INCREMENT_CART = 'INCREMENT_CART';
export const DECREMENT_CART = 'DECREMENT_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const EMPTY_CART = 'EMPTY_CART';
export const EMPTY_CART_SUCCESS = 'EMPTY_CART_SUCCESS';
export const FETCH_CART = 'FETCH_CART';
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
export const APPLY_DISCOUNT = 'APPLY_DISCOUNT';
export const APPLY_DISCOUNT_SUCCESS = 'APPLY_DISCOUNT_SUCCESS';
export const SET_CART = 'SET_CART';
export const CART_ERROR = 'CART_ERROR';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Add To Cart': props<{ id: number; amount: string }>(),
    'Increment Cart': props<{ id: number; amount: string }>(),
    'Decrement Cart': props<{ id: number; amount: string }>(),
    'Set Cart': props<{ cart: Cart; effect: string }>(),
    'Remove From Cart': props<{ id: number }>(),
    'Empty Cart': emptyProps(),
    'Empty Cart Success': emptyProps(),
    'Fetch Cart': emptyProps(),
    'Fetch Cart Success': props<{ cart: Cart; effect: string }>(),
    'Apply Discount': props<{ code: string }>(),
    'Apply Discount Success': props<{ effect: string }>(),
    'Cart Error': props<{
      cartError: HttpError;
    }>(),
  },
});
