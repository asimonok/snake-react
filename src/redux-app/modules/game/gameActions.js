export const START_NEW = 'game/START_NEW'
export const START_GAME = 'game/START_GAME'
export const FINISH_GAME = 'game/FINISH_GAME'
export const SET_GAME_INFO = 'game/SET_INFO'
export const SAVE_GAME_RESULT = 'game/SAVE_GAME_RESULT'

export const startNew = () => ({
  type: START_NEW,
})

export const startGame = () => ({
  type: START_GAME,
})

export const finishGame = () => ({
  type: FINISH_GAME,
})

export const setGameInfo = info => ({
  type: SET_GAME_INFO,
  payload: {
    info,
  },
})

export const saveGameResult = ({ username }) => ({
  type: SAVE_GAME_RESULT,
  payload: {
    username,
  }
})
