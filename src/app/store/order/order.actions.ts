import { Shipping, Payment } from './../model';

import { Action, createActionGroup, emptyProps, props } from '@ngrx/store';
import { HttpError } from '../model';
import { Checkout, Personal } from '../model';

export const IS_CHECKOUT_ACTIVE = 'IS_CHECKOUT_ACTIVE';
export const SET_CHECKOUT_STEP = 'SET_CHECKOUT_STEP';
export const POST_PERSONAL = 'POST_PERSONAL';
export const POST_SHIPPING = 'POST_SHIPPING';
export const POST_PAYMENT = 'POST_PAYMENT';
export const POST_ORDER = 'POST_ORDER';
export const EMPTY_ORDER = 'EMPTY_ORDER';
export const ORDER_ERROR = 'ORDER_ERROR';

export const OrderActions = createActionGroup({
  source: 'Order',
  events: {
    'Is Checkout Active': props<{ active: boolean }>(),
    'Set Checkout Step': props<{ step: number }>(),
    'Post Order': props<{ checkout: Checkout }>(),
    'Post Personal': props<{ personal: Personal }>(),
    'Post Shipping': props<{ shipping: Shipping }>(),
    'Post Payment': props<{ payment: Payment }>(),
    'Empty Order': emptyProps(),
    'Order Error': props<{ orderError: HttpError }>(),
  },
});
