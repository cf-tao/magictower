import { Position } from '@/models/hero.model'
import type { Floor } from '@/models/tower.model'
import { towerStateStore } from '@/stores/game.store'

export class TowerService {
  private towerStore = towerStateStore()

  get floors(): Floor[] {
    return this.towerStore.getFloors
  }

  constructor() {}

  public initialize() {
    this.towerStore.initialTower()
  }

  public openDoor(position: Position) {
    this.towerStore.openDoor(position)
  }
}
