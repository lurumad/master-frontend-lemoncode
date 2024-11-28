const { SlotMachine } = require("../src/slot-machine");

describe("Playing the slot machine", () => {
  test("returns a winning message if the spin is winning", () => {
    const machine = new SlotMachine(jest.fn(() => true));
    const expected = machine.play();
    expect("Congratulations!!!. You won 1 coins!!").toBe(expected);
  });

  test("returns a losing message if the spin is not winning", () => {
    const machine = new SlotMachine(jest.fn(() => false));
    const expected = machine.play();
    expect("Good luck next time!!").toBe(expected);
  });

  test("spin winning after multiple plays", () => {
    const randomize = jest.fn(() => false);
    const machine = new SlotMachine(randomize);
    machine.play();
    machine.play();
    machine.play();
    machine.play();
    machine.play();
    randomize.mockImplementation(() => true);
    const expected = machine.play();
    expect("Congratulations!!!. You won 6 coins!!").toBe(expected);
  });
});
