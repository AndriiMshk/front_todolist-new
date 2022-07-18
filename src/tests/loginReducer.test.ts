import { loginAC, loginReducer, LoginReducerStateType } from '../components/login/login-reducer';

let startState: LoginReducerStateType

beforeEach(()=> {
  startState ={
    isLogin: false,
    name: ''
  }
})


test('LOGIN/SET-IS-LOGIN', ()=> {
  const endState = loginReducer(startState, loginAC(true, 'YO'))
  expect(endState.isLogin).toBe(true)
})
