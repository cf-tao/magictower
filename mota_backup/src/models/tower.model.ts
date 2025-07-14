export interface Tower {
  floor: Floor[]
}

export interface Floor {
  cells: Cell[][]
  visited: boolean
  canBeVisit: boolean
}

export interface Cell {
  visited: boolean
  canBeVisit: boolean
  type?: string
  subType?: string
}
