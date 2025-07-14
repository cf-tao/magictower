import type { Position } from './position'

export const CANVAS_SIZE = 660

export interface Wall extends Position {
  wallId: number
}
