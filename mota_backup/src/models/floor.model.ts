import type { TILE_TYPE } from './wall.model'

export interface Floor {
  floorId: number
  map: Cell[][]
}

export interface Cell {
  type: TILE_TYPE
  data: {
    monsterId: number
  }
}
