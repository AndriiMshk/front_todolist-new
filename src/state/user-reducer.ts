type StateType = {
  age: number
  children: number
  name: string
}
type ActionType = {
  type: string
  [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'INCREMENT-AGE':
      return { ...state, age: state.age += 1 };
    case 'INCREMENT-CHILDREN':
      return { ...state, children: state.children += 1 };
    case 'CHANGE-NAME':
      return {...state, name: action.newName}
    default:
      throw new Error('ERROR');
  }
};