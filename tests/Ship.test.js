import Ship from "../src/ship";

describe("test Ship", () => {
  test("create Ship", () => {
    expect(new Ship(1)).toBeInstanceOf(Ship);
  });
  test("sunk the ship!", () => {
    const ship = new Ship(3);
    expect(ship.size).toBe(3);
    expect(ship.coordonates).toBeInstanceOf(Array);
    expect(ship.coordonates.length).toBe(0);
    ship.coordonates = [
      [0, 0],
      [0, 1],
      [0, 2],
    ];
    expect(ship.coordonates.length).toBe(3);
    expect(ship.hit([0, 0])).toBe(true);
    expect(ship.hit([0, 5])).toBe(false);
    expect(ship.isSunk()).toBe(false);
    expect(ship.hit([0, 1])).toBe(true);
    expect(ship.hit([0, 2])).toBe(true);
    expect(ship.isSunk()).toBe(true);
  });
  test("change orientation", () => {
    const ship = new Ship(3);
    ship.coordonates = [
      [0, 0],
      [0, 1],
      [0, 2],
    ];
    ship.placed = true;
    ship.changeOrientation();
    expect(ship.coordonates).toStrictEqual([
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
    expect(ship.orientation).toBe(1);
  });
  test("hits", () => {
    const ship = new Ship(3);
    ship.coordonates = [
      [0, 0],
      [0, 1],
      [0, 2],
    ];
    expect(ship.hit([0, 0])).toBe(true);
    expect(ship.hits).toContainEqual([0, 0]);
  });
});
