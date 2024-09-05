import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  BrowseActions,
  FETCH_CATEGORY,
  FETCH_COLORS,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_APPEND,
  FETCH_PRODUCTS_COUNT,
} from './browse.actions';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

@Injectable()
export class BrowseEffects {
  private actions$: Actions = inject(Actions);
  private productService: ProductService = inject(ProductService);

  //@Effect()
  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrowseActions.fetchProducts),
      map((action) => {
        return action.payload;
      }),
      switchMap(
        (params: {
          page: number;
          sort: string;
          category: string;
          color: string;
          minPrice: string;
          maxPrice: string;
        }) => {
          return this.productService
            .getProducts(
              params.page,
              params.sort,
              params.category,
              params.color,
              params.minPrice,
              params.maxPrice
            )!
            .pipe(
              map((res) =>
                BrowseActions.fetchProductsSuccess({
                  payload: {
                    res,
                    effect: FETCH_PRODUCTS,
                    selectedPage: params.page + 1,
                    selectedSort: params.sort,
                    selectedCategory: params.category,
                    selectedColor: params.color,
                    minPrice: params.minPrice,
                    maxPrice: params.maxPrice,
                  },
                })
              ),
              catchError((error) =>
                of(
                  BrowseActions.browseError({
                    browseError: {
                      error,
                      errorEffect: FETCH_PRODUCTS,
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
  fetchProductsAppend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrowseActions.fetchProductsAppend),
      map((action) => {
        return action.payload;
      }),
      mergeMap(
        (params: {
          page: number;
          sort: string;
          category: string;
          color: string;
          minPrice: string;
          maxPrice: string;
        }) => {
          return this.productService
            .getProducts(
              params.page,
              params.sort,
              params.category,
              params.color,
              params.minPrice,
              params.maxPrice
            )!
            .pipe(
              map((res) =>
                BrowseActions.fetchProductAppendSuccess({
                  payload: {
                    res,
                    effect: FETCH_PRODUCTS_APPEND,
                    selectedPage: params.page + 1,
                    selectedSort: params.sort,
                    selectedCategory: params.category,
                    selectedColor: params.color,
                    minPrice: params.minPrice,
                    maxPrice: params.maxPrice,
                  },
                })
              ),
              catchError((error) =>
                of(
                  BrowseActions.browseError({
                    browseError: {
                      error,
                      errorEffect: FETCH_PRODUCTS_APPEND,
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
  fetchProductsCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrowseActions.fetchProductsCount),
      map((action) => {
        return action.payload;
      }),
      switchMap(
        (params: {
          category: string;
          color: string;
          minPrice: string;
          maxPrice: string;
        }) => {
          return this.productService
            .getProductsCount(
              params.category,
              params.color,
              params.minPrice,
              params.maxPrice
            )
            .pipe(
              map((res) =>
                BrowseActions.fetchProductsCountSuccess({
                  payload: {
                    res,
                    effect: FETCH_PRODUCTS_COUNT,
                  },
                })
              ),
              catchError((error) =>
                of(
                  BrowseActions.browseError({
                    browseError: {
                      error,
                      errorEffect: FETCH_PRODUCTS_COUNT,
                    },
                  })
                )
              )
            );
        }
      )
    )
  );

  // @Effect()
  fetchCategory = createEffect(() =>
    this.actions$.pipe(
      ofType(BrowseActions.fetchCategory),
      switchMap(() => {
        return this.productService.getCategory().pipe(
          map((category) =>
            BrowseActions.fetchCategorySuccess({
              payload: { category, effect: FETCH_CATEGORY },
            })
          ),
          catchError((error) =>
            of(
              BrowseActions.browseError({
                browseError: { error, errorEffect: FETCH_CATEGORY },
              })
            )
          )
        );
      })
    )
  );

  //@Effect()
  fetchColor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrowseActions.fetchColors),
      switchMap(() => {
        return this.productService.getColors().pipe(
          map((res) =>
            BrowseActions.fetchColorsSuccess({
              payload: { res, effect: FETCH_COLORS },
            })
          ),
          catchError((error) =>
            of(
              BrowseActions.browseError({
                browseError: {
                  error,
                  errorEffect: FETCH_COLORS,
                },
              })
            )
          )
        );
      })
    )
  );
}
