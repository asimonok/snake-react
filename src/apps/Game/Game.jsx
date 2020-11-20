import classNames from 'classnames/bind'
import { GAME_STATUSES } from 'constants/game'
import GameStart from './apps/GameStart'
import GameProgress from './apps/GameProgress'
import Results from './apps/Results'
import * as styles from './Game.module.css'

const cx = classNames.bind(styles)

const Game = ({ gameStatus }) => (
  <div className={styles.root}>
    <div className={styles.content}>
      <div className={cx('gameStep', { active: gameStatus === GAME_STATUSES.notStarted })}>
        <GameStart />
      </div>
      <div className={cx('gameStep', { active: gameStatus === GAME_STATUSES.inProgress })}>
        <GameProgress />
      </div>
      <div className={cx('gameStep', { active: gameStatus === GAME_STATUSES.finished })}>
        <Results />
      </div>
    </div>
  </div>
)

export default Game
