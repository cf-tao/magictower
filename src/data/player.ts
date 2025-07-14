import type { Player } from "@/models/player.model";

export const DEFAULT_PLAYER: Player = {
  x: 5,
  y: 10,
  floor: 0,
  hp: 2000,
  atk: 12,
  def: 12,
  level: 1,
  gold: 0,
  exp: 0,
  keys: {
    yello: 0,
    blue: 0,
    red: 0
  }
}
