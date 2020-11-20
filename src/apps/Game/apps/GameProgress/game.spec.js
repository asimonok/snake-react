import { getSnakeSpriteParts, DIRECTIONS, SPRITE_PARTS, CELLS_COUNT } from './game'

describe('Game', () => {
  describe('getSnakeSpriteParts', () => {
    describe('SnakeHead', () => {
      it('Should be up', () => {
        const snake = [
          { x: 5, y: 5 },
          { x: 5, y: 6 },
          { x: 5, y: 7 },
        ]
        expect(getSnakeSpriteParts({ snake, direction: DIRECTIONS.up })[0]).toEqual(SPRITE_PARTS.snakeHeadUp)
      })
      it('Should be right', () => {
        const snake = [
          { x: 5, y: 5 },
          { x: 4, y: 5 },
          { x: 3, y: 5 },
        ]
        expect(getSnakeSpriteParts({ snake, direction: DIRECTIONS.right })[0]).toEqual(SPRITE_PARTS.snakeHeadRight)
      })
      it('Should be down', () => {
        const snake = [
          { x: 5, y: 5 },
          { x: 5, y: 4 },
          { x: 5, y: 3 },
        ]
        expect(getSnakeSpriteParts({ snake, direction: DIRECTIONS.down })[0]).toEqual(SPRITE_PARTS.snakeHeadDown)
      })
      it('Should be left', () => {
        const snake = [
          { x: 3, y: 5 },
          { x: 4, y: 5 },
          { x: 5, y: 5 },
        ]
        expect(getSnakeSpriteParts({ snake, direction: DIRECTIONS.left })[0]).toEqual(SPRITE_PARTS.snakeHeadLeft)
      })
    })
    describe('SnakeTail', () => {
      it('Should be up', () => {
        const snake = [
          { x: 5, y: 5 },
          { x: 5, y: 6 },
          { x: 5, y: 7 },
        ]
        expect(getSnakeSpriteParts({ snake, direction: DIRECTIONS.up })[2]).toEqual(SPRITE_PARTS.snakeTailUp)
      })
      it('Should be right', () => {
        const snake = [
          { x: 5, y: 5 },
          { x: 4, y: 5 },
          { x: 3, y: 5 },
        ]
        expect(getSnakeSpriteParts({ snake, direction: DIRECTIONS.right })[2]).toEqual(SPRITE_PARTS.snakeTailRight)
      })
      it('Should be down', () => {
        const snake = [
          { x: 5, y: 5 },
          { x: 5, y: 4 },
          { x: 5, y: 3 },
        ]
        expect(getSnakeSpriteParts({ snake, direction: DIRECTIONS.down })[2]).toEqual(SPRITE_PARTS.snakeTailDown)
      })
      it('Should be left', () => {
        const snake = [
          { x: 3, y: 5 },
          { x: 4, y: 5 },
          { x: 5, y: 5 },
        ]
        expect(getSnakeSpriteParts({ snake, direction: DIRECTIONS.left })[2]).toEqual(SPRITE_PARTS.snakeTailLeft)
      })
      it('Should be up if y = 1, prevY = CELLS_COUNT.y', () => {
        const snake = [
          { x: 5, y: CELLS_COUNT.y - 1 },
          { x: 5, y: CELLS_COUNT.y },
          { x: 5, y: 1 },
        ]
        expect(getSnakeSpriteParts({ snake, direction: DIRECTIONS.up })[2]).toEqual(SPRITE_PARTS.snakeTailUp)
      })
      it('Should be right if x = CELLS_COUNT.x, prevX = 1', () => {
        const snake = [
          { x: 2, y: 4 },
          { x: 1, y: 4 },
          { x: CELLS_COUNT.x, y: 4 },
        ]
        expect(getSnakeSpriteParts({ snake, direction: DIRECTIONS.right })[2]).toEqual(SPRITE_PARTS.snakeTailRight)
      })
      it('Should be down if y = CELLS_COUNT.y, prevY = 1', () => {
        const snake = [
          { x: 5, y: 2 },
          { x: 5, y: 1 },
          { x: 5, y: CELLS_COUNT.y },
        ]
        expect(getSnakeSpriteParts({ snake, direction: DIRECTIONS.down })[2]).toEqual(SPRITE_PARTS.snakeTailDown)
      })
      it('Should be left if x = 1, prevX = CELLS_COUNT.x', () => {
        const snake = [
          { x: CELLS_COUNT.x - 1, y: 4 },
          { x: CELLS_COUNT.x, y: 4 },
          { x: 1, y: 4 },
        ]
        expect(getSnakeSpriteParts({ snake, direction: DIRECTIONS.left })[2]).toEqual(SPRITE_PARTS.snakeTailLeft)
      })
    })
  })
  describe('SnakeBody', () => {
    it('Should be vertical', () => {
      const snake = [
        { x: 5, y: 5 },
        { x: 5, y: 6 },
        { x: 5, y: 7 },
      ]
      expect(getSnakeSpriteParts({ snake, direction: DIRECTIONS.up })[1]).toEqual(SPRITE_PARTS.snakeVertical)
    })
    it('Should be horizontal', () => {
      const snake = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 },
      ]
      expect(getSnakeSpriteParts({ snake, direction: DIRECTIONS.right })[1]).toEqual(SPRITE_PARTS.snakeHorizontal)
    })
    it('Should be vertical if y = 1, prevY = CELLS_COUNT.y', () => {
      const snake = [
        { x: 5, y: CELLS_COUNT.y },
        { x: 5, y: 1 },
        { x: 5, y: 2 },
      ]
      expect(getSnakeSpriteParts({ snake, direction: DIRECTIONS.down })[1]).toEqual(SPRITE_PARTS.snakeVertical)
    })
    it('Should be vertical if y = CELLS_COUNT.y, prevY = 1', () => {
      const snake = [
        { x: 5, y: 1 },
        { x: 5, y: CELLS_COUNT.y },
        { x: 5, y: CELLS_COUNT.y - 1 },
      ]
      expect(getSnakeSpriteParts({ snake, direction: DIRECTIONS.up })[1]).toEqual(SPRITE_PARTS.snakeVertical)
    })
    it('Should be horizontal if x = 1, prevX = CELLS_COUNT.x', () => {
      const snake = [
        { x: CELLS_COUNT.x, y: 5 },
        { x: 1, y: 5 },
        { x: 2, y: 5 },
      ]
      expect(getSnakeSpriteParts({ snake, direction: DIRECTIONS.left })[1]).toEqual(SPRITE_PARTS.snakeHorizontal)
    })
    it('Should be horizontal if x = CELLS_COUNT.x, prevX = 1', () => {
      const snake = [
        { x: 1, y: 5 },
        { x: CELLS_COUNT.x, y: 5 },
        { x: CELLS_COUNT.x - 1, y: 5 },
      ]
      expect(getSnakeSpriteParts({ snake, direction: DIRECTIONS.right })[1]).toEqual(SPRITE_PARTS.snakeHorizontal)
    })
  })
  describe('SnakeCorner', () => {
    it('Should be fromRightToDown if prevY > y && nextY === Y && nextX > x', () => {
      const snake = [
        { x: 3, y: 2 },
        { x: 2, y: 2 },
        { x: 2, y: 3 },
      ]
      expect(getSnakeSpriteParts({ snake })[1]).toEqual(SPRITE_PARTS.snakeCornerFromRightToDown)
    })
    it('Should be fromRightToDown if prevY = y && nextY > y && nextX = x', () => {
      const snake = [
        { x: 2, y: 3 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
      ]
      expect(getSnakeSpriteParts({ snake })[1]).toEqual(SPRITE_PARTS.snakeCornerFromRightToDown)
    })
    it('Should be fromLeftToDown if prevY > y && nextY = y && nextX < x', () => {
      const snake = [
        { x: 3, y: 3 },
        { x: 3, y: 2 },
        { x: 2, y: 2 },
      ]
      expect(getSnakeSpriteParts({ snake })[1]).toEqual(SPRITE_PARTS.snakeCornerFromLeftToDown)
    })
    it('Should be fromLeftToDown if prevY = y && nextY > y && nextX === x', () => {
      const snake = [
        { x: 2, y: 2 },
        { x: 3, y: 2 },
        { x: 3, y: 3 },
      ]
      expect(getSnakeSpriteParts({ snake })[1]).toEqual(SPRITE_PARTS.snakeCornerFromLeftToDown)
    })
    it('Should be fromLeftToUp if prevY = y && nextY < y && nextX = x', () => {
      const snake = [
        { x: 2, y: 3 },
        { x: 3, y: 3 },
        { x: 3, y: 2 },
      ]
      expect(getSnakeSpriteParts({ snake })[1]).toEqual(SPRITE_PARTS.snakeCornerFromLeftToUp)
    })
    it('Should be fromLeftToUp if prevY > y && nextY = y && nextX < x', () => {
      const snake = [
        { x: 3, y: 2 },
        { x: 3, y: 3 },
        { x: 2, y: 3 },
      ]
      expect(getSnakeSpriteParts({ snake })[1]).toEqual(SPRITE_PARTS.snakeCornerFromLeftToUp)
    })
    it('Should be fromRightToUp if prevY < y && nextY = y && nextX > x', () => {
      const snake = [
        { x: 2, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 3 },
      ]
      expect(getSnakeSpriteParts({ snake })[1]).toEqual(SPRITE_PARTS.snakeCornerFromRightToUp)
    })
    it('Should be fromRightToUp if prevY === y && nextY < y && nextX = x', () => {
      const snake = [
        { x: 3, y: 3 },
        { x: 2, y: 3 },
        { x: 2, y: 2 },
      ]
      expect(getSnakeSpriteParts({ snake })[1]).toEqual(SPRITE_PARTS.snakeCornerFromRightToUp)
    })
  })
})
