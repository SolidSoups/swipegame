import { Player } from "./Player";

export class PlayerManager {
  constructor(names) {
    this.players = [];
    this.turn = 0;
    names.forEach((element) => {
      this.players.push(new Player(element));
    });
  }

  addPlayer(name) {
    this.players.push(new Player(name));
  }

  addPlayers(namesList) {
    namesList.forEach((element) => {
      this.players.push(new Player(element));
    });
  }

  resetPlayers() {
    this.players = [];
  }

  getPlayerList() {
    return this.players;
  }

  nextTurn() {
    this.turn = (this.turn + 1) % this.players.length;
  }

  getCurrentPlayer() {
    if (this.turn >= 0 && this.turn < this.players.length) {
      return this.players[this.turn];
    }
    return null;
  }
}
