const initialState: LoginReducerStateType = {
  isLogin: false,
  name: '',
};

export const loginReducer = (state: LoginReducerStateType = initialState, action: LoginActionsType):
  LoginReducerStateType => {
  switch (action.type) {
    case 'LOGIN/SET-IS-LOGIN':
      return { ...state, isLogin: action.isLogin, name: action.name };
    default:
      return state;
  }
};

const loginAC = (isLogin: boolean, name: string) => ({ type: 'LOGIN/SET-IS-LOGIN', isLogin, name } as const);

export const loginActions = {
  loginAC,
};

export type LoginReducerStateType = {
  isLogin: boolean
  name: string
}

export type loginACType = ReturnType<typeof loginAC>

export type LoginActionsType = loginACType

