import type { FloorData } from '@/models/floor.model'

export const DOORS: FloorData[] = [
  {
    floorId: 0,
    data: [
      {
        doorId: 1,
        x: 5,
        y: 7,
        locked: true,
      },
    ],
  },
  {
    floorId: 1,
    data: [
      {
        doorId: 0,
        x: 7,
        y: 5,
        locked: true,
      },
    ],
  },
]

export const door_gallery: Record<number, { type: string; name: string; iconIndex: number }> = {
  1: { type: 'yello', name: 'Yello Door', iconIndex: 4 },
  2: { type: 'blue', name: 'Blue Door', iconIndex: 5 },
  3: { type: 'red', name: 'Red Door', iconIndex: 6 },
}
