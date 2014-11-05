  var AVUgenThree = function() {
    // Binding
    animations.Animation.apply(this, arguments);
    var self = this;

    // Geometry
    var cWidth = $two.width;

    self.x = $two.width - $two.width/2;
    self.y = $two.height
    self.delay = 1000;

    self.fill = "lightblue";

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
  _.extend(AVUgenThree.prototype, animations.Animation.prototype);
})();

// Animation
AVUgenThree.prototype.begin = function() {
  console.log("AVUgenThree begin");

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

AVUgenThree.prototype.minimize = function() {
  console.log("AVUgenThree minimize");

  var self = this;

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

AVUgenThree.prototype.fullscreen = function() {
  console.log("AVUgenThree fullscreen");

  var self = this;

  var t1Scale = {scale: self.scale};
  var t1TargetScale = {scale: 0.6};

  var t = new TWEEN.Tween(t1Scale)
        .to(t1TargetScale, self.duration)
        .delay(0)
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

          self.scale = self.hotspot.scale;

        })

  return t;
};

AVUgenThree.prototype.modalData = function() {
  return {title: "watch title", body: "watch body", footer: "watch footer"}
}

