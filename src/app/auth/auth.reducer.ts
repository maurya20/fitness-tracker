import { Action } from '@ngrx/store';

import {
  AuthActions,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_LOGGED_USER,
} from './auth.actions';

export interface State {
  isAuthenticated: boolean;
  loggedUser: string;
}

const initialState: State = {
  isAuthenticated: false,
  loggedUser: '',
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, isAuthenticated: true };
    case SET_UNAUTHENTICATED:
      return { ...state, isAuthenticated: false };
    case SET_LOGGED_USER:
      return { ...state, loggedUser: action.payload };
    default: {
      return state;
    }
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
