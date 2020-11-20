import { connect } from 'react-redux'
import { getGameStatus } from 'redux-app/modules/game/gameSelectors'
import Game from './Game'

export default connect(
  state => ({
    gameStatus: getGameStatus(state),
  }),
  null
)(Game)
