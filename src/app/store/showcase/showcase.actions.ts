import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { HttpError } from '../model';
import { Product, ProductVariantResponse } from '../model';

export const FETCH_NEWLY_ADDED = 'FETCH_NEWLY_ADDED';
export const FETCH_NEWLY_ADDED_SUCCESS = 'FETCH_NEWLY_ADDED_SUCCESS';
export const FETCH_MOST_SELLING = 'FETCH_MOST_SELLING';
export const FETCH_MOST_SELLING_SUCCESS = 'FETCH_MOST_SELLING_SUCCESS';
export const FETCH_INTERESTED = 'FETCH_INTERESTED';
export const FETCH_INTERESTED_SUCCESS = 'FETCH_INTERESTED_SUCCESS';
export const EMPTY_INTERESTED = 'EMPTY_INTERESTED';
export const SHOWCASE_ERROR = 'SHOWCASE_ERROR';

export const ShowcaseActions = createActionGroup({
  source: 'Product',
  events: {
    'Fetch Newly Added ': emptyProps(),
    'Fetch Newly Added Success': props<{
      products: Product[];
      effect: string;
    }>(),
    'Fetch Most Selling': emptyProps(),
    'Fetch Most Selling Success': props<{
      productVariantResponde: ProductVariantResponse[];
      effect: string;
    }>(),
    'Fetch Interested': emptyProps(),
    'Fetch Interested Success': props<{
      products: Product[];
      effect: string;
    }>(),
    'Empty Interested': emptyProps(),
    'Showcase Error': props<{ error: HttpError }>(),
  },
});
