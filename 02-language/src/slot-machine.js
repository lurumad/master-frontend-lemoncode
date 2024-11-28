const defaultRandomize = () => {
  return Math.random() > 0.5;
};

class SlotWheel {
  #randomize;

  constructor(randomize) {
    this.#randomize = randomize;
  }

  spin = () => this.#randomize();
}

class SlotMachine {
  #coins;
  #slotWheels;

  constructor(randomize = defaultRandomize) {
    this.#coins = 0;
    this.#slotWheels = [
      new SlotWheel(randomize),
      new SlotWheel(randomize),
      new SlotWheel(randomize),
    ];
  }

  play() {
    this.#addRewardCoins();
    if (this.#isWinningSpin()) {
      const winningMessage = `Congratulations!!!. You won ${
        this.#coins
      } coins!!`;
      this.#resetRewardCoins();
      return winningMessage;
    }

    return "Good luck next time!!";
  }

  #addRewardCoins() {
    this.#coins += 1;
  }

  #isWinningSpin() {
    return (
      this.#slotWheels[0].spin() &&
      this.#slotWheels[1].spin() &&
      this.#slotWheels[2].spin()
    );
  }

  #resetRewardCoins() {
    this.#coins = 0;
  }
}

module.exports = {
  SlotMachine,
};
