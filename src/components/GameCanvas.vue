<template>
  <div class="container">
    <div class="canvas-warpper">
      <canvas ref="mapCanvas" class="canvas" width="660" height="660"></canvas>
      <canvas ref="playerCanvas" class="canvas" width="660" height="660"></canvas>
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

export default defineComponent({
  setup() {
    const mapService = inject('mapService') as MapService;
    const doorService = inject('doorService') as DoorService;
    const playerService = inject('playerService') as PlayerService;

    const mapCanvas: Ref<HTMLCanvasElement | undefined> = ref();
    const playerCanvas: Ref<HTMLCanvasElement | undefined> = ref();

    const drawGame = () => {
      if (!mapCanvas?.value || !playerCanvas?.value) {
        return
      }
      mapService.drawMapFloor(mapCanvas.value)
      doorService.drawDoors(mapCanvas.value)
      playerService.initialize(playerCanvas.value)
    };

    const handleKeyDown = playerService.handleKeyDown

    onMounted(() => {
      drawGame();
      handleKeyDown();
    });

    onBeforeUnmount(() => {
    });

    return { mapCanvas, playerCanvas };
  },
});
</script>
