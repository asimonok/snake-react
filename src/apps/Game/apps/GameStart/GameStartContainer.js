import { connect } from 'react-redux'
import { startGame } from 'redux-app/modules/game/gameActions'
import { setUsername } from 'redux-app/modules/user/userActions'
import GameStart from './GameStart'

export default connect(
  null,
  {
    startGame,
    setUsername,
  }
)(GameStart)
