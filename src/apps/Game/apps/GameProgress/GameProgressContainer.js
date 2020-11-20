import { connect } from 'react-redux'
import { finishGame, setGameInfo, saveGameResult } from 'redux-app/modules/game/gameActions'
import { getGameInfo } from 'redux-app/modules/game/gameSelectors'
import { getUsername } from 'redux-app/modules/user/userSelectors'
import GameProgress from './GameProgress'

export default connect(
  state => ({
    gameInitialInfo: getGameInfo(state),
    username: getUsername(state),
  }),
  {
    finishGame,
    setGameInfo,
    saveGameResult,
  }
)(GameProgress)
