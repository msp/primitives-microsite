  var AVUgenTwo = function() {
    // Binding
    animations.Animation.apply(this, arguments);
    var self = this;

    // Geometry
    var cWidth = two.width;

    self.x = two.width - 200;
    self.y = two.height/3
    self.delay = 500;
    self.animate = false;

    drawGeometry();

    // Utils
    function drawGeometry() {
      var circle = two.makeCircle(self.x, self.y, cWidth);
      circle.fill = 'red';
      circle.stroke = 'orangered';
      circle.linewidth = 5;
      circle.scale = 0.1;
      circle.opacity = 0.75;

      self.hotspot = circle;
    }

    return this;
};


(function() {
  _.extend(AVUgenTwo.prototype, animations.Animation.prototype);
})();

// Animation
// self.tweens[0].chain(self.tweens[1]);
// self.tweens[1].chain(self.tweens[0]);
AVUgenTwo.prototype.update = function(frameCount, timeDelta) {
  if (this.animate) {
    if (frameCount % 3 == 0) {
        this.hotspot.fill = "black";
    } else {
        this.hotspot.fill = "red";
    }
  }
};

AVUgenTwo.prototype.begin = function() {
  console.log("AVUgenTwo begin");

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

AVUgenTwo.prototype.minimize = function() {
  console.log("AVUgenTwo minimize");

  var self = this;

  var t1Scale = {scale: 0.4}
  var t1TargetScale = {scale: 0.1}

  var t = new TWEEN.Tween(t1Scale)
        .to(t1TargetScale, 500)
        .delay(self.delay)
        .easing(self.easing)
        .onUpdate(function(t) {
          self.hotspot.scale = t1Scale.scale;
        })
        .onComplete(function() {
          self.minimizedState = true;
          self.fullscreenState = false;
        })

  return t;
};

AVUgenTwo.prototype.fullscreen = function() {
  console.log("AVUgenTwo fullscreen");

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
        .onComplete(function() {
          $('.buy.modal')
            .modal('show')
            .modal('setting', 'closable', false);

          self.minimizedState = false;
          self.fullscreenState = true;

        })

  return t;
};

