import { SET_USERNAME } from './userActions'

const defaultState = {
  username: null,
}

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload.username,
      }
    default:
      return state
  }
}
