import type { Player } from '@/models/player.model'
import { defineStore } from 'pinia'

export const gameStateStore = defineStore('gameStateStore', {
  state: () => ({
    player: {} as Player,
    floors: [],
    monsters: [],
    items: [],
    npcs: [],
    doors: [],
  }),
  actions: {
    updatePlayer(player: Player) {
      this.player = player
    }
  },

  getters: {
    getPlayer: (state) => state.player
  },
})
