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

  Board.prototype.forEach = function(dir) {
    var iterators = [
      "N": Board.prototype.toNorth,
      "S": Board.prototype.toSouth,
      "W": Board.prototype.toWest,
      "E": Board.prototype.toEast
    ];
    return iterators[dir] || iterators["N"];
  };

  Board.prototype.toNorth = function(callback) {
    for (var i = 0; i < this.dim; i++) {
      for (var j = 0; j < this.dim; j++) {
        if (this.get([i, j])) {
          callback(this.get[i, j]);
        }
      }
    }
  };

  Board.prototype.toSouth = function(callback) {
    for (var i = this.dim - 1; i >= 0; i--) {
      for (var j = 0; j < this.dim; j++) {
        if (this.get([i, j])) {
          callback(this.get[i, j]);
        }
      }
    }
  };

  Board.prototype.toWest = function(callback) {
    for (var j = 0; j < this.dim; j++) {
      for (var i = 0; i < this.dim; i++) {
        if (this.get([i, j])) {
          callback(this.get[i, j]);
        }
      }
    }
  };

  Board.prototype.toEast = function(callback) {
    for (var j = this.dim - 1; j >= 0; j--) {
      for (var i = 0; i < this.dim; i++) {
        if (this.get([i, j])) {
          callback(this.get[i, j]);
        }
      }
    }
  };
})();
