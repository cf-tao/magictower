import { DEFAULT_PLAYER } from "@/data/player";
import type { Player } from "@/models/player.model";
import { gameStateStore } from "@/stores/game.store";

export class DataService {
  private readonly gameStore = gameStateStore();

  get player(): Player {
    return this.gameStore.getPlayer
  }

  constructor() {
    this.loadGame()
  }

  private loadGame() {
    this.loadPlayer()
  }

  private loadPlayer() {
    const player: Player = { ...DEFAULT_PLAYER };
    this.gameStore.updatePlayer(player)
  }
}
