import playerImg from '@/materials/player.png';
import { fromEvent } from "rxjs";
import { ref } from "vue";
import type { DrawerService } from "./drawer.service";

export class PlayerService {
  private drawerService: DrawerService
  private ctx: CanvasRenderingContext2D | null = null

  private playerImage = ref(new Image())
  private imagLoad$ = fromEvent(this.playerImage.value, 'load')
  constructor(drawerService: DrawerService) {
    this.drawerService = drawerService
    this.playerImage.value.src = playerImg
  }

  initialize(gameCanvas: HTMLCanvasElement) {
    this.ctx = gameCanvas.getContext('2d')

    this.imagLoad$.subscribe(() => {
      console.log('hero image loaded successfully')
      if (!this.ctx) {
        return
      }
      this.drawerService.draw(this.ctx, this.playerImage.value, 0, 5, 10)
    })
  }

  move(direction: string) {
    console.log(direction)
  }
}
