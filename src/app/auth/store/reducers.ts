import { Action, createReducer, on } from '@ngrx/store';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from './actions/register.action';
import AuthState from '../models/auth-state';
import {
  loginAction,
  loginSuccessAction,
  loginFailureAction,
} from './actions/login.action';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from './actions/get-current-user.action';
import { updateCurrentUserSuccessAction } from './actions/update-current-user.action';
import { logoutAction } from './actions/sync.action';

const initialState: AuthState = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
};

const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthState => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    registerSuccessAction,
    (state, action): AuthState => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    registerFailureAction,
    (state, action): AuthState => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),
  on(
    loginAction,
    (state): AuthState => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(logoutAction, () => ({
    ...initialState,
    isLoggedIn: false,
  })),
  on(
    loginSuccessAction,
    (state, action): AuthState => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
      isLoggedIn: true,
    })
  ),
  on(
    loginFailureAction,
    (state, action): AuthState => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),
  on(
    getCurrentUserAction,
    (state): AuthState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCurrentUserSuccessAction,
    (state, action): AuthState => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    getCurrentUserFailureAction,
    (state): AuthState => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null,
    })
  ),
  on(
    updateCurrentUserSuccessAction,
    (state, action): AuthState => ({
      ...state,
      currentUser: action.currentUser,
    })
  )
);

export function reducers(state: AuthState, action: Action): AuthState {
  return authReducer(state, action);
}
