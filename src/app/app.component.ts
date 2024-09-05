import { Component, OnInit } from '@angular/core';
import { AuthActions } from './store/auth/auth.actions';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.checkIfLoggedIn());
  }

  onActivate($event: any) {
    window.scroll(0, 0);
  }
}
