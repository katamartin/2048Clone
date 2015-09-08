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
    return this.val === otherTile.val;
  };

  Tile.prototype.matchingNeighbor = function() {
    var dirs = Object.keys(Tile.DIRS);
    for (var i = 0; i < 4; i++) {
      var newPos = this.pos.plus(Tile.DIRS[dirs[i]]);
      if (this.board.onBoard(newPos)) {
        var tile = this.board.get([newPos.x, newPos.y]);
        if (tile && this.equals(tile)) {
          return true;
        }
      }
    }
    return false;
  };

  Tile.prototype.place = function() {
    this.board.place(this, this.pos);
    var tileEl = $("<div></div>");
    $(".game-board div").eq(0).append(tileEl);
    tileEl.addClass(this.className());
    tileEl.addClass("new");
    this.$el = tileEl;
  };

  Tile.prototype.slide = function(dir) {
    var newPos = this.pos.plus(Tile.DIRS[dir]);
    while (this.board.onBoard(newPos)) {
      if (this.board.isEmpty([newPos.x, newPos.y])) {
        newPos = newPos.plus(Tile.DIRS[dir]);
      } else {
        var tile = this.board.get([newPos.x, newPos.y]);
        if (tile.equals(this) && !tile.collapsed) {
          this.collapse(tile);
          newPos = newPos.plus(Tile.DIRS[dir]);
        }
        break;
      }
    }
    this.board.empty(this.pos);
    this.pos = newPos.minus(Tile.DIRS[dir]);
    this.board.place(this, this.pos);
    this.updateClasses();
  };

  Tile.prototype.updateClasses = function() {
    this.$el.removeClass();
    this.$el.addClass(this.className());
  };

  Tile.prototype.className = function() {
    var name = "pos-" + this.pos.x + "-" + this.pos.y + " tile-" + this.val;
    if (this.collapsed) {
      name += " collapsed";
    }
    return name;
  };

  Tile.prototype.collapse = function(tile) {
    tile.$el.remove();
    this.val *= 2;
    this.board.score += this.val;
    this.collapsed = true;
    if (this.val === 2048) {
      this.board.won = true;
    }
  };
})();
