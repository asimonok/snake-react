import { combineReducers } from 'redux'
import { gameReducer } from './game/gameReducer'
import { userReducer } from './user/userReducer'

export const rootReducer = () => combineReducers({
  user: userReducer,
  game: gameReducer,
})
