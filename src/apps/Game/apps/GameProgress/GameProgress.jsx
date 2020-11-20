import React, { Component } from 'react'
import classNames from 'classnames/bind'
import Button from 'shared/apps/Button'
import {
  DIRECTIONS,
  getInitialInfo,
  getUpdatedDirection,
  CELLS_COUNT,
  calcStep,
  getSnakeSpriteParts,
  SPRITE_PARTS,
  SCENE_TIME,
} from './game'
import arrowDown from './images/arrow-down.svg'
import arrowUp from './images/arrow-up.svg'
import arrowRight from './images/arrow-right.svg'
import arrowLeft from './images/arrow-left.svg'
import pause from './images/pause.svg'
import * as styles from './GameProgress.module.css'

const cx = classNames.bind(styles)

const SPRITE = {
  width: 320,
  height: 256,
  xCount: 5,
  yCount: 4,
}

class GameProgress extends Component {
  static getSpritePositionByPart (part, cellSize) {
    if (part === SPRITE_PARTS.snakeVertical) {
      return `-${cellSize.width * 2}px -${cellSize.height}px`
    }
    if (part === SPRITE_PARTS.snakeHorizontal) {
      return `-${cellSize.width}px 0px`
    }
    if (part === SPRITE_PARTS.snakeHeadUp) {
      return `-${cellSize.width * 3}px 0px`
    }
    if (part === SPRITE_PARTS.snakeHeadDown) {
      return `-${cellSize.width * 4}px -${cellSize.height}px`
    }
    if (part === SPRITE_PARTS.snakeHeadRight) {
      return `-${cellSize.width * 4}px 0px`
    }
    if (part === SPRITE_PARTS.snakeHeadLeft) {
      return `-${cellSize.width * 3}px -${cellSize.height}px`
    }
    if (part === SPRITE_PARTS.snakeCornerFromLeftToDown) {
      return `-${cellSize.width * 2}px 0px`
    }
    if (part === SPRITE_PARTS.snakeCornerFromLeftToUp) {
      return `-${cellSize.width * 2}px -${cellSize.height * 2}px`
    }
    if (part === SPRITE_PARTS.snakeCornerFromRightToUp) {
      return `0px -${cellSize.height}px`
    }
    if (part === SPRITE_PARTS.snakeCornerFromRightToDown) {
      return '0px 0px'
    }
    if (part === SPRITE_PARTS.snakeTailDown) {
      return `-${cellSize.width * 4}px -${cellSize.height * 3}px`
    }
    if (part === SPRITE_PARTS.snakeTailUp) {
      return `-${cellSize.width * 3}px -${cellSize.height * 2}px`
    }
    if (part === SPRITE_PARTS.snakeTailLeft) {
      return `-${cellSize.width * 3}px -${cellSize.height * 3}px`
    }
    if (part === SPRITE_PARTS.snakeTailRight) {
      return `-${cellSize.width * 4}px -${cellSize.height * 2}px`
    }
    if (part === SPRITE_PARTS.fruit) {
      return `0px -${cellSize.height * 3}px`
    }

  }

  areaContainerRef = null
  state = {
    sceneSize: {
      width: 0,
      height: 0,
    },
    ...getInitialInfo(),
    ...this.props.gameInitialInfo,
    isPlaying: false,
    tempDirection: null,
    isShownMobileRotationMessage: false,
  }

  calcStepTimer = null

  componentDidMount() {
    this.onSetSceneSize()
    window.addEventListener('resize', this.onSetSceneSize)
    window.addEventListener('orientationchange', this.onSetSceneSize)
    document.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onSetSceneSize)
    window.removeEventListener('orientationchange', this.onSetSceneSize)
    document.removeEventListener('keydown', this.onKeyDown)
  }

  onSetSceneSize = () => {
    const { width, height } = this.areaContainerRef.getBoundingClientRect()
    console.log('onSetSceneSize', width, height)
    if (height > width) {
      this.setState({
        sceneSize: {
          width,
          height,
        },
        isShownMobileRotationMessage: false,
      })
    } else {
      this.setState({
        isShownMobileRotationMessage: true,
      })
      this.onPauseGame()
    }
  }

  onStartGame = () => {
    if (!this.state.isPlaying) {
      this.setState({
        isPlaying: true,
        isStarted: true,
      })
      this.calcStepTimer = setInterval(() => {
        const { fruit, snake, direction, scores, tempDirection } = this.state
        const newDirection = tempDirection ? tempDirection : direction
        const nextStep = calcStep({ snake, fruit, direction: newDirection })
        if (nextStep.isCrashed) {
          this.onFinishGame()
          return
        }
        this.setState({
          fruit: nextStep.fruit,
          snake: nextStep.snake,
          scores: scores + nextStep.scoresDiff,
          direction: newDirection,
          tempDirection: null,
        }, () => {
          this.props.setGameInfo(this.state)
        })
      }, SCENE_TIME)
    }
  }

  onRestartGame = () => {
    this.setState({
      ...getInitialInfo(),
    }, () => {
      this.props.setGameInfo(this.state)
    })
  }

  onPauseGame = () => {
    clearInterval(this.calcStepTimer)
    this.calcStepTimer = null
    this.setState({
      isPlaying: false,
    }, () => {
      this.props.setGameInfo(this.state)
    })
  }

  onFinishGame = () => {
    this.onPauseGame()
    this.setState({
      isEnded: true,
    }, () => {
      this.props.setGameInfo(this.state)
      this.props.saveGameResult({ username: this.props.username })
    })
  }

  onKeyDown = event => {
    let direction = this.state.direction
    switch(event.keyCode) {
      case 37:
        direction = DIRECTIONS.left
        break
      case 38:
        direction = DIRECTIONS.up
        break
      case 39:
        direction = DIRECTIONS.right
        break
      case 40:
        direction = DIRECTIONS.down
        break
      default:
        direction = this.state.direction
    }
    this.onChangeDirection(direction)
  }

  onChangeDirection = (direction) => {
    if (this.state.isPlaying) {
      this.setState({
        tempDirection: getUpdatedDirection(this.state.direction, direction),
      })
    }
  }

  onSwipe = (event) => {
    let direction = this.state.direction
    switch(event.direction) {
      case 2:
        direction = DIRECTIONS.left
        break
      case 8:
        direction = DIRECTIONS.up
        break
      case 4:
        direction = DIRECTIONS.right
        break
      case 16:
        direction = DIRECTIONS.down
        break
      default:
        direction = this.state.direction
    }
    this.onChangeDirection(direction)
  }

  onGoToResults = () => {
    this.props.finishGame()
    this.onRestartGame()
  }

  render() {
    const {
      sceneSize,
      snake,
      fruit,
      scores,
      direction,
      tempDirection,
      isPlaying,
      isEnded,
      isStarted,
      isShownMobileRotationMessage,
    } = this.state
    const cellSize = {
      width: Math.round(sceneSize.width / CELLS_COUNT.x),
      height: Math.round(sceneSize.height / CELLS_COUNT.y),
    }
    const spritePositions = getSnakeSpriteParts({ snake, direction })

    return (
      <div className={styles.root}>
        <div className={styles.gameAreaContainer} ref={ref => { this.areaContainerRef = ref }}>
          <div className={styles.gameArea} style={{ width: sceneSize.width, height: sceneSize.height }}>
            {snake.map(({ x, y }, index) => (
              <span
                key={index}
                className={cx('gameObject', styles.snake, { head: index === 0 })}
                style={{
                  transform: `translate(${cellSize.width * (x - 1)}px, ${cellSize.height * (y - 1)}px)`,
                  width: cellSize.width,
                  height: cellSize.height,
                  backgroundSize: `${cellSize.width * SPRITE.xCount}px ${cellSize.height * SPRITE.yCount}px`,
                  backgroundPosition: GameProgress.getSpritePositionByPart(spritePositions[index], cellSize)
                }}
              />
            ))}
            <span
              className={cx('gameObject', 'fruit')}
              style={{
                transform: `translate(${cellSize.width * (fruit.x - 1)}px, ${cellSize.height * (fruit.y - 1)}px)`,
                width: cellSize.width,
                height: cellSize.height,
                backgroundSize: `${cellSize.width * SPRITE.xCount}px ${cellSize.height * SPRITE.yCount}px`,
                backgroundPosition: GameProgress.getSpritePositionByPart(SPRITE_PARTS.fruit, cellSize)
              }}
            />
            <div className={styles.scores}>
              Scores: {scores}
            </div>
            <button className={styles.pauseButton} onClick={this.onPauseGame}>
              <img src={pause} alt='' width={24} height={24} />
            </button>
            <div className={styles.gameControls}>
              <button
                className={cx('gameControl', 'up', { pressed: tempDirection === DIRECTIONS.up })}
                onClick={() => this.onChangeDirection(DIRECTIONS.up)}
              >
                <img src={arrowUp} alt=''/>
              </button>
              <button
                className={cx('gameControl', 'right', { pressed: tempDirection === DIRECTIONS.right })}
                onClick={() => this.onChangeDirection(DIRECTIONS.right)}
              >
                <img src={arrowRight} alt='' />
              </button>
              <button
                className={cx('gameControl', 'down', { pressed: tempDirection === DIRECTIONS.down })}
                onClick={() => this.onChangeDirection(DIRECTIONS.down)}
              >
                <img src={arrowDown} alt='' />
              </button>
              <button
                className={cx('gameControl', 'left', { pressed: tempDirection === DIRECTIONS.left })}
                onClick={() => this.onChangeDirection(DIRECTIONS.left)}
              >
                <img src={arrowLeft} alt='' />
              </button>
            </div>
          </div>
        </div>
        {isShownMobileRotationMessage && (
          <div className={styles.gamePopup}>
            <div className={styles.gamePopupContent}>
              <h2>Please rotate phone vertically</h2>
            </div>
          </div>
        )}
        {(!isPlaying && !isShownMobileRotationMessage) && (
          <div className={styles.gamePopup}>
            <div className={styles.gamePopupContent}>
              {isEnded && (
                <React.Fragment>
                  <h2>Game over</h2>
                  <div>Your scores: {scores}</div>
                  <Button onClick={this.onRestartGame}>Restart</Button>
                  <br />
                  <Button onClick={this.onGoToResults}>View top results</Button>
                </React.Fragment>
              )}
              {(isStarted && !isEnded) && (
                <React.Fragment>
                  <h2>Paused</h2>
                  <Button onClick={this.onStartGame}>Return to game</Button>
                </React.Fragment>
              )}
              {!isStarted && (
                <React.Fragment>
                  <h2>Prepare to game</h2>
                  <Button onClick={this.onStartGame}>I'm ready!</Button>
                </React.Fragment>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default GameProgress
