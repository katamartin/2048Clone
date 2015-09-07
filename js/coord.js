(function() {
  if (typeof TwentyFortyEight === "undefined") {
    window.TwentyFortyEight = {};
  }
  var Coord = TwentyFortyEight.Coord = function(x, y) {
    this.x = x;
    this.y = y;
  };

  Coord.prototype.plus = function(other) {
    return new Coord(this.x + other.x, this.y + other.y);
  };

  Coord.prototype.equals = function(other) {
    return this.x === other.x && this.y === other.y;
  };

  Coord.prototype.minus = function(other) {
    return new Coord(this.x - other.x, this.y - other.y);
  };
})();
