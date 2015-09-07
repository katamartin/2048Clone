(function() {
  if (typeof TwentyFortyEight === "undefined") {
    window.TwentyFortyEight = {};
  }

  var Board = TwentyFortyEight.Board = function(params) {
    this.dim = params.dim || 4;
    this.makeGrid();
  };

  Board.prototype.makeGrid = function() {
    var grid = new Array(this.dim);
    for (var i = 0; i < this.dim; i++) {
      grid[i] = new Array(this.dim);
    }
    this.grid = grid;
  };

  Board.prototype.isEmpty = function(pos) {
    return !!this.grid[pos[0]][pos[1]];
  };

  Board.prototype.place = function(tile, pos) {
    this.grid[pos.x][pos.y] = tile;
  };
})();
