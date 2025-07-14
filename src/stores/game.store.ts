import { defineStore } from 'pinia'

export const towerStateStore = defineStore('towerStateStore', {
  state: () => ({
    player: {},
    floors: [],
    monsters: [],
    items: [],
    npcs: [],
    doors: [],
  }),
  actions: {},

  getters: {},
})
