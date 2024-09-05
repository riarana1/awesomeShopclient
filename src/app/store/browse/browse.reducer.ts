import { BrowseActions } from './browse.actions';
import { HttpError } from '../model';
import { Category, Colors, ProductVariantResponse } from '../model';
import { createReducer, on } from '@ngrx/store';

export interface BrowseState {
  products: Array<ProductVariantResponse>;
  productsCount: number;
  categories: Array<Category>;
  colors: Array<Colors>;
  canFetch: boolean;
  selectedPage: number;
  selectedSort: string;
  selectedCategory: string;
  selectedColor: string;
  minPrice: string;
  maxPrice: string;
  errors: Array<HttpError>;
  loading: boolean;
}

const initialState: BrowseState = {
  products: [],
  productsCount: 0,
  colors: null!,
  categories: [],
  canFetch: true,
  selectedPage: 0,
  selectedSort: 'any',
  selectedCategory: 'any',
  selectedColor: 'any',
  minPrice: '0',
  maxPrice: '0',
  errors: [],
  loading: false,
};

export const browseReducer = createReducer(
  initialState,
  on(
    BrowseActions.fetchProductsAppend,
    BrowseActions.fetchProducts,
    (state) => ({
      ...state,
      loading: true,
    })
  ),
  on(BrowseActions.fetchProductsSuccess, (state, { payload }) => ({
    ...state,
    selectedPage: payload.selectedPage,
    selectedSort: payload.selectedSort,
    selectedCategory: payload.selectedCategory,
    selectedColor: payload.selectedColor,
    minPrice: payload.minPrice,
    maxPrice: payload.maxPrice,
    products: payload.res,
    canFetch: payload.res.length !== 0,
    errors: [
      ...state.errors.filter((error) => error.errorEffect !== payload.effect),
    ],
    loading: false,
  })),
  on(BrowseActions.fetchProductAppendSuccess, (state, { payload }) => ({
    ...state,
    selectedPage: payload.selectedPage,
    selectedSort: payload.selectedSort,
    selectedCategory: payload.selectedCategory,
    selectedColor: payload.selectedColor,
    minPrice: payload.minPrice,
    maxPrice: payload.maxPrice,
    products: [...state.products, ...payload.res],
    canFetch: payload.res.length !== 0,
    errors: [
      ...state.errors.filter((error) => error.errorEffect !== payload.effect),
    ],
    loading: false,
  })),
  on(BrowseActions.fetchProductsCountSuccess, (state, { payload }) => ({
    ...state,
    productsCount: payload.res,
    errors: [
      ...state.errors.filter((error) => error.errorEffect !== payload.effect),
    ],
  })),
  on(BrowseActions.fetchProductsCountSuccess, (state, { payload }) => ({
    ...state,
    productsCount: payload.res,
    errors: [
      ...state.errors.filter((error) => error.errorEffect !== payload.effect),
    ],
  })),
  on(BrowseActions.fetchCategorySuccess, (state, { payload }) => ({
    ...state,
    categories: payload.category,
    errors: [
      ...state.errors.filter((error) => error.errorEffect !== payload.effect),
    ],
  })),
  on(BrowseActions.fetchColorsSuccess, (state, { payload }) => ({
    ...state,
    colors: payload.res,
    errors: [
      ...state.errors.filter((error) => error.errorEffect !== payload.effect),
    ],
  })),
  on(BrowseActions.browseError, (state, { browseError }) => {
    const errors = [...state.errors];
    const index = errors.findIndex(
      (error) => error.errorEffect === browseError.errorEffect
    );
    if (index !== -1) {
      errors[index] = browseError;
    } else {
      errors.push(browseError);
    }
    return {
      ...state,
      loading: false,
      errors,
    };
  })
);
