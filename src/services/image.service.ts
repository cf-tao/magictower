import animates from '@/materials/animates.png';
import player from '@/materials/player.png';
import terrains from '@/materials/terrains.png';
import { fromEvent, merge, Observable } from 'rxjs';
import { ref } from 'vue';

export class ImageService {
  private animatesImage = ref(new Image())
  private animatesImgLoad$ = fromEvent(this.animatesImage.value, 'load')

  private terrainsImage = ref(new Image())
  private terrainsImgLoad$ = fromEvent(this.terrainsImage.value, 'load')

  private playerImage = ref(new Image())
  private playerImgLoad$ = fromEvent(this.playerImage.value, 'load')

  get imgsLoad$(): Observable<Event> {
    return merge(
      this.animatesImgLoad$,
      this.terrainsImgLoad$,
      this.playerImgLoad$
    )
  }

  get playerImg() {
    return this.playerImage.value;
  }

  get terrainsImg() {
    return this.terrainsImage.value;
  }

  get animatesImg() {
    return this.animatesImage.value;
  }
  constructor() {
    this.playerImage.value.src = player
    this.animatesImage.value.src = animates
    this.terrainsImage.value.src = terrains
  }
}
