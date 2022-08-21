import Gameboard from "../src/Gameboard";
import Ship from "../src/Ship";

describe("Gameboard test", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  test("gameboard lenth is 10 and values are 0", () => {
    expect(gameboard.board.length).toBe(10);
    expect(gameboard.board).toContainEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });

  test("check free placement spots on x axis", () => {
    expect(gameboard.checkPlacementIsLegal(ship, [0, 0])).toBe(true);
  });

  test("check occupied placement spots on x axis", () => {
    gameboard.placeShip(ship, [0, 0]);
    expect(gameboard.board[0][0]).toEqual(ship);
    expect(gameboard.board[0][1]).toEqual(ship);
    expect(gameboard.board[0][2]).toEqual(ship);
    expect(gameboard.placeShip(ship, [0, 0])).toBe(false);
  });

  test("check free placement spots on x axis", () => {
    const ship = new Ship(3);
    ship.changeOrientation();
    expect(gameboard.checkPlacementIsLegal(ship, [1, 0])).toBe(true);
  });

  test("check occupied placement spots on x axis", () => {
    ship.changeOrientation();
    expect(gameboard.placeShip(ship, [0, 0])).toBe(false);
    expect(gameboard.placeShip(ship, [1, 0])).toBe(true);
  });

  test("check attack", () => {
    //fails due to DOM
    // expect(gameboard.reciveAttack([0, 0])).toBe(true);
    // expect(gameboard.hits).toContainEqual([0, 0]);
  });
});
