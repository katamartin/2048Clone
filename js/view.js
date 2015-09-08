(function() {
  if (typeof TwentyFortyEight === "undefined") {
    window.TwentyFortyEight = {};
  }

  var View = TwentyFortyEight.View = function($el) {
    this.$el = $el;
    this.board = new TwentyFortyEight.Board({});
    this.makeGrid();
    $(window).on("keydown", this.handleKeyEvent.bind(this));
  };

  View.DIRS = {
    38: "N",
    39: "E",
    40: "S",
    37: "W"
  };

  View.prototype.handleKeyEvent = function(event) {
    event.preventDefault();
    if (View.DIRS[event.keyCode] && !this.board.isOver()) {
      var dir = View.DIRS[event.keyCode];
      this.updateBoard(dir);
    }
    if (this.board.isOver()) {
      this.gameOver();
    }
  };

  View.prototype.updateBoard = function (dir) {
    this.board.forEach().call(this.board, function(tile) {
      tile.collapsed = false;
    });
    this.board.forEach(dir).call(this.board, function(tile) {
      tile.slide(dir);
    });
    if (!this.board.isFull()) {
      this.board.addTiles(1);
    }
    this.updateScore();
  };

  View.prototype.gameOver = function() {
    var $over = $("<div class='message'>Game Over</div>");
    this.$el.append($over);
  };

  View.prototype.updateScore = function() {
    $(".score").html(this.board.score);
  };

  View.prototype.forEach = function(callback) {
    this.grid.forEach(function(row) {
      row.forEach(function(el) {
        if (el) {
          callback(el);
        }
      });
    });
  };

  // View.prototype.makeGrid = function() {
  //   var html = "";
  //   for (var i = 0; i < this.board.dim; i++) {
  //     html += "<ul>";
  //     for (var j = 0; j < this.board.dim; j++) {
  //       var tile = this.board.get([i, j]);
  //       if (tile) {
  //         html += "<li class='tile-" + tile.val +  "'>" + tile.val +  "</li>";
  //       } else {
  //         html += "<li></li>";
  //       }
  //     }
  //     html += "</ul>";
  //   }
  //   this.$el.html(html);
  //   this.$li = this.$el.find("li");
  // };

  View.prototype.makeGrid = function() {
    var html = $("<div></div>");
    for (var i = 0; i < this.board.dim; i++) {
      var ul = $("<ul></ul>");
      html.append(ul);
      for (var j = 0; j < this.board.dim; j++) {
        var tile = this.board.get([i, j]);
        var li = ul.append("<li></li>");
        if (tile) {
          var tileEl = $("<div></div>");
          tileEl.addClass(tile.className());
          tile.$el = tileEl;
          html.append(tileEl);
        }
      }
    }
    this.$el.html(html);
  };
})();
