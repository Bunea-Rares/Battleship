import Ship from "./ship.js";

class Gameboard {
  constructor(name) {
    this.name = name;
    this.board = Array(10)
      .fill(0)
      .map((e) => Array(10).fill(0));
    this.hits = [];
    this.misses = [];
    this.totalShips = 5;
    this.sunkShips = 0;
    this.ships = [];
  }

  checkPlacementIsLegal(ship, coordonates) {
    //if ship orientation is on x axis, check if x axis is free for the length of ship
    if (!ship.orientation) {
      if (ship.size + coordonates[1] >= 10) return false;
      return this.board[coordonates[0]]
        .slice(coordonates[1], coordonates[1] + ship.size)
        .every((e) => e === 0);
    }
    //else check the y axis
    if (ship.size + coordonates[0] >= 10) return false;
    for (let i = coordonates[1]; i < coordonates[1] + ship.size; i++) {
      if (this.board[coordonates[0]][i] !== 0) return false;
    }
    return true;
  }

  placeShip(ship, coordonates = [0, 0]) {
    if (this.checkPlacementIsLegal(ship, coordonates)) {
      //on x axis
      if (!ship.orientation) {
        for (let i = 0; i < ship.size; i++) {
          this.board[coordonates[0]][i + coordonates[1]] = ship;
          ship.coordonates.push([coordonates[0], i + coordonates[1]]);
        }
      }
      //in y axis
      else {
        for (let x = coordonates[0]; x < ship.size + coordonates[0]; x++) {
          this.board[x][coordonates[1]] = ship;
          ship.coordonates.push([x, coordonates[1]]);
        }
      }
      return true;
    }
    return false;
  }

  isGamingGoing() {
    if (this.totalShips === this.sunkShips) return false;
    return true;
  }

  reciveAttack(coordonates) {
    const markHit = document.getElementById(
      `${this.name[0] + coordonates[0] + coordonates[1]}`
    );

    const placement = this.board[coordonates[0]][coordonates[1]];
    if (placement !== 0) {
      markHit.classList.add("hit", "disabled");
      this.hits.push(coordonates);
      placement.hit(coordonates);
      if (placement.isSunk()) {
        this.sunkShips++;
        placement.coordonates.map((coordonate) => {
          const markSunk = document.getElementById(
            `${this.name[0] + coordonate[0] + coordonate[1]}`
          );
          markSunk.classList.add("sunk");
        });
        if (!this.isGamingGoing()) {
          const msg = document.getElementById("msg");
          if (this.name === "player") {
            msg.innerText = "Ai has won the game!";
          } else {
            msg.innerText = "You have won";
          }
        }
      }
      return true;
    }
    this.misses.push(coordonates);
    markHit.classList.add("miss", "disabled");

    return false;
  }

  createDom(id) {
    const container = document.getElementById(id);
    this.board.map((e, x) => {
      const row = document.createElement("div");
      row.classList.add("d-flex");
      e.map((ee, y) => {
        const square = document.createElement("div");
        square.classList.add("square");
        square.id = `${id[0] + x + y}`;
        if (id === "ai") {
          square.classList.add("pointer");
        }
        row.append(square);
      });
      container.append(row);
    });
  }

  generateShips() {
    this.ships = [];
    for (let i = 0; i < 5; i++) {
      const ship = new Ship(Math.floor(Math.random() * 4 + 2));
      ship.orientation = Math.floor(Math.random() * 2);
      this.ships.push(ship);
    }
  }

  startPacement() {
    this.ships.map((ship) => {
      while (
        !this.placeShip(ship, [
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
        ])
      ) {
        continue;
      }
    });
  }
}

export default Gameboard;
