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

AVUgenOne.prototype.minimize = function() {
  console.log("AVUgenOne minimize");

  var self = this;
  self.animate = false;

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

AVUgenOne.prototype.fullscreen = function() {
  console.log("AVUgenOne fullscreen");

  var self = this;
  self.animate = false;

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

        $('.modal.login')
          .modal('setting', {
            closable  : false,
            transition  : "vertical flip",
            onHide : function() {
              self.minimize().start();
            }
          })
          .modal('show');

          self.scale = self.hotspot.scale;
      });

  return t;
};

AVUgenOne.prototype.modalData = function() {
  var body = "<p>Welcome! You should have received a username/password when you purchsed the 12\" vinyl. Enter those in the 'sign in' option on the left to unlock access to the films online, src code and downloadable software.</p>";
  return {title: "Restricted!", body: body, footer: "watch footer"}
}


