import { createSelector } from '@ngrx/store';
import { ShowcaseState } from './showcase.reducer';

// Selector para obtener el estado de los todos
export const selectTodoState = (state: ShowcaseState) => state;

// Selector para obtener el estado de carga
export const selectLoading = createSelector(
  selectTodoState, // Selecciona el estado de los todos
  (state) => state.loading
);

// Selector para obtener los todos pendientes
export const selectNewAdded = createSelector(
  selectTodoState, // Selecciona el estado de los todos
  (state) => state.newlyAdded
);

// Selector para obtener el estado de error
export const selectError = createSelector(
  selectTodoState, // Selecciona el estado de los todos
  // Función que devuelve la propiedad `error` del estado de los todos
  (state) => state.errors
);
