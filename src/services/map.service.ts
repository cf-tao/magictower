import { DEFAULT_MAP } from '@/data/map'
import { wall_data, wall_tail_gallery } from '@/data/walls'
import { type Wall } from '@/models/wall.model'
import type { DataService } from './data.service'
import { DrawerService } from './drawer.service'
import type { ImageService } from './image.service'

export class MapService {
  private drawerService: DrawerService
  private dataService: DataService
  private imgService: ImageService

  private ctx: CanvasRenderingContext2D | null = null

  get floorId(): number {
    return this.dataService.player.floor
  }

  constructor(
    drawerService: DrawerService,
    dataService: DataService,
    imgService: ImageService
  )
    {
    this.drawerService = drawerService
    this.dataService = dataService
    this.imgService = imgService
  }

  drawMapFloor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')

    if (!this.ctx) {
      return
    }

    this.imgService.imgsLoad$.subscribe(() => {
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

    this.drawerService.draw(this.ctx, this.imgService.terrainsImg, 0, x, y)
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
      .drawAnimate(this.ctx, this.imgService.animatesImg, tail.iconIndex, x, y).subscribe()
  }
}
