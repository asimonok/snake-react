import { GAME_STATUSES } from 'constants/game'
import { START_GAME, FINISH_GAME, SET_GAME_INFO, SAVE_GAME_RESULT, START_NEW } from './gameActions'

const defaultState = {
  status: GAME_STATUSES.notStarted,
  info: null,
  topResults: [],
}

export const gameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        status: GAME_STATUSES.inProgress,
      }
    case START_NEW:
      return {
        ...state,
        status: GAME_STATUSES.notStarted,
      }
    case FINISH_GAME:
      return {
        ...state,
        status: GAME_STATUSES.finished,
      }
    case SET_GAME_INFO:
      return {
        ...state,
        info: action.payload.info,
      }
    case SAVE_GAME_RESULT:
      const updatedTopResults = [
        ...state.topResults,
        {
          username: action.payload.username,
          scores: state.info.scores,
        }
      ]
      updatedTopResults.sort((a, b) => b.scores - a.scores)
      return {
        ...state,
        info: null,
        topResults: updatedTopResults
      }
    default:
      return state
  }
}
