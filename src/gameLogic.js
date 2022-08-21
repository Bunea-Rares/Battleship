import Gameboard from "./Gameboard.js";
import Player from "./Player.js";

const aiGameBoard = new Gameboard("ai");
const playerGameboard = new Gameboard("player");
const player = new Player(playerGameboard, aiGameBoard);
const ai = new Player(aiGameBoard, playerGameboard);
Player.gamePrep();
player.showPlayerShips();

let gameStatus = false;

const resetShips = document.getElementById("reset-ships");
const restart = document.getElementById("restart");
const start = document.getElementById("start");

start.addEventListener("click", () => {
  gameStatus = true;
  startGame();
  msg.innerText = "Game is going";
});

const startGame = () => {
  const enemyGameboardDom = document.getElementById("ai");
  [...enemyGameboardDom.childNodes].slice(2).map((row) => {
    [...row.childNodes].map((square) => {
      square.addEventListener("click", (e) => {
        player.enemyGameboard.reciveAttack(e.target.id.slice(1).split(""));
        ai.aiHit();
      });
    });
  });
};
