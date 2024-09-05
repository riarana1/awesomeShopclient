import { AuthActions } from './auth.actions';
import { HttpError } from '../model';
import { createReducer, on } from '@ngrx/store';

export interface AuthState {
  authenticated: boolean;
  isActive: boolean;
  errors: Array<HttpError>;
  loading: boolean;
}

const initialState: AuthState = {
  authenticated: false,
  isActive: false,
  errors: [],
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.signIn, AuthActions.signOut, AuthActions.signUp, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.signUpSuccess, (state, { effect }) => ({
    ...state,
    errors: [...state.errors.filter((error) => error.errorEffect !== effect)],
    loading: false,
  })),
  on(AuthActions.signInSuccess, (state, { effect }) => ({
    ...state,
    authenticated: true,
    errors: [...state.errors.filter((error) => error.errorEffect !== effect)],
    loading: false,
  })),
  on(AuthActions.authError, (state, { authError }) => {
    const errors = [...state.errors];
    const index = errors.findIndex(
      (error) => error.errorEffect === authError.errorEffect
    );
    if (index !== -1) {
      errors[index] = authError;
    } else {
      errors.push(authError);
    }
    return {
      ...state,
      loading: false,
      errors,
    };
  }),
  on(AuthActions.signOutSuccess, (state) => {
    return initialState;
  }),
  on(AuthActions.fetchVerificationStatusSuccess, (state, { status }) => {
    return {
      ...state,
      isActive: status,
    };
  })
);
