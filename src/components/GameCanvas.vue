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

export default defineComponent({
  setup() {
    const mapService = inject('mapService') as MapService;
    const doorService = inject('doorService') as DoorService;

    const gameCanvas: Ref<HTMLCanvasElement | undefined> = ref();

    const floor = 0;

    const drawMap = () => {
      if (gameCanvas.value) {
        mapService.drowMapFloor(gameCanvas.value, floor);
        doorService.drowDoors(gameCanvas.value, floor)
      };
    };

    onMounted(() => {
      drawMap();
    });

    onBeforeUnmount(() => {
    });

    return { gameCanvas };
  },
});
</script>
