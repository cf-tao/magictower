<template>
  <div class="container">
    <div class="canvas-warpper">
      <canvas ref="groundCanvas" class="canvas" width="660" height="660"></canvas>
      <canvas ref="heroCanvas" class="canvas" width="660" height="660"></canvas>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;

  .canvas-warpper {
    display: flex;
    position: relative;
    height: 440px;
    width: 440px;

    .canvas {
      border: 1px solid #ccc;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, inject, onMounted, onBeforeUnmount, ref, type Ref } from 'vue';
import type { PlayerService } from '@/services/hero.service';
import type { MapService } from '@/services/map.service';
import type { TowerService } from '@/services/tower.service';
import { filter, fromEvent, Subject, takeUntil } from 'rxjs';

export default defineComponent({

  setup() {
    const heroService = inject('heroService') as PlayerService;
    const wallService = inject('wallService') as MapService;
    const towerService = inject('towerService') as TowerService;

    const groundCanvas: Ref<HTMLCanvasElement | undefined> = ref();
    const heroCanvas: Ref<HTMLCanvasElement | undefined> = ref();

    const destroy$ = new Subject()

    const initializeCanvas = () => {
      if (groundCanvas.value && heroCanvas.value) {
        towerService.initialize();
        wallService.initialize(groundCanvas.value);
        heroService.initialize(heroCanvas.value);
      };
    };

    const handleKeyDown = () => fromEvent(document, 'keydown')
      .pipe(
        filter((event) => [
          'ArrowUp',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight'].includes((event as KeyboardEvent).key)),
        takeUntil(destroy$))
      .subscribe((event) => {
        heroService.moveHero((event as KeyboardEvent).key)
      });

    onMounted(() => {
      initializeCanvas();
      handleKeyDown();
    });

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleKeyDown);
    });

    return { groundCanvas, heroCanvas };
  },
});
</script>
