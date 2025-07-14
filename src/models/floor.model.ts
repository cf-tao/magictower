import type { Door } from './door.model'
import type { Wall } from './wall.model'

export interface FloorData {
  floorId: number
  data: Wall[] | Door[]
}
