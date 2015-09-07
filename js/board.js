(function() {
  if (typeof TwentyFortyEight === "undefined") {
    window.TwentyFortyEight = {};
  }

  var Board = TwentyFortyEight.Board = function(params) {
    this.dim = params.dim || 4;
    this.makeGrid();
    new TwentyFortyEight.Tile({board: this});
    new TwentyFortyEight.Tile({board: this});
  };

  Board.prototype.makeGrid = function() {
    var grid = new Array(this.dim);
    for (var i = 0; i < this.dim; i++) {
      grid[i] = new Array(this.dim);
    }
    this.grid = grid;
  };

  Board.prototype.isEmpty = function(pos) {
    return !this.grid[pos[0]][pos[1]];
  };

  Board.prototype.place = function(tile, coord) {
    this.grid[coord.x][coord.y] = tile;
  };

  Board.prototype.get = function(pos) {
    return this.grid[pos[0]][pos[1]];
  };

  Board.prototype.isFull = function() {
    for (var i = 0; i < this.dim; i++) {
      for (var j = 0; j < this.dim; j++) {
        if (!this.grid[i][j]) {
          return false;
        }
      }
    }
    return true;
  };
})();
