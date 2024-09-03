import { ActionReducerMap } from '@ngrx/store';
import * as fromCart from '../store/cart/cart.reducer';
import * as fromOrder from '../store/order/order.reducer';
import * as fromAuth from '../store/auth/auth.reducer';
import * as fromShowcase from '../store/showcase/showcase.reducer';
import * as fromBrowse from '../store/browse/browse.reducer';
import { HttpErrorResponse } from '@angular/common/http';

export interface AppState {
  cart: fromCart.CartState;
  order: fromOrder.OrderState;
  auth: fromAuth.AuthState;
  showcase: fromShowcase.ShowcaseState;
  browse: fromBrowse.BrowseState;
}

export const reducers: ActionReducerMap<AppState> = {
  cart: fromCart.cartReducer as any,
  order: fromOrder.orderReducer as any,
  auth: fromAuth.authReducer as any,
  showcase: fromShowcase.showcaseReducer as any,
  browse: fromBrowse.browseReducer as any,
};
