(function() {
  if (typeof TwentyFortyEight === "undefined") {
    window.TwentyFortyEight = {};
  }

  var Tile = TwentyFortyEight.Tile = function(params) {
    this.board = params.board;
    this.val = params.val || 2;
    this.pos = params.pos || this.randomEmptyPosition();
    this.place();
  };

  Tile.DIRS = {
    "N": new TwentyFortyEight.Coord(-1, 0),
    "S": new TwentyFortyEight.Coord(1, 0),
    "W": new TwentyFortyEight.Coord(0, -1),
    "E": new TwentyFortyEight.Coord(0, 1)
  };

  Tile.prototype.randomPosition = function() {
    return [ Math.floor(Math.random() * this.board.dim),
             Math.floor(Math.random() * this.board.dim)
           ];
  };

  Tile.prototype.randomEmptyPosition = function() {
    var pos = this.randomPosition();
    while (!this.board.isEmpty(pos)) {
      var pos = this.randomPosition();
    }
    var coord = new TwentyFortyEight.Coord(pos[0], pos[1]);
    return coord;
  };

  Tile.prototype.equals = function(otherTile) {
    return this.Tile.val === otherTile.val;
  };

  Tile.prototype.place = function() {
    this.board.place(this, this.pos);
  };

  Tile.prototype.slide = function(dir) {
    var newPos = this.pos;
    while (this.board.onBoard(newPos)) {
      newPos = newPos.plus(Tile.DIRS[dir]);
    }
    this.board.empty(this.pos);
    this.pos = newPos.minus(Tile.DIRS[dir]);
    this.place();
  };
})();
