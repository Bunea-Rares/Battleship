class Ship {
  constructor(size) {
    this.size = size;
    this.orientation = 0; //0 = x & 1 = y
    this.sunk = false;
    this.coordonates = [];
    this.hits = [];
    this.placed = false;
  }

  changeOrientation() {
    this.orientation = this.orientation ? 0 : 1;
    this.placed
      ? this.coordonates.forEach((coordonate) => {
          let aux = coordonate[0];
          coordonate[0] = coordonate[1];
          coordonate[1] = aux;
          return aux;
        })
      : null;
  }

  hit(hitCoordonates) {
    //check if hitCoordonates matches ship placement coordonates
    return this.coordonates.some((coordonates) =>
      coordonates.every(
        (value, index) => value === parseInt(hitCoordonates[index])
      )
    )
      ? //if so mark the hitsand return true
        this.hits.push(hitCoordonates.map((e) => parseInt(e))) && true
      : //return false
        false;
  }
  isSunk() {
    return this.hits.length === this.coordonates.length
      ? (this.sunk = true && true)
      : false;
  }
}

export default Ship;
