class Player {
  static playersGameboards = [];
  constructor(playerGameboard, enemyGameboard, name) {
    Player.playersGameboards.push(playerGameboard);
    this.playerGameboard = playerGameboard;
    this.enemyGameboard = enemyGameboard;
    this.aiHitsHistory = Array(10)
      .fill(0)
      .map((e) => Array(10).fill(0));
  }
  hitEnemy(x, y) {
    this.enemyGameboard.reciveAttack([x, y]);
  }
  aiHit() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    if (this.aiHitsHistory[x][y] === 0) {
      this.hitEnemy(x, y);
      this.aiHitsHistory[x][y] = 1;
    } else {
      this.aiHit();
    }
  }
  showPlayerShips = () => {
    this.playerGameboard.ships.map((ship) => {
      ship.coordonates.map((coordonate) => {
        const playerSquare = document.getElementById(
          `${"p" + coordonate[0] + coordonate[1]}`
        );
        playerSquare.classList.add("player-ship-square");
      });
    });
  };

  static gamePrep() {
    this.playersGameboards.map((gameboard, index) => {
      gameboard.generateShips();
      gameboard.startPacement();
      !index ? gameboard.createDom("player") : gameboard.createDom("ai");
    });
  }
}

export default Player;
