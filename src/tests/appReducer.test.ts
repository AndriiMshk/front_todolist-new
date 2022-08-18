import { appReducer, AppReducerStateType } from '../app/bll/app-reducer';
import { AppStatusType } from '../api/typesAPI';
import { appActions } from '../app';

let startState: AppReducerStateType;

beforeEach(() => {
  startState = {
    error: null,
    status: AppStatusType.idle,
    isInitialized: false,
  };
});
const { setAppStatusAC, setAppInitializedAC, setAppErrorAC } = appActions;

test('APP/SET-ERROR', () => {
  const endState = appReducer(startState, setAppErrorAC('ERR'));
  expect(endState.error).toBe('ERR');
});

test('APP/SET-STATUS', () => {
  const endState = appReducer(startState, setAppStatusAC(AppStatusType.loading));
  expect(endState.status).toBe('loading');
});
test('APP/SET-INITIALIZED', () => {
  const endState = appReducer(startState, setAppInitializedAC(true));
  expect(endState.isInitialized).toBe(true);
});
