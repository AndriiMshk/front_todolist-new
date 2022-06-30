import { appReducer, InitialStateType, setErrorAC, setStatusAC } from '../app/app-reducer';

let startState: InitialStateType

beforeEach(()=> {
  startState ={
    error: null,
    status: 'idle'
  }
})


test('SET-ERROR', ()=> {
  const endState = appReducer(startState, setErrorAC('ERR'))
  expect(endState.error).toBe('ERR')
})

test('SET-STATUS', ()=> {
  const endState = appReducer(startState, setStatusAC('loading'))
  expect(endState.status).toBe('loading')
})
