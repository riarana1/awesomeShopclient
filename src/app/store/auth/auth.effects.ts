import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import {
  AuthActions,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  SIGN_UP,
} from './auth.actions';
import { CartActions } from '../cart/cart.actions';
import { ShowcaseActions } from '../showcase/showcase.actions';
import { OrderActions } from '../order/order.actions';
import { TokenService } from '../../services/token.service';
import { AccountService } from '../../services/account.service';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  private actions$: Actions = inject(Actions);
  private router: Router = inject(Router);
  private tokenService: TokenService = inject(TokenService);
  private accountService: AccountService = inject(AccountService);

  //@Effect()
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      map((action) => {
        return action;
      }),
      switchMap(
        (credentials: {
          email: string;
          password: string;
          passwordRepeat: string;
        }) => {
          return this.accountService
            .createAccount(
              credentials.email,
              credentials.password,
              credentials.passwordRepeat
            )
            .pipe(
              switchMap((res) => {
                return [
                  AuthActions.signUpSuccess({ effect: SIGN_UP }),
                  AuthActions.signIn({
                    email: credentials.email,
                    password: credentials.password,
                  }), // automatic sign in
                ];
              }),
              catchError((error) =>
                of(
                  AuthActions.authError({
                    authError: {
                      error,
                      errorEffect: SIGN_UP,
                    },
                  })
                )
              )
            );
        }
      )
    )
  );

  //@Effect()
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      map((action) => {
        return action;
      }),
      switchMap(
        (credentials: {
          email: string;
          password: string;
          //password2: string;
        }) => {
          return this.tokenService
            .obtainAccessToken(credentials.email, credentials.password)
            .pipe(
              switchMap((res) => {
                this.tokenService.saveToken(res);
                this.router.navigate(['/']);
                return [
                  AuthActions.signInSuccess({ effect: SIGN_IN }),
                  AuthActions.fetchVerificationStatus(),
                ];
              }),
              catchError((error) =>
                of(
                  AuthActions.authError({
                    authError: {
                      error,
                      errorEffect: SIGN_IN,
                    },
                  })
                )
              )
            );
        }
      )
    )
  );

  //@Effect()
  signOut = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOut),
      concatMap((action) => {
        this.tokenService.removeToken();
        return [
          AuthActions.signOutSuccess(),
          CartActions.emptyCartSuccess(), // clearing memory
          OrderActions.emptyOrder(), // clearing memory
          ShowcaseActions.emptyInterested(), // clearing memory
        ];
      })
    )
  );

  //@Effect()
  checkIfLoggedIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkIfLoggedIn),
      switchMap(() => {
        if (this.tokenService.checkIfTokenExists()) {
          return [
            AuthActions.signInSuccess({ effect: SIGN_IN_SUCCESS }),
            AuthActions.fetchVerificationStatus(),
          ];
        }
        return [AuthActions.signOutSuccess()];
      })
    )
  );

  //@Effect()
  fetchVerificationStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.fetchVerificationStatus),
      switchMap(() => {
        return this.accountService.getVerificationStatus().pipe(
          map((res) =>
            AuthActions.fetchVerificationStatusSuccess({ status: res })
          ),
          catchError((error) => of(AuthActions.signOut()))
        );
      })
    )
  );
}
