import type { Position } from './position'

export interface Player extends Position {
  floor: number

  hp: number
  atk: number
  def: number
  level: number

  gold: number
  exp: number

  keys: {
    yello: number
    blue: number
    red: number
  }
}
