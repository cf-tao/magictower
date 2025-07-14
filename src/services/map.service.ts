import { concat, fromEvent, take } from 'rxjs'
import { ref } from 'vue'
import animates from '@/materials/animates.png'
import terrainsImage from '@/materials/terrains.png'
import { DEFAULT_MAP } from '@/data/map'
import { type Wall } from '@/models/wall.model'
import { wall_data, wall_tail_gallery } from '@/data/walls'
import { DrawerService } from './drawer.service'

export class MapService {
  private drawerService: DrawerService

  private ctx: CanvasRenderingContext2D | null = null

  private animatesImageElement = ref(new Image())
  private animatesImgLoad$ = fromEvent(this.animatesImageElement.value, 'load')

  private terrainsImageElement = ref(new Image())
  private terrainsImgLoad$ = fromEvent(this.terrainsImageElement.value, 'load')

  private floorId = 0

  constructor(drawerService: DrawerService) {
    this.drawerService = drawerService
    this.animatesImageElement.value.src = animates
    this.terrainsImageElement.value.src = terrainsImage
  }

  drowMapFloor(canvas: HTMLCanvasElement, flooId: number) {
    this.ctx = canvas.getContext('2d')
    this.floorId = flooId

    if (!this.ctx) {
      return
    }

    concat(this.animatesImgLoad$, this.terrainsImgLoad$).subscribe(() => {
      this.drawMap()
    })
  }

  private drawMap() {
    const map_data = DEFAULT_MAP.find((w) => w.floorId === this.floorId)?.data
    const floorWallData = wall_data.find((w) => w.floorId === this.floorId)?.data

    if (!map_data) {
      return
    }
    map_data.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell && floorWallData) {
          this.drawWall(floorWallData as Wall[], colIndex, rowIndex)
        } else {
          this.drawGround(colIndex, rowIndex)
        }
      })
    })
  }

  private drawGround(x: number, y: number) {
    if (!this.ctx) {
      return
    }

    this.drawerService.draw(this.ctx, this.terrainsImageElement.value, 0, x, y)
  }

  private drawWall(wallData: Wall[], x: number, y: number) {
    if (!this.ctx) {
      return
    }

    const wall = wallData.find((w) => w.x === x && w.y === y)
    if (!wall) {
      return
    }

    const tail = wall_tail_gallery[wall.wallId]
    this.drawerService
      .drawAnimate(this.ctx, this.animatesImageElement.value, tail.iconIndex, x, y, true)
      .subscribe()
  }
}
