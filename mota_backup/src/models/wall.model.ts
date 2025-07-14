export const tailSize = 60
export const CANVAS_SIZE = 660
export const FLOOR_SIZE = CANVAS_SIZE / tailSize - 1
export const itemSize = 32
export const wallItemSize = 30

export enum TILE_TYPE {
  EMPTY = 0,
  WALL = 1,
  PLAYER = 2,
  MONSTER = 3,
  NPC = 4,
  ITEM = 5,
  DOOR = 6,
  STAIR_UP = 7,
  STAIR_DOWN = 8,
}

export enum WallType {
  YelloWall = 'wall:yello_wall',
  Stars = 'wall:stars',
  RedWater = 'wall:red_water',
  YelloDoor = 'door:yello_door',
  BlueDoor = 'door:blue_door',
  RedDoor = 'door:red_door',

  UpStairs = 'stairs:up_stairs',
  DownStairs = 'stairs:down_stairs',
}

export interface Wall {
  type: WallType
  iconIndex: number
  hasAnimation: boolean
}

export const WALLS: Wall[] = [
  {
    type: WallType.YelloWall,
    iconIndex: 10,
    hasAnimation: true,
  },
  {
    type: WallType.Stars,
    iconIndex: 0,
    hasAnimation: true,
  },
  {
    type: WallType.RedWater,
    iconIndex: 1,
    hasAnimation: true,
  },
  {
    type: WallType.YelloDoor,
    iconIndex: 4,
    hasAnimation: true,
  },
  {
    type: WallType.BlueDoor,
    iconIndex: 5,
    hasAnimation: true,
  },
  {
    type: WallType.RedDoor,
    iconIndex: 6,
    hasAnimation: true,
  },
  {
    type: WallType.UpStairs,
    iconIndex: 6,
    hasAnimation: false,
  },
  {
    type: WallType.DownStairs,
    iconIndex: 5,
    hasAnimation: false,
  },
]
