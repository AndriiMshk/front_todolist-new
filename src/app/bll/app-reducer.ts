import { AppStatusType } from '../../api/typesAPI';

const initialState: AppReducerStateType = {
  status: AppStatusType.idle,
  error: null,
  isInitialized: false,
};

export const appReducer = (state: AppReducerStateType = initialState, action: AppActionsType): AppReducerStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS' :
      return { ...state, status: action.status };
    case 'APP/SET-ERROR':
      return { ...state, error: action.error };
    case 'APP/SET-INITIALIZED':
      return { ...state, isInitialized: action.isInitialized };
    default:
      return state;
  }
};

const setAppStatusAC = (status: AppStatusType) => ({ type: 'APP/SET-STATUS', status } as const);
const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const);
const setAppInitializedAC = (isInitialized: boolean) => ({ type: 'APP/SET-INITIALIZED', isInitialized } as const);

export const appActions = {
  setAppStatusAC,
  setAppErrorAC,
  setAppInitializedAC,
};

export type AppReducerStateType = {
  status: AppStatusType
  error: string | null
  isInitialized: boolean
}

export type SetErrorACType = ReturnType<typeof setAppErrorAC>
export type SetStatusACType = ReturnType<typeof setAppStatusAC>
export type SetInitializedACType = ReturnType<typeof setAppInitializedAC>

export type AppActionsType =
  | SetErrorACType
  | SetStatusACType
  | SetInitializedACType

