const playerHit = (e) => {
  const target = document.getElementById(e.target.id);
  console.log(ai.gameboard.shipsArray);
  if (aiGameBoard.reciveAttack(e.target.id.split("").map((e) => parseInt(e)))) {
    target.classList.add("hit", "disabled");
    aiGameBoard.shipsArray.map((ship) => {
      if (ship.isSunk()) {
        ship.coordonates.map((xy) => {
          document.getElementById(`${xy[0]}${xy[1]}`).classList.add("sunk");
        });
      }
    });
  } else {
    target.classList.add("miss", "disabled");
  }
  if (playerGameboard.isGamingGoing() && aiGameBoard.isGamingGoing()) {
    aiHit();
  } else {
    if (!playerGameboard.isGamingGoing()) {
      prompt("Ai won!");
    } else {
      prompt("You win!");
    }
    document.getElementById("ai").classList.add("disabled");
  }
};

const aiHit = () => {
  const coordonates = ai.hit();
  const target = document.getElementById(`p${coordonates[0]}${coordonates[1]}`);
  if (playerGameboard.reciveAttack(coordonates)) {
    target.classList.add("hit", "disabled");
    playerGameboard.shipsArray.map((ship) => {
      if (ship.isSunk()) {
        ship.coordonates.map((xy) => {
          document.getElementById(`p${xy[0]}${xy[1]}`).classList.add("sunk");
        });
      }
    });
  } else {
    target.classList.add("miss", "disabled");
  }
  if (!playerGameboard.isGamingGoing()) {
    document.getElementById("ai").classList.add("disabled");
    prompt("Ai won!");
  } else if (!aiGameBoard.isGamingGoing()) {
    document.getElementById("ai").classList.add("disabled");
    prompt("You win!");
  }
};

const createGame = (gameBoard, game, ai = false) => {
  //going through rows
  gameBoard.board.map((rows, x) => {
    const row = document.createElement("div");
    row.classList.add("container", "d-flex");
    //going through squares
    rows.map((e, y) => {
      const square = document.createElement("div");
      square.classList.add("square", "pointer");
      if (ai) {
        square.id = `${x}${y}`;
        square.addEventListener("click", playerHit);
      } else {
        square.id = `p${x}${y}`;
        square.classList.add("disabled");
      }
      row.append(square);
    });
    game.append(row);
  });
};

const playerGame = document.getElementById("player-game");
const playerGameboard = new Gameboard();
const player = new Player(playerGameboard);
const aiGame = document.getElementById("ai-game");
const aiGameBoard = new Gameboard();
const ai = new Ai(aiGameBoard);

const createShips = () => {
  const ships = [];
  for (let i = 0; i < 5; i++) {
    ships.unshift(new Ship(Math.floor(Math.random() * 2 + 2)));
  }
  ships.map((ship) => {
    ship.orientation = Math.floor(Math.random() * 2);
  });
  return ships;
};

const placeShips = (ships, player) => {
  ships.map((ship) => {
    while (
      !player.gameboard.placeShip(ship, [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ])
    )
      continue;
  });
};

const showPlayerShips = () => {
  player.gameboard.ships.map((coordonates) => {
    document
      .getElementById(`p${coordonates[0]}${coordonates[1]}`)
      .classList.add("player-ship-square");
  });
};

createGame(playerGameboard, playerGame);
createGame(aiGameBoard, aiGame, true);

placeShips(createShips(), player);
placeShips(createShips(), ai);
showPlayerShips();
