(function() {
  if (typeof TwentyFortyEight === "undefined") {
    window.TwentyFortyEight = {};
  }

  var View = TwentyFortyEight.View = function($el) {
    this.$el = $el;
    this.board = new TwentyFortyEight.Board();
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
    if (View.DIRS[event.keyCode]) {
      // more to come
    }
  };

  View.prototype.makeGrid = function() {
    var html = "";
    for (var i = 0; i < this.board.dim; i++) {
      html += "<ul>";
      for (var j = 0; j < this.board.dim; j++) {
        var tile = this.board.get([i, j])
        if (tile) {
          html += "<li class='tile-" + tile.val +  "'></li>";
        } else {
          html += "<li></li>";
        }
      }
      html += "</ul>";
    }
    this.$el.html(html);
    this.$li = this.$el.find("li");
  };
})();
