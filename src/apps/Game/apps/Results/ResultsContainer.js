import { connect } from 'react-redux'
import { startNew } from 'redux-app/modules/game/gameActions'
import { getGameTopResults } from 'redux-app/modules/game/gameSelectors'
import Results from './Results'

export default connect(
  state => ({
    results: getGameTopResults(state),
  }),
  {
    startNew,
  }
)(Results)
