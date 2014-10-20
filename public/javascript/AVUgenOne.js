  var AVUgenOne = function() {
    // Binding
    animations.Animation.apply(this, arguments);
    var self = this;

    // Geometry
    var cWidth = 500;
    var rWidth = 20;

    self.x = two.width/5
    self.y = two.height/3
    self.duration = 500;

    drawGeometry();

    // Animation
    self.tweens.push(
      new TWEEN.Tween(self.hotspot.scale)
            // .to({ scale: 0.5 }, self.duration) // not sure how this works?
            .delay(self.delay)
            .easing(self.easing)
            .onUpdate(function(t) {
              self.hotspot.scale += 0.05;
            })
            .onComplete(function() {
              // self.play({semitones: -6});
              // self.tweens[1].start();
            })
    );

    // Utils
    function drawGeometry() {
      var circle = two.makeCircle(self.x, self.y, cWidth);
      circle.fill = '#FF8000';
      circle.stroke = 'orangered';
      circle.linewidth = 5;
      circle.scale = 0.1;
      circle.opacity = 0.75;

      // self.group = two.makeGroup(circle);
      // self.group.translation.set(self.x, self.y);
      // self.group.scale = 0.1;
      // self.group.stroke = "white";

      self.hotspot = circle;
    }

    function update(frameCount, timeDelta) {
      if (frameCount % 2 == 0) {
          self.hotspot.fill = "white";
      } else {
          self.hotspot.fill = "#FF8000";
      }
    };

    return this;
};


(function() {
  _.extend(AVUgenOne.prototype, animations.Animation.prototype);
})();
