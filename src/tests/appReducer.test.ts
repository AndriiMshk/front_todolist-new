import { appReducer, AppReducerStateType, setAppErrorAC, setAppInitializedAC, setAppStatusAC } from '../app/app-reducer';
import { AppStatusType } from '../api/typesAPI';

let startState: AppReducerStateType

beforeEach(()=> {
  startState ={
    error: null,
    status: AppStatusType.idle,
    isInitialized: false
  }
})


test('APP/SET-ERROR', ()=> {
  const endState = appReducer(startState, setAppErrorAC('ERR'))
  expect(endState.error).toBe('ERR')
})

test('APP/SET-STATUS', ()=> {
  const endState = appReducer(startState, setAppStatusAC(AppStatusType.loading))
  expect(endState.status).toBe('loading')
})
test('APP/SET-INITIALIZED', ()=> {
  const endState = appReducer(startState, setAppInitializedAC(true))
  expect(endState.isInitialized).toBe(true)
})
