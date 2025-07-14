<script lang="ts">
import { defineComponent, provide } from 'vue';
import { MapService } from './services/map.service';

export default defineComponent({
  setup() {
    //const towerService = new TowerService();
    const mapService = new MapService();
    //const heroService = new PlayerService(towerService, wallService);
    //provide('towerService', towerService);
    //provide('wallService', wallService);
    provide('mapService', mapService);
    return {};
  },
});
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
