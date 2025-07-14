import { TOWER_DATA } from '@/data/map'
import type { Position } from '@/models/hero.model'
import { type Cell, type Floor } from '@/models/tower.model'
import { defineStore } from 'pinia'

export const towerStateStore = defineStore('towerStateStore', {
  state: () => ({
    player: {},
    floors: [] as Floor[],
    monsters: [],
    items: [],
    npcs: [],
    doors: [],
  }),
  actions: {
    initialTower() {
      this.floors = TOWER_DATA.map((floor) => {
        const floorData = floor.map
        const res = {} as Floor

        res.cells = floorData.map((row) => {
          return row.map((tail) => {
            const cell = { visited: false, canBeVisit: false } as Cell
            const cellObjType = typeof tail
            if (cellObjType === 'number') {
              cell.canBeVisit = true
            } else {
              const content = tail.toString().split(':')
              cell.type = content[0]
              cell.subType = content[1]
            }
            return cell
          })
        })
        return res
      })
    },

    openDoor(position: Position) {
      const floor = this.floors[position.floor]
      const cell = floor.cells[position.floor_y][position.floor_x]
      delete cell.subType
      delete cell.type
      cell.canBeVisit = true
    },
  },

  getters: {
    getFloors: (state) => state.floors,
  },
})
