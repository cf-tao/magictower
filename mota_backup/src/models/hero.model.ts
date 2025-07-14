export interface Player {
  x: number
  y: number

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
