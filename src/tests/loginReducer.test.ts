import { loginActions } from '../components/login';
import { loginReducer, LoginReducerStateType } from '../components/login/bll/login-reducer';

let startState: LoginReducerStateType;

beforeEach(() => {
  startState = {
    isLogin: false,
    name: '',
  };
});

const { loginAC } = loginActions;

test('LOGIN/SET-IS-LOGIN', () => {
  const endState = loginReducer(startState, loginAC(true, 'YO'));
  expect(endState.isLogin).toBe(true);
});
