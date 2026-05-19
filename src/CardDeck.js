export class CardDeck {
  constructor(prompts) {
    this.prompts = prompts;
    this.currentIndex = 0;
  }

  getCurrentPrompt() {
    return this.prompts[this.currentIndex];
  }

  advance() {
    if (this.currentIndex < this.prompts.length - 1) {
      this.currentIndex++;
      return this.getCurrentPrompt();
    }
    return null;
  }

  reset() {
    this.currentIndex = 0;
  }
}
