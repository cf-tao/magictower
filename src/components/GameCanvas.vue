<template>
  <div class="container">
    <div class="canvas-warpper">
      <canvas ref="gameCanvas" class="canvas" width="660" height="660"></canvas>
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
import type { MapService } from '@/services/map.service';
import type { DoorService } from '@/services/door.service';
import type { PlayerService } from '@/services/palyer.service';
import { filter, fromEvent, Subject, takeUntil } from 'rxjs';

export default defineComponent({
  setup() {
    const mapService = inject('mapService') as MapService;
    const doorService = inject('doorService') as DoorService;
    const playerService = inject('playerService') as PlayerService;

    const gameCanvas: Ref<HTMLCanvasElement | undefined> = ref();

    const floor = 0;

    const destroy$ = new Subject()

    const loadGameState = () => {

    }

    const drawGame = () => {
      if (!gameCanvas.value) {
        return
      }
      mapService.drawMapFloor(gameCanvas.value, floor);
      doorService.drawDoors(gameCanvas.value, floor)
      playerService.initialize(gameCanvas.value)
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
        playerService.move((event as KeyboardEvent).key)
      });

    onMounted(() => {
      loadGameState();
      drawGame();
      handleKeyDown();
    });

    onBeforeUnmount(() => {
    });

    return { gameCanvas };
  },
});
</script>
