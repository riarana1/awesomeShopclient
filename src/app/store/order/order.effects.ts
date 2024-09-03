import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrderActions, POST_ORDER } from './order.actions';
import { CartActions } from '../cart/cart.actions';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Checkout } from '../model';

@Injectable()
export class OrderEffects {
  private actions$: Actions = inject(Actions);
  private orderService: OrderService = inject(OrderService);
  private router: Router = inject(Router);

  //@Effect()
  postOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.postOrder),
      switchMap((action) => {
        return this.orderService.postOrder(action.checkout).pipe(
          switchMap((res) => {
            this.router.navigate(['/checkout/success']);
            return [OrderActions.emptyOrder, CartActions.emptyCartSuccess];
          }),
          catchError((error) => {
            return of(
              OrderActions.orderError({
                orderError: { error, errorEffect: POST_ORDER },
              })
            );
          })
        );
      })
    )
  );
}
