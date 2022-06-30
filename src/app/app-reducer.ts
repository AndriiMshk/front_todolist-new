export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
  status: AppStatusType
  error: string | null
}

export type SetErrorACType = ReturnType<typeof setErrorAC>
export type SetStatusACType = ReturnType<typeof setStatusAC>

type ActionsType =
  | SetErrorACType
  | SetStatusACType

const initialState: InitialStateType = {
  status: 'idle',
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

export const setStatusAC = (status: AppStatusType) => ({ type: 'APP/SET-STATUS', status } as const);
export const setErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const);
