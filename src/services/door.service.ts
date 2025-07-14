import { fromEvent } from 'rxjs'
import { ref } from 'vue'
import animates from '@/materials/animates.png'
import { DrawerService } from './drawer.service'
import { door_gallery, DOORS } from '@/data/doors'
import type { Door } from '@/models/door.model'

export class DoorService {
  private drawerService: DrawerService

  private ctx: CanvasRenderingContext2D | null = null

  private doorImage = ref(new Image())
  private doorImageLoad$ = fromEvent(this.doorImage.value, 'load')

  constructor(drawerService: DrawerService) {
    this.drawerService = drawerService
    this.doorImage.value.src = animates
  }

  drawDoors(canvas: HTMLCanvasElement, floorId: number) {
    this.ctx = canvas.getContext('2d')

    if (!this.ctx) {
      return
    }

    this.doorImageLoad$.subscribe(() => {
      const door_data = DOORS.find((w) => w.floorId === floorId)?.data
      if (!door_data) {
        return
      }

      door_data
        .filter((c) => (c as Door).locked)
        .forEach((door) => {
          this.drawDoor(door as Door, door.x, door.y)
        })
    })
  }

  openDoor(x: number, y: number) {}

  private drawDoor(door: Door, x: number, y: number) {
    if (!this.ctx || !door) {
      return
    }
    const tail = door_gallery[door.doorId]
    this.drawerService.draw(this.ctx, this.doorImage.value, tail.iconIndex, x, y)
  }
}
