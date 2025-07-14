import { finalize, interval, map, mergeMap, Observable, of, takeWhile, timer } from 'rxjs'

export class DrawerService {
  private readonly icon_size = 32
  private readonly select_icon_size = 30
  private readonly tail_size = 60

  constructor() {
  }

  draw(
    ctx: CanvasRenderingContext2D,
    sourceImg: HTMLImageElement,
    iconIndex: number,
    x: number,
    y: number,
  ) {
    if (!ctx) {
      return
    }

    ctx.drawImage(
      sourceImg,
      1,
      iconIndex * this.icon_size + 1,
      this.select_icon_size,
      this.select_icon_size,
      x * this.tail_size,
      y * this.tail_size,
      this.tail_size,
      this.tail_size,
    )
  }

  drawAnimate(
    ctx: CanvasRenderingContext2D,
    sourceImg: HTMLImageElement,
    iconIndex: number,
    x: number,
    y: number,
  ): Observable<number> {
    if (!ctx) {
      return of(0)
    }

    let iconX = 0
    const randomInterval = 1000 / (Math.floor(Math.random() * 4) + 1)

    return interval(randomInterval).pipe(
      mergeMap((value) => {
        iconX = (value % 4) * this.icon_size + 1
        ctx.drawImage(
          sourceImg,
          iconX,
          iconIndex * this.icon_size + 1,
          this.select_icon_size,
          this.select_icon_size,
          x * this.tail_size,
          y * this.tail_size,
          this.tail_size,
          this.tail_size,
        )
        return [value++]
      }),
    )
  }

  moveItem(ctx: CanvasRenderingContext2D,
    sourceImg: HTMLImageElement,
    iconIndex: number,
    sourceX: number,
    sourceY: number,
    targetX: number,
    targetY: number
  ) {
    let iconX = 0;

    const stepX = (targetX - sourceX) * this.tail_size / 4;
    const stepY = (targetY - sourceY) * this.tail_size / 4;

    let x = sourceX * this.tail_size;
    let y = sourceY * this.tail_size;

    return timer(0, 30).pipe(
      takeWhile((value) => value < 4),
      map((value) => {
        if (value < 4) {
          iconX = ((value + 1) % 4) * this.icon_size
          this.clearRect(ctx, x, y);
          x += stepX;
          y += stepY;
          this.updateRect(ctx, sourceImg, iconX, iconIndex, x, y)
          return value++
        }
      }),
      finalize(() => {})
    )
  }

  private clearRect(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.clearRect(x, y, this.tail_size, this.tail_size);
  }

  private updateRect(
    ctx: CanvasRenderingContext2D,
    sourceImg: HTMLImageElement,
    iconX: number,
    iconIndex: number,
    x: number,
    y: number) {
    ctx.drawImage(
      sourceImg,
      iconX,
      iconIndex * this.icon_size,
      this.icon_size,
      this.icon_size,
      x,
      y,
      this.tail_size,
      this.tail_size,
    )
  }
}
