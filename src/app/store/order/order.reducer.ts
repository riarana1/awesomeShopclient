import { Payment, Personal, Shipping } from './../model';
import { OrderActions } from './order.actions';
import { HttpError } from '../model';
import { createReducer, on } from '@ngrx/store';

export interface OrderState {
  personal: Personal | null;
  shipping: Shipping | null;
  payment: Payment | null;
  checkoutStep: number;
  isCheckoutActive: boolean;
  errors: Array<HttpError>;
}

const initialState: OrderState = {
  personal: null,
  shipping: null,
  payment: null,
  checkoutStep: 0,
  isCheckoutActive: false,
  errors: [],
};
export const orderReducer = createReducer(
  initialState,
  on(OrderActions.postPersonal, (state, { personal }) => ({
    ...state,
    personal,
    errors: [],
  })),
  on(OrderActions.postShipping, (state, { shipping }) => ({
    ...state,
    shipping,
    errors: [],
  })),
  on(OrderActions.postPayment, (state, { payment }) => ({
    ...state,
    payment,
    errors: [],
  })),
  on(OrderActions.setCheckoutStep, (state, { step }) => ({
    ...state,
    step,
    errors: [],
  })),
  on(OrderActions.isCheckoutActive, (state, { active }) => {
    if (active) {
      return {
        ...initialState,
        isCheckoutActive: active,
      };
    }
    return {
      ...initialState,
      isCheckoutActive: false,
    };
  }),
  on(OrderActions.orderError, (state, { orderError }) => {
    const errors = [...state.errors];
    const index = errors.findIndex(
      (error) => error.errorEffect === orderError.errorEffect
    );
    if (index !== -1) {
      errors[index] = orderError;
    } else {
      errors.push(orderError);
    }
    return {
      ...state,
      loading: false,
      errors,
    };
  }),
  on(OrderActions.emptyOrder, (state) => ({
    ...state,
    isCheckoutActive: state.isCheckoutActive,
    errors: [],
  }))
);
