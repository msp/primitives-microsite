  var AVUgenOne = function() {
    // Binding
    animations.Animation.apply(this, arguments);
    var self = this;

    // Geometry
    var cWidth = two.width;

    self.x = two.width/5
    self.y = two.height/3
    self.animate = false;

    drawGeometry();

    // Utils
    function drawGeometry() {
      var circle = two.makeCircle(self.x, self.y, cWidth);
      circle.fill = '#FF8000';
      circle.stroke = 'orangered';
      circle.linewidth = 5;
      circle.scale = 0.1;
      circle.opacity = 0.75;

      self.hotspot = circle;
    }

    return this;
};


(function() {
  _.extend(AVUgenOne.prototype, animations.Animation.prototype);
})();

// Animation
// self.tweens[0].chain(self.tweens[1]);
// self.tweens[1].chain(self.tweens[0]);
AVUgenOne.prototype.update = function(frameCount, timeDelta) {
  if (this.animate) {
    if (frameCount % 3 == 0) {
        this.hotspot.fill = "black";
    } else {
        this.hotspot.fill = "#FF8000";
    }
  }
};

AVUgenOne.prototype.begin = function() {
  console.log("start");

  var self = this;

  var t1Scale = {scale: 0.1}
  var t1TargetScale = {scale: 0.4}

  var t = new TWEEN.Tween(t1Scale)
          .to(t1TargetScale, self.duration)
          .delay(self.delay)
          .easing(self.easing)
          .onUpdate(function(t) {
            self.hotspot.scale = t1Scale.scale;
          })
          .onComplete(function() {})

  return t;
};

AVUgenOne.prototype.minimize = function() {
  console.log("minimize");

  var self = this;

  var t1Scale = {scale: 0.9}
  var t1TargetScale = {scale: 0.1}

  var t = new TWEEN.Tween(t1Scale)
        .to(t1TargetScale, self.duration)
        .delay(self.delay)
        .easing(self.easing)
        .onUpdate(function(t) {
          self.hotspot.scale = t1Scale.scale;
        })
        .onComplete(function() {})

  return t;
};

AVUgenOne.prototype.fullscreen = function() {
  console.log("fullscreen");

  var self = this;

  var t1Scale = {scale: 0.4}
  var t1TargetScale = {scale: 0.6}

  var t = new TWEEN.Tween(t1Scale)
        .to(t1TargetScale, self.duration)
        .delay(self.delay)
        .easing(self.easing)
        .onUpdate(function(t) {
          self.hotspot.scale = t1Scale.scale;
        })
        .onComplete(function() {})
  return t;
};

