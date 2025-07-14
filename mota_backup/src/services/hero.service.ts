import { fromEvent, mergeMap, timer } from 'rxjs'
import { ref } from 'vue'
import heroImage from '@/materials/hero.png'
import { heroStateStore } from '@/stores/hero.store'
import { FLOOR_SIZE, itemSize, tailSize } from '@/models/wall.model'
import type { TowerService } from './tower.service'
import type { MapService } from './map.service'
import type { Floor } from '@/models/tower.model'

export class PlayerService {
  private towerService: TowerService
  private wallService: MapService

  private heroStore = heroStateStore()
  private heroImageElement = ref(new Image())
  private hero = this.heroStore.hero

  private iconCtx: CanvasRenderingContext2D | null = null
  private iconX: number = 0
  private iconY: number = 0

  private destX: number = this.hero.position.floor_x * tailSize
  private destY: number = this.hero.position.floor_y * tailSize

  private imagLoad$ = fromEvent(this.heroImageElement.value, 'load')
  private loading = ref(false)

  get floors(): Floor[] {
    return this.towerService.floors
  }

  constructor(towerService: TowerService, wallService: MapService) {
    this.towerService = towerService
    this.wallService = wallService
    this.heroImageElement.value.src = heroImage
  }

  initialize(heroCanvas: HTMLCanvasElement) {
    this.imagLoad$.subscribe(() => {
      this.loading.value = false
      console.log('hero image loaded successfully')
      this.iconCtx = heroCanvas.getContext('2d')
      this.drawHero()

      // TODO
      this.updateKeys('yelloKey', 1)
    })
  }

  moveHero(direction: string) {
    const step = this.calcStep(direction)

    if (!step) {
      this.stepAnimation(direction, step)
      return
    }

    timer(0, 50)
      .pipe(
        mergeMap((value) => {
          if (value < 4) {
            this.iconX = ((value + 1) % 4) * itemSize
            this.stepAnimation(direction, step)
            return [value++]
          } else {
            return []
          }
        }),
      )
      .subscribe()
  }

  updateKeys(keyType: 'yelloKey' | 'blueKey' | 'redKey', changeValue: number) {
    this.hero[keyType] += changeValue
  }

  private calcStep(direction: string): number {
    const step = tailSize / 4
    const currPosition = this.hero.position

    const targetPosition = { ...currPosition }
    switch (direction) {
      case 'ArrowUp':
        if (currPosition.floor_y > 0) {
          targetPosition.floor_y -= 1
        }
        break
      case 'ArrowDown':
        if (currPosition.floor_y < FLOOR_SIZE) {
          targetPosition.floor_y += 1
        }
        break
      case 'ArrowLeft':
        if (currPosition.floor_x > 0) {
          targetPosition.floor_x -= 1
        }
        break
      case 'ArrowRight':
        if (currPosition.floor_x < FLOOR_SIZE) {
          targetPosition.floor_x += 1
        }
        break
    }

    const floor = this.floors[this.hero.position.floor]
    const cell = floor.cells[targetPosition.floor_y][targetPosition.floor_x]

    const resultStep = cell?.canBeVisit ? step : 0

    if (cell.type === 'door') {
      const hasKey = this.checkHasKey(cell.subType)
      if (hasKey) {
        this.wallService.updateMap(targetPosition, true).subscribe((res) => {
          if (res === 3) {
            this.towerService.openDoor(targetPosition)
          }
        })
      }
    }

    if (cell.type === 'stairs') {
      console.log(`change floor`)
    }

    if (resultStep) {
      this.heroStore.updatePosition(targetPosition)
    }
    return resultStep
  }

  checkHasKey(doorType: string | undefined): boolean {
    if (!doorType) {
      return false
    }

    switch (doorType) {
      case 'yello_door':
        return !!this.hero.yelloKey
      case 'bule_door':
        return !!this.hero.blueKey
      case 'red_door':
        return !!this.hero.redKey
      case 'wood_door':
        return false
      default:
        return false
    }
  }

  private stepAnimation(direction: string, step: number) {
    switch (direction) {
      case 'ArrowUp':
        this.iconY = 96
        if (this.destY > 0) {
          this.destY -= step
        }
        break
      case 'ArrowDown':
        this.iconY = 0
        if (this.destY < this.iconCtx!.canvas.height - tailSize) {
          this.destY += step
        }
        break
      case 'ArrowLeft':
        this.iconY = 32
        if (this.destX > 0) {
          this.destX -= step
        }
        break
      case 'ArrowRight':
        this.iconY = 64
        if (this.destX < this.iconCtx!.canvas.width - tailSize) {
          this.destX += step
        }
        break
    }
    this.drawHero()
  }

  private drawHero() {
    if (this.iconCtx) {
      this.iconCtx.clearRect(0, 0, this.iconCtx.canvas.width, this.iconCtx.canvas.height)
      this.iconCtx.drawImage(
        this.heroImageElement.value,
        this.iconX,
        this.iconY,
        itemSize,
        itemSize,
        this.destX,
        this.destY,
        tailSize,
        tailSize,
      )
    }
  }
}
