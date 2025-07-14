import type { Position } from './position'

export interface Door extends Position {
  doorId: number
  locked: boolean
}
