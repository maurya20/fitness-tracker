import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';
export const SET_LOGGED_USER = '[Auth] Set LoggedUser';
export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export class SetLoggedUser implements Action {
  readonly type = SET_LOGGED_USER;
  constructor(public payload: string) {}
}
export type AuthActions = SetAuthenticated | SetUnauthenticated | SetLoggedUser;
