import { Action, createActionGroup, emptyProps, props } from '@ngrx/store';
import { HttpError } from '../model';
import { ProductVariantResponse, Category, Colors } from '../model';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_APPEND = 'FETCH_PRODUCTS_APPEND';
export const FETCH_PRODUCTS_APPEND_SUCCESS = 'FETCH_PRODUCTS_APPEND_SUCCESS';
export const FETCH_PRODUCTS_COUNT = 'FETCH_PRODUCTS_COUNT';
export const FETCH_PRODUCTS_COUNT_SUCCESS = 'FETCH_PRODUCTS_COUNT_SUCCESS';
export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const FETCH_COLORS = 'FETCH_COLORS';
export const FETCH_COLORS_SUCCESS = 'FETCH_COLORS_SUCCESS';
export const BROWSE_ERROR = 'BROWSE_ERROR';

export const BrowseActions = createActionGroup({
  source: 'Fetch',
  events: {
    'Fetch Products': props<{
      payload: {
        page: number;
        sort: string;
        category: string;
        color: string;
        minPrice: string;
        maxPrice: string;
      };
    }>(),
    'Fetch Products Success': props<{
      payload: {
        res: Array<ProductVariantResponse>;
        effect: string;
        selectedPage: number;
        selectedSort: string;
        selectedCategory: string;
        selectedColor: string;
        minPrice: string;
        maxPrice: string;
      };
    }>(),

    'Fetch Products Append': props<{
      payload: {
        page: number;
        sort: string;
        category: string;
        color: string;
        minPrice: string;
        maxPrice: string;
      };
    }>(),
    'Fetch Product Append Success': props<{
      payload: {
        res: Array<ProductVariantResponse>;
        effect: string;
        selectedPage: number;
        selectedSort: string;
        selectedCategory: string;
        selectedColor: string;
        minPrice: string;
        maxPrice: string;
      };
    }>(),
    'Fetch Products Count': props<{
      payload: {
        category: string;
        color: string;
        minPrice: string;
        maxPrice: string;
      };
    }>(),
    'Fetch Products Count Success': props<{
      payload: { res: number; effect: string };
    }>(),
    'Fetch Category': emptyProps(),
    'Fetch Category Success': props<{
      payload: {
        category: Array<Category>;
        effect: string;
      };
    }>(),
    'Fetch Colors': emptyProps(),
    'Fetch Colors Success': props<{
      payload: { res: Array<Colors>; effect: string };
    }>(),
    BrowseError: props<{ browseError: HttpError }>(),
  },
});
