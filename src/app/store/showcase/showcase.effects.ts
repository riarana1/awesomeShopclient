import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ShowcaseActions } from './showcase.actions';
import { ProductService } from '../../services/product.service';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ShowcaseEffects {
  private actions$: Actions = inject(Actions);
  private productService: ProductService = inject(ProductService);

  //@Effect()
  fetchNewlyAdded = createEffect(() =>
    this.actions$.pipe(
      ofType(ShowcaseActions.fetchNewlyAdded),
      switchMap((action) =>
        this.productService.getNewlyAdded().pipe(
          map((products) =>
            ShowcaseActions.fetchNewlyAddedSuccess({
              products,
              effect: 'FETCH_NEWLY_ADDED',
            })
          ),
          catchError((error) => of(ShowcaseActions.showcaseError({ error })))
        )
      )
    )
  );

  //@Effect()
  fetchMostSelling = createEffect(() =>
    this.actions$.pipe(
      ofType(ShowcaseActions.fetchMostSelling),
      switchMap((action) =>
        this.productService.getMostSelling().pipe(
          map((productVariantResponde) =>
            ShowcaseActions.fetchMostSellingSuccess({
              productVariantResponde,
              effect: 'FETCH_MOST_SELLING',
            })
          ),
          catchError((error) =>
            of(
              ShowcaseActions.showcaseError({
                error,
              })
            )
          )
        )
      )
    )
  );

  //@Effect()
  fetchInterested = createEffect(() =>
    this.actions$.pipe(
      ofType(ShowcaseActions.fetchInterested),
      switchMap((action) =>
        this.productService.getInterested().pipe(
          map(
            (products) =>
              ShowcaseActions.fetchInterestedSuccess({
                products,
                effect: 'FETCH_INTERESTED',
              }),
            catchError((error) =>
              of(
                ShowcaseActions.showcaseError({
                  error,
                })
              )
            )
          )
        )
      )
    )
  );
}
