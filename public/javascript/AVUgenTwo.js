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

  var t1Scale = {scale: 0.1}
  var t1TargetScale = {scale: 0.4}

  var t = new TWEEN.Tween(t1Scale)
          .to(t1TargetScale, self.duration)
          .delay(self.delay)
          .easing(self.easing)
          .onUpdate(function(t) {
            self.hotspot.scale = t1Scale.scale;
          })
          .onComplete(function() {
            self.animate = true;
          })

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

          Session.set("modal", self.modalData());

          $('.modal')
            .modal('setting', {
              closable  : false,
              transition  : "vertical flip",
              onHidden : function() {
              }
            })
            .modal('show');

          self.minimizedState = false;
          self.fullscreenState = true;

        })

  return t;
};

AVUgenTwo.prototype.modalData = function() {
  return {title: "buy title", body: "buy body", footer: "buy footer"}
}

