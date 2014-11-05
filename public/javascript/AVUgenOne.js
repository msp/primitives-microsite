  var AVUgenOne = function() {
    // Binding
    animations.Animation.apply(this, arguments);
    var self = this;

    // Geometry
    var cWidth = $two.width;

    self.x = $two.width/5
    self.y = $two.height/3

    self.fill ='#FF8000';

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
  _.extend(AVUgenOne.prototype, animations.Animation.prototype);
})();

// Animation
AVUgenOne.prototype.begin = function() {
  console.log("AVUgenOne begin");

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
          .onComplete(function() {
            self.animate = true;
          })

  return t;
};

AVUgenOne.prototype.minimize = function() {
  console.log("AVUgenOne minimize");

  var self = this;
  self.animate = false;

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

AVUgenOne.prototype.fullscreen = function() {
  console.log("AVUgenOne fullscreen");

  var self = this;
  self.animate = false;

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
      });

  return t;
};

AVUgenOne.prototype.modalData = function() {
  body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tempor arcu, quis hendrerit nunc accumsan quis. In ut dolor metus, eget viverra odio. Quisque sed suscipit leo. Curabitur dictum magna ut turpis interdum a mollis nunc condimentum. Praesent leo est, hendreriteget condimentum sit amet, placerat adipiscing neque. Curabitur id metus tellus, sed semper odio. Phasellus id justo ante, vel bibendum eros. Nulla suscipit felis eget erat iaculis et aliquam turpis consequat. Nunc posuere mollis tellus sit amet dapibus. Praesent sagittis quam sit amet mauris venenatis in dignissim purus dapibus."
  return {title: "Primitives", body: body, footer: "info footer"}
}


