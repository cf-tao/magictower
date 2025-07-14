import type { Player } from '@/models/player.model';
import { exhaustMap, filter, fromEvent, Observable, of } from "rxjs";
import type { DataService } from './data.service';
import type { DrawerService } from "./drawer.service";
import type { ImageService } from './image.service';

export class PlayerService {
  private drawerService: DrawerService
  private dataService: DataService
  private imageService: ImageService

  private ctx: CanvasRenderingContext2D | null = null

  get player(): Player {
    return this.dataService.player
  }

  handleKeyDown = () => fromEvent(document, 'keydown')
    .pipe(
      filter((event) => [
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight'].includes((event as KeyboardEvent).key)),
      exhaustMap((event) =>
        this.move((event as KeyboardEvent).key))
    )
    .subscribe();

  constructor(drawerService: DrawerService, dataService: DataService, imageService: ImageService) {
    this.drawerService = drawerService
    this.dataService = dataService
    this.imageService = imageService
  }

  initialize(playerCanvas: HTMLCanvasElement) {
    this.ctx = playerCanvas.getContext('2d')

    this.imageService.imgsLoad$.subscribe(() => {
      if (!this.ctx) {
        return
      }
      this.drawerService.draw(this.ctx, this.imageService.playerImg, 0, this.player.x, this.player.y)
    })
  }

  move(direction: string): Observable<number | undefined> {
    if (!this.ctx) {
      return of(0)
    }

    const { x, y } = this.player;
    let iconIdex = 0;
    switch (direction) {
      case 'ArrowUp':
        iconIdex = 3
        if (y > 0) {
          this.player.y -= 1;
        }
        break;
      case 'ArrowDown':
        iconIdex = 0;
        if (y < 10) {
          this.player.y += 1;
        }
        break;
      case 'ArrowLeft':
        iconIdex = 1
        if (x > 0) {
          this.player.x -= 1;
        }
        break;
      case 'ArrowRight':
        iconIdex = 2
        if (x < 10) {
          this.player.x += 1;
        }
        break;
    }

    return this.drawerService.moveItem(this.ctx, this.imageService.playerImg, iconIdex, x, y, this.player.x, this.player.y)
  }
}
