import { interval, mergeMap, Observable, of, timer } from 'rxjs'

export class DrawerService {
  private readonly icon_size = 32
  private readonly select_icon_size = 30
  private readonly tail_size = 60

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
    loop?: boolean,
  ): Observable<number> {
    if (!ctx) {
      return of(0)
    }

    if (!loop) {
      return timer(0, 50).pipe(
        mergeMap((value) => {
          if (value < 4) {
            iconX = (value + 1) * this.icon_size
            this.draw(ctx, sourceImg, iconIndex, x, y)
            return [value++]
          } else {
            return []
          }
        }),
      )
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
}
