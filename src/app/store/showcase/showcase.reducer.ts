import {
  ShowcaseActions,
  FETCH_NEWLY_ADDED,
  FETCH_MOST_SELLING,
  FETCH_INTERESTED,
} from './showcase.actions';
import { HttpError } from '../model';
import { Product, ProductVariantResponse } from '../model';
import { createReducer, on } from '@ngrx/store';

export interface ShowcaseState {
  newlyAdded: Array<Product>;
  mostSelling: Array<ProductVariantResponse>;
  interested: Array<Product>;
  errors: Array<HttpError>;
  loading: Array<String>;
}

const initialState: ShowcaseState = {
  newlyAdded: [],
  mostSelling: [],
  interested: [],
  errors: [],
  loading: [],
};
export const showcaseReducer = createReducer(
  initialState,
  on(ShowcaseActions.fetchNewlyAdded, (state) => {
    const newlyAddedLoad = [...state.loading];
    newlyAddedLoad.push(FETCH_NEWLY_ADDED);
    return {
      ...state,
      loading: newlyAddedLoad,
    };
  }),

  on(ShowcaseActions.fetchMostSelling, (state) => {
    const mostSellingLoad = [...state.loading];
    mostSellingLoad.push(FETCH_MOST_SELLING);
    return {
      ...state,
      loading: mostSellingLoad,
    };
  }),
  on(
    ShowcaseActions.fetchMostSellingSuccess,
    (state, { productVariantResponde, effect }) => ({
      ...state,
      mostSelling: productVariantResponde,
      errors: [...state.errors.filter((error) => error.errorEffect !== effect)],
      loading: [...state.loading.filter((loaded) => loaded !== effect)],
    })
  ),
  on(ShowcaseActions.fetchInterested, (state) => {
    const interestedLoad = [...state.loading];
    interestedLoad.push(FETCH_INTERESTED);
    return {
      ...state,
      loading: interestedLoad,
    };
  }),

  on(ShowcaseActions.fetchInterestedSuccess, (state, { products, effect }) => ({
    ...state,
    interested: products,
    errors: [...state.errors.filter((error) => error.errorEffect !== effect)],
    loading: [...state.loading.filter((loaded) => loaded !== effect)],
  })),

  on(ShowcaseActions.showcaseError, (state, { error }) => {
    const errors = [...state.errors];
    const index = errors.findIndex(
      (error) => error.errorEffect === error.errorEffect
    );
    if (index !== -1) {
      errors[index] = error;
    } else {
      errors.push(error);
    }
    return {
      ...state,
      errors,
      loading: [
        ...state.loading.filter((loaded) => loaded !== error.errorEffect),
      ],
    };
  }),

  on(ShowcaseActions.emptyInterested, (state) => ({
    ...state,
    interested: [],
    loading: [],
  }))
);
