// simple definition to track a player and their score
export class Player {
  /** @type {string} */
  name;
  /** @type {Array} */
  ownedPrompts;

  constructor(name) {
    this.name = name;
    this.ownedPrompts = [];
  }

  addPrompt(prompt) {
    this.ownedPrompts.push(prompt);
  }

  score() {
    return this.ownedPrompts.length;
  }
}
