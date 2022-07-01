import { appReducer, AppStatusType, InitialStateType, setAppErrorAC, setAppStatusAC } from '../app/app-reducer';

let startState: InitialStateType

beforeEach(()=> {
  startState ={
    error: null,
    status: AppStatusType.idle
  }
})


test('SET-ERROR', ()=> {
  const endState = appReducer(startState, setAppErrorAC('ERR'))
  expect(endState.error).toBe('ERR')
})

test('SET-STATUS', ()=> {
  // const endState = appReducer(startState, setStatusAC(AppStatusType.loading))
  // expect(endState.status).toBe('loading')
})
