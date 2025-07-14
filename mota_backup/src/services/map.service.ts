import { ref } from 'vue'
import groundImage from '@/materials/ground.png'
import wallImage from '@/materials/animates.png'
import terrainsImage from '@/materials/terrains.png'
import { concat, fromEvent, mergeMap, Observable, timer } from 'rxjs'
import { wallItemSize, WALLS, type Wall } from '@/models/wall.model'
import { itemSize, tailSize } from '@/models/wall.model'

export class MapService {
  private backgroundCtx: CanvasRenderingContext2D | null = null

  private groundImageElement = ref(new Image())
  private imagLoad$ = fromEvent(this.groundImageElement.value, 'load')

  private wallImageElement = ref(new Image())
  private wallImgLoad$ = fromEvent(this.wallImageElement.value, 'load')

  private terrainsImageElement = ref(new Image())
  private terrainsImgLoad$ = fromEvent(this.terrainsImageElement.value, 'load')

  constructor() {
    this.groundImageElement.value.src = groundImage
    this.wallImageElement.value.src = wallImage
    this.terrainsImageElement.value.src = terrainsImage
  }

  initialize(groundCanvas: HTMLCanvasElement) {
    this.backgroundCtx = groundCanvas.getContext('2d')

    if (!this.backgroundCtx) {
      return
    }

    concat(this.imagLoad$, this.wallImgLoad$, this.terrainsImgLoad$).subscribe(() => {
      this.drawground()
      this.drawMap()
    })
  }

  private drawground() {
    if (!this.backgroundCtx) {
      return
    }
    const pattern = this.backgroundCtx.createPattern(this.groundImageElement.value, 'repeat')
    if (!pattern) {
      return
    }

    this.backgroundCtx.fillStyle = pattern
    this.backgroundCtx.fillRect(
      0,
      0,
      this.backgroundCtx.canvas.width,
      this.backgroundCtx.canvas.height,
    )
  }

  private drawMap() {
    const floor = this.hero.position.floor
    const floorData = this.towerService.floors[floor]

    if (!floorData) {
      return
    }

    floorData.cells.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (!cell.type) {
          return
        }

        const wall = WALLS.find((w) => w.type.toString() === `${cell.type}:${cell.subType}`)
        if (!wall) {
          return
        }

        if (!this.backgroundCtx) {
          return
        }

        const imageValue = wall.hasAnimation
          ? this.wallImageElement.value
          : this.terrainsImageElement.value

        this.backgroundCtx.drawImage(
          imageValue,
          0,
          wall.iconIndex * itemSize + 1,
          itemSize,
          wallItemSize,
          x * tailSize,
          y * tailSize,
          tailSize,
          tailSize,
        )
      })
    })
  }

  updateMap(position: Position, animate?: boolean): Observable<number> {
    let iconX = 0
    if (!animate) {
      this.drawCell(position, iconX)
    }

    return timer(0, 50).pipe(
      mergeMap((value) => {
        if (value < 4) {
          iconX = (value + 1) * itemSize
          this.drawCell(position, iconX)
          return [value++]
        } else {
          return []
        }
      }),
    )
  }

  clearCell(position: Position) {
    this.backgroundCtx?.clearRect(
      position.floor_x * tailSize,
      position.floor_y * tailSize,
      tailSize,
      tailSize,
    )
  }

  drawCellBackground(position: Position) {
    if (!this.backgroundCtx) {
      return
    }

    const pattern = this.backgroundCtx.createPattern(this.groundImageElement.value, 'repeat')
    if (!pattern) {
      return
    }

    this.backgroundCtx.fillStyle = pattern
    this.backgroundCtx.fillRect(
      position.floor_x * tailSize,
      position.floor_y * tailSize,
      tailSize,
      tailSize,
    )
  }

  drawCell(position: Position, iconX: number) {
    if (!this.backgroundCtx) {
      return
    }

    const wall = this.findTargetWall(position)
    if (!wall) {
      return
    }

    this.clearCell(position)
    this.drawCellBackground(position)

    this.backgroundCtx.drawImage(
      this.wallImageElement.value,
      iconX,
      wall.iconIndex * itemSize + 1,
      itemSize,
      wallItemSize,
      position.floor_x * tailSize,
      position.floor_y * tailSize,
      tailSize,
      tailSize,
    )
  }

  findTargetWall(position: Position): Wall | undefined {
    if (!position) {
      return
    }

    const floorData = this.towerService.floors[position.floor]
    if (!floorData) {
      return
    }

    const cell = floorData.cells[position.floor_y][position.floor_x]
    if (!cell?.type) {
      return
    }

    return WALLS.find((w) => w.type.toString() === `${cell.type}:${cell.subType}`)
  }
}
