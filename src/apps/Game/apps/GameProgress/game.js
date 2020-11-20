export const DIRECTIONS = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right',
}

export const CELLS_COUNT = {
  x: 15,
  y: 30,
}

export const SCENE_TIME = 150

const STARTED_SNAKE_LENGTH = 3

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
}

export const getDefaultSnake = () => {
  const snake = []
  for (let i = 0; i < STARTED_SNAKE_LENGTH; i++) {
    snake.push({
      x: Math.round(CELLS_COUNT.x / 2),
      y: Math.round(CELLS_COUNT.y / 2) + i,
    })
  }
  return snake
}

const isCrashed = snake => {
  for (let i = 0; i < snake.length; i++) {
    for (let j = i + 1; j < snake.length; j++) {
      if (
        (snake[i].x === snake[j].x && snake[i].y === snake[j].y)
        || snake[i].x <= 0
        || snake[i].x > CELLS_COUNT.x
        || snake[i].y <= 0
        || snake[i].y > CELLS_COUNT.y
      ) {
        return true
      }
    }
  }
  return false
}

export const getUpdatedSnakeHead = (snake, direction) => {
  const { x, y } = snake[0]
  let newX = x
  let newY = y
  if (direction === DIRECTIONS.right) {
    newX = x + 1
  }
  if (direction === DIRECTIONS.left) {
    newX = x - 1
  }
  if (direction === DIRECTIONS.up) {
    newY = y - 1
  }
  if (direction === DIRECTIONS.down) {
    newY = y + 1
  }
  return {
    x: newX,
    y: newY,
  }
}

export const getFruit = snake => {
  while (true) {
    const newX = Math.round(getRandomArbitrary(1, CELLS_COUNT.x));
    const newY = Math.round(getRandomArbitrary(1, CELLS_COUNT.y));

    const snakeItem = snake.some(({ x, y }) => x === newX && y === newY);
    if (!snakeItem) {
      return {
        x: newX,
        y: newY,
      }
    }
  }
}

export const calcStep = ({ snake, fruit, direction }) => {
  let updatedSnake = [
    getUpdatedSnakeHead(snake, direction),
    ...snake.slice(0, snake.length - 1),
  ]
  let updatedFruit = fruit
  let scoresDiff = 0
  const isEnded = updatedSnake.length >= CELLS_COUNT.x * CELLS_COUNT.y

  if (!isEnded && updatedSnake[0].x === fruit.x && updatedSnake[0].y === fruit.y) {
    updatedSnake = [
      ...updatedSnake,
      snake[snake.length - 1],
    ]
    updatedFruit = getFruit(updatedSnake)
    scoresDiff = 1
  }

  return {
    isCrashed: isEnded ? isEnded : isCrashed(updatedSnake),
    snake: updatedSnake,
    fruit: updatedFruit,
    scoresDiff,
  }
}

export const getInitialInfo = () => {
  const snake = getDefaultSnake()
  return {
    snake,
    fruit: getFruit(snake),
    scores: 0,
    direction: DIRECTIONS.up,
    isStarted: false,
    isPlaying: false,
    isEnded: false,
  }
}

export const getUpdatedDirection = (prevDir, nextDir) => {
  if (
    (prevDir === DIRECTIONS.left && nextDir === DIRECTIONS.right)
    || (prevDir === DIRECTIONS.right && nextDir === DIRECTIONS.left)
  ) {
    return prevDir
  }
  if (
    (prevDir === DIRECTIONS.up && nextDir === DIRECTIONS.down)
    || (prevDir === DIRECTIONS.down && nextDir === DIRECTIONS.up)
  ) {
    return prevDir
  }
  return nextDir
}

export const SPRITE_PARTS = {
  snakeVertical: 'snakeVertical',
  snakeHorizontal: 'snakeHorizontal',
  snakeCornerFromRightToDown: 'snakeCornerFromRightToDown',
  snakeCornerFromRightToUp: 'snakeCornerFromRightToUp',
  snakeCornerFromLeftToUp: 'snakeCornerFromLeftToUp',
  snakeCornerFromLeftToDown: 'snakeCornerFromLeftToDown',
  snakeHeadLeft: 'snakeHeadLeft',
  snakeHeadRight: 'snakeHeadRight',
  snakeHeadUp: 'snakeHeadUp',
  snakeHeadDown: 'snakeHeadDown',
  snakeTailLeft: 'snakeTailLeft',
  snakeTailRight: 'snakeTailRight',
  snakeTailUp: 'snakeTailUp',
  snakeTailDown: 'snakeTailDown',
  fruit: 'fruit',
}

export const getSnakeSpriteParts = ({ snake, direction = DIRECTIONS.up }) => {
    return snake.map(({ x, y }, index) => {
      if (index === 0) {
        if (direction === DIRECTIONS.left) {
          return SPRITE_PARTS.snakeHeadLeft
        }
        if (direction === DIRECTIONS.right) {
          return SPRITE_PARTS.snakeHeadRight
        }
        if (direction === DIRECTIONS.up) {
          return SPRITE_PARTS.snakeHeadUp
        }
        if (direction === DIRECTIONS.down) {
          return SPRITE_PARTS.snakeHeadDown
        }
      }
      if (index === snake.length - 1) {
        if (x === 1 || x === CELLS_COUNT.x) {
          if (x === CELLS_COUNT.x && snake[index - 1].x === 1) {
            return SPRITE_PARTS.snakeTailRight
          }
          if (x === 1 && snake[index - 1].x === CELLS_COUNT.x) {
            return SPRITE_PARTS.snakeTailLeft
          }
        }
        if (y === 1 || y === CELLS_COUNT.y) {
          if (y === CELLS_COUNT.y && snake[index - 1].y === 1) {
            return SPRITE_PARTS.snakeTailDown
          }
          if (y === 1 && snake[index - 1].y === CELLS_COUNT.y) {
            return SPRITE_PARTS.snakeTailUp
          }
        }
        if (snake[index - 1].x > x) {
          return SPRITE_PARTS.snakeTailRight
        }
        if (snake[index - 1].x < x) {
          return SPRITE_PARTS.snakeTailLeft
        }
        if (snake[index - 1].y < y) {
          return SPRITE_PARTS.snakeTailUp
        }
        return SPRITE_PARTS.snakeTailDown
      }
      if (snake[index - 1].x === x) {
        if (snake[index + 1].x > x) {
          if (snake[index - 1].y < y) {
            return SPRITE_PARTS.snakeCornerFromRightToUp
          }
          if (snake[index - 1].y > y) {
            return SPRITE_PARTS.snakeCornerFromRightToDown
          }
        }
        if (snake[index + 1].x < x) {
          if (snake[index - 1].y < y) {
            return SPRITE_PARTS.snakeCornerFromLeftToUp
          }
          if (snake[index - 1].y > y) {
            return SPRITE_PARTS.snakeCornerFromLeftToDown
          }
        }
        return SPRITE_PARTS.snakeVertical
      }
      if (snake[index - 1].y === y) {
        if (snake[index + 1].y > y) {
          if (snake[index - 1].x < x) {
            return SPRITE_PARTS.snakeCornerFromLeftToDown
          }
          if (snake[index - 1].x > x) {
            return SPRITE_PARTS.snakeCornerFromRightToDown
          }
        }
        if (snake[index + 1].y < y) {
          if (snake[index - 1].x < x) {
            return SPRITE_PARTS.snakeCornerFromLeftToUp
          }
          if (snake[index - 1].x > x) {
            return SPRITE_PARTS.snakeCornerFromRightToUp
          }
        }
        return SPRITE_PARTS.snakeHorizontal
      }
      return ''
    })
  }
