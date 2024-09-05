import { Action, createActionGroup, emptyProps, props } from '@ngrx/store';
import { HttpError } from '../model';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const CHECK_IF_LOGGED_IN = 'CHECK_IF_LOGGED_IN';
export const FETCH_VERIFICATION_STATUS = 'FETCH_VERIFICATION_STATUS';
export const FETCH_VERIFICATION_STATUS_SUCCESS =
  'FETCH_VERIFICATION_STATUS_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Sign Up': props<{
      email: string;
      password: string;
      passwordRepeat: string;
    }>(),
    'Sign Up Success': props<{ effect: string }>(),
    'Sign In': props<{ email: string; password: string }>(),
    'SignIn Success': props<{ effect: string }>(),
    'Sign Out': emptyProps(),
    'Sign Out Success': emptyProps(),
    'Check If LoggedIn': emptyProps(),
    'Fetch Verification Status': emptyProps(),
    'Fetch Verification Status Success': props<{ status: boolean }>(),

    AuthError: props<{ authError: HttpError }>(),
  },
});
