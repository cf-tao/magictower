<script lang="ts">
import { defineComponent, provide } from 'vue';
import { MapService } from './services/map.service';
import { DrawerService } from './services/drawer.service';
import { DoorService } from './services/door.service';

export default defineComponent({
  setup() {
    const drawerService = new DrawerService();

    const mapService = new MapService(drawerService);
    const doorService = new DoorService(drawerService);

    provide('drawerService', drawerService);
    provide('mapService', mapService);
    provide('doorService', doorService);
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
