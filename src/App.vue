<script lang="ts">
import { defineComponent, provide } from 'vue';
import { MapService } from './services/map.service';
import { DrawerService } from './services/drawer.service';
import { DoorService } from './services/door.service';
import { PlayerService } from './services/palyer.service';
import { DataService } from './services/data.service';
import { ImageService } from './services/image.service';

export default defineComponent({
  setup() {
    const dataService = new DataService();
    const imageService = new ImageService();

    const drawerService = new DrawerService();

    const mapService = new MapService(drawerService, dataService, imageService);
    const doorService = new DoorService(drawerService, dataService, imageService);
    const playerService = new PlayerService(drawerService, dataService, imageService);

    provide('imageService', imageService);
    provide('dataService', dataService);
    provide('drawerService', drawerService);

    provide('mapService', mapService);
    provide('doorService', doorService);
    provide('playerService', playerService);
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
