// simple definition to track a player and their score
export class Player {
  constructor(name) {
    this.name = name;
    this.points = 0;
  }

  getName() {
    return this.name;
  }

  getScore() {
    return this.score;
  }

  addScore(value) {
    this.score += value;
  }
}
