import { door_gallery, DOORS } from '@/data/doors'
import type { Door } from '@/models/door.model'
import type { DataService } from './data.service'
import { DrawerService } from './drawer.service'
import type { ImageService } from './image.service'

export class DoorService {
  private drawerService: DrawerService
  private dataService: DataService
  private imageService: ImageService

  private ctx: CanvasRenderingContext2D | null = null

  get floorId(): number {
    return this.dataService.player.floor
  }

  constructor(drawerService: DrawerService, dataService: DataService, imageService: ImageService) {
    this.drawerService = drawerService
    this.dataService = dataService
    this.imageService = imageService
  }

  drawDoors(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')

    if (!this.ctx) {
      return
    }

    this.imageService.imgsLoad$.subscribe(() => {
      const door_data = DOORS.find((w) => w.floorId === this.floorId)?.data
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

  openDoor(x: number, y: number) { }

  private drawDoor(door: Door, x: number, y: number) {
    if (!this.ctx || !door) {
      return
    }
    const tail = door_gallery[door.doorId]
    this.drawerService.draw(this.ctx, this.imageService.animatesImg, tail.iconIndex, x, y)
  }
}
