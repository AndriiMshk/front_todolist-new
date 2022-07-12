import { loginAC, loginReducer, LoginReducerStateType } from '../components/login/login-reducer';

let startState: LoginReducerStateType

beforeEach(()=> {
  startState ={
    isLogin: false,
  }
})


test('LOGIN/SET-IS-LOGIN', ()=> {
  const endState = loginReducer(startState, loginAC(true))
  expect(endState.isLogin).toBe(true)
})
