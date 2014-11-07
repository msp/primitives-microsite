  var AVUgenThree = function() {
    // Binding
    animations.Animation.apply(this, arguments);
    var self = this;

    // Geometry
    var cWidth = $two.width;

    self.x = $two.width - $two.width/2;
    self.y = $two.height - $two.height/2;
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
  var t1TargetScale = {scale: 1.0};

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
              onHide : function() {
                self.minimize().start();
              }
            })
            .modal('show');

          self.scale = self.hotspot.scale;

        })

  return t;
};

AVUgenThree.prototype.modalData = function() {
  body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tempor arcu, quis hendrerit nunc accumsan quis. In ut dolor metus, eget viverra odio. Quisque sed suscipit leo. Curabitur dictum magna ut turpis interdum a mollis nunc condimentum. Praesent leo est, hendreriteget condimentum sit amet, placerat adipiscing neque. Curabitur id metus tellus, sed semper odio. Phasellus id justo ante, vel bibendum eros. Nulla suscipit felis eget erat iaculis et aliquam turpis consequat. Nunc posuere mollis tellus sit amet dapibus. Praesent sagittis quam sit amet mauris venenatis in dignissim purus dapibus."
  return {title: "Primitives", body: body, footer: "info footer"}
}

