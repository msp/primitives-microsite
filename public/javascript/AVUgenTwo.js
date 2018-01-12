  var AVUgenTwo = function() {
    // Binding
    animations.Animation.apply(this, arguments);
    var self = this;

    // Geometry
    var cWidth = $two.width;

    self.x = $two.width - $two.width/5;
    self.y = $two.height/3
    self.delay = 500;

    self.fill = "red";
    self.animateTime = 750;
    self.oscillatorFrequency = 60;

    drawGeometry();

    // Utils
    function drawGeometry() {
      var circle = $two.makeCircle(self.x, self.y, cWidth);
      circle.fill = self.fill;
      circle.stroke = self.stroke;
      circle.linewidth = self.linewidth;
      circle.scale = self.scale;
      circle.opacity = self.opacity;

      self.hotspot = circle;
    }

    return this;
};


(function() {
  _.extend(AVUgenTwo.prototype, animations.Animation.prototype);
})();

// Animation
AVUgenTwo.prototype.begin = function() {
  console.log("AVUgenTwo begin");

  var self = this;
  self.animate = false;

  var t1Scale = {scale: self.scale};
  var t1TargetScale = {scale: 0.4};

  var t = new TWEEN.Tween(t1Scale)
          .to(t1TargetScale, self.duration)
          .delay(self.delay)
          .easing(self.easing)
          .onUpdate(function(t) {
            self.hotspot.scale = t1Scale.scale;
          })
          .onComplete(function() {
            self.animate = true;
            self.scale = self.hotspot.scale;
          })

  return t;
};

AVUgenTwo.prototype.minimize = function() {
  console.log("AVUgenTwo minimize");

  var self = this;
  self.animate = false;
  self.hotspot.fill = self.fill;

  var t1Scale = {scale: self.scale};
  var t1TargetScale = {scale: 0.1};

  var t = new TWEEN.Tween(t1Scale)
        .to(t1TargetScale, 500)
        .delay(0)
        .easing(self.easing)
        .onUpdate(function(t) {
          self.hotspot.scale = t1Scale.scale;
        })
        .onComplete(function() {
          self.scale = self.hotspot.scale;
        })

  return t;
};

AVUgenTwo.prototype.fullscreen = function(callback) {
  console.log("AVUgenTwo fullscreen");

  var self = this;

  var t1Scale = {scale: self.scale};
  var t1TargetScale = {scale: 1.0};

  var t = new TWEEN.Tween(t1Scale)
        .to(t1TargetScale, self.duration)
        .delay(0)
        .easing(self.easing)
        .onUpdate(function(t) {
          self.hotspot.scale = t1Scale.scale;
        })
        .onComplete(function() {

          $('.modal.buy')
            .modal('setting', {
              closable  : false,
              transition  : "vertical flip",
              onHide : function() {
                self.minimize().start();
              }
              ,onVisible : function() {
                self.resizeModal();
                callback();
              }
            })
            .modal('show');

          self.scale = self.hotspot.scale;

        })

  return t;
};
