export enum AppStatusType {
  idle = 'idle',
  loading = 'loading',
  succeeded = 'succeeded',
  failed = 'failed'
}

export type InitialStateType = {
  status: AppStatusType
  error: string | null
}


export type SetErrorACType = ReturnType<typeof setAppErrorAC>
export type SetStatusACType = ReturnType<typeof setAppStatusAC>

type ActionsType =
  | SetErrorACType
  | SetStatusACType

const initialState: InitialStateType = {
  status: AppStatusType.idle,
  error: null,
};

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS' :
      return { ...state, status: action.status };
    case 'APP/SET-ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export const setAppStatusAC = (status: AppStatusType) => ({ type: 'APP/SET-STATUS', status } as const);
export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const);
