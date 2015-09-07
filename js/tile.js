(function() {
  if (typeof TwentyFortyEight === "undefined") {
    window.TwentyFortyEight = {};
  }

  var Tile = TwentyFortyEight.Tile = function(params) {
    this.board = params.board;
    this.val = params.val || 2;
    this.pos = params.pos || this.randomEmptyPosition();
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
    return new TwentyFortyEight.Coord(pos[0], pos[1]);
  };

  Tile.prototype.equals = function(otherTile) {
    return this.Tile.val === otherTile.val;
  };

  Tile.prototype.place = function() {
    this.board.place(this, this.pos);
  };
})();
