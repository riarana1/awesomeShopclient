import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import {
  ADD_TO_CART,
  APPLY_DISCOUNT,
  CartActions,
  DECREMENT_CART,
  EMPTY_CART,
  FETCH_CART,
  INCREMENT_CART,
  REMOVE_FROM_CART,
} from './cart.actions';
import { of } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class CartEffects {
  private actions$: Actions = inject(Actions);
  private cartService: CartService = inject(CartService);
  private router: Router = inject(Router);

  //@Effect()
  fetchCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.fetchCart),
      switchMap((action) => {
        return this.cartService.getCart().pipe(
          map((cart) =>
            CartActions.fetchCartSuccess({
              cart: cart,
              effect: FETCH_CART,
            })
          ),
          catchError((error) =>
            of(
              CartActions.cartError({
                cartError: { error, errorEffect: FETCH_CART },
              })
            )
          )
        );
      })
    )
  );

  //@Effect()
  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addToCart),
      switchMap((cart: { id: number; amount: string }) => {
        return this.cartService.postCart(cart.id, cart.amount).pipe(
          map((cart) => {
            this.router.navigate(['/cart']);
            return CartActions.setCart({
              cart: cart,
              effect: FETCH_CART,
            });
          }),
          catchError((error) =>
            of(
              CartActions.cartError({
                cartError: { error, errorEffect: FETCH_CART },
              })
            )
          )
        );
      })
    )
  );

  //@Effect()
  incrementCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.incrementCart),
      switchMap((cart: { id: number; amount: string }) => {
        return this.cartService.incrementCartItem(cart.id, cart.amount).pipe(
          map((cart) =>
            CartActions.setCart({
              cart,
              effect: INCREMENT_CART,
            })
          ),
          catchError((error) =>
            of(
              CartActions.cartError({
                cartError: { error, errorEffect: FETCH_CART },
              })
            )
          )
        );
      })
    )
  );

  //@Effect()
  decrementCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.decrementCart),
      switchMap((cart: { id: number; amount: string }) => {
        return this.cartService.decrementCartItem(cart.id, cart.amount).pipe(
          map((cart) => CartActions.setCart({ cart, effect: DECREMENT_CART })),
          catchError((error) =>
            of(
              CartActions.cartError({
                cartError: { error, errorEffect: FETCH_CART },
              })
            )
          )
        );
      })
    )
  );

  //@Effect()
  removeFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeFromCart),
      switchMap((cart: { id: number }) => {
        return this.cartService.removeFromCart(cart.id).pipe(
          map((cart) =>
            CartActions.setCart({
              cart,
              effect: REMOVE_FROM_CART,
            })
          ),
          catchError((error) =>
            of(
              CartActions.cartError({
                cartError: { error, errorEffect: FETCH_CART },
              })
            )
          )
        );
      })
    )
  );

  //@Effect()
  applyDiscountCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.applyDiscount),
      switchMap((cart: { code: string }) => {
        return this.cartService.applyDiscount(cart.code).pipe(
          map(
            (cart) =>
              CartActions.applyDiscountSuccess({
                effect: REMOVE_FROM_CART,
              }),
            CartActions.fetchCart()
          ),
          catchError((error) =>
            of(
              CartActions.cartError({
                cartError: { error, errorEffect: FETCH_CART },
              })
            )
          )
        );
      })
    )
  );

  //@Effect()
  emptyCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.emptyCart),
      switchMap((cart) => {
        return this.cartService.emptyCart().pipe(
          map(() => CartActions.emptyCartSuccess()),
          catchError((error) =>
            of(
              CartActions.cartError({
                cartError: { error, errorEffect: EMPTY_CART },
              })
            )
          )
        );
      })
    )
  );
}
