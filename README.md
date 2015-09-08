# 2048 Game
[Live Link][live]

[live]: http://katamartin.github.io/2048Clone/html/index.html


## Summary

A JavaScript game replicating Gabriele Cirulli's viral hit. Using the arrow
keys, tiles are slid around a 4-by-4 grid, merging when two tiles of equal
value collide. The game is won by merging until 2048 is reached.

## Direction-Specific Iterators

To mimic the tilting of the board, tiles are iterated through in different
orders depending on the arrow key pressed:
```
Board.prototype.forEach = function(dir) {
  var iterators = {
    "N": Board.prototype.toNorth,
    "S": Board.prototype.toSouth,
    "W": Board.prototype.toWest,
    "E": Board.prototype.toEast
  };
  return iterators[dir] || iterators["N"];
};
```
For example, moving the board `toSouth` requires "South"-most tiles to be slid
first, before tiles below pile up at the bottom of the grid. This requires the
rows to be iterated through in reverse order:

```
Board.prototype.toSouth = function(callback) {
  for (var i = this.dim - 1; i >= 0; i--) {
    for (var j = 0; j < this.dim; j++) {
      if (this.get([i, j])) {
        callback(this.get([i, j]));
      }
    }
  }
};
```

## Gameplay
![play]

[play]: ./game_play.gif
