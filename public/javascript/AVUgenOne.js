  var AVUgenOne = function() {
    // Binding
    animations.Animation.apply(this, arguments);
    var self = this;

    // Geometry
    var cWidth = 50;
    var rWidth = 20;
    drawGeometry();

    // Animation
    self.tweens.push(
      new TWEEN.Tween(self.group.translation)
            .to({ x: two.width - 2*rWidth, y: "+50"}, self.duration)
            .delay(self.delay)
            // .easing(self.easing)
            .onUpdate(function(t) {
              self.group.rotation = Math.PI * 2 * t;
            })
            .onComplete(function() {
              self.play({semitones: -6});
              self.tweens[1].start();
            })
      ,new TWEEN.Tween(self.group.translation)
            .to({x: 0}, self.duration/self.durationDivisor)
            .delay(self.delay)
            // .easing(TWEEN.Easing.Elastic.In)
            .onUpdate(function(t) {
              self.group.rotation = Math.PI * 2 * t;
            })
            .onComplete(function() {
              self.play({semitones: -12});
              self.tweens[0].start();
            })

    );

    // Utils
    function drawGeometry() {
      var circle = two.makeCircle(0, 0, cWidth);
      self.hotspot = circle;
      var rect = two.makeRectangle(cWidth*2, 0, rWidth, rWidth);
      var rect2 = two.makeRectangle(1-cWidth*2, 0, rWidth, rWidth);
      var rect3 = two.makeRectangle(0, cWidth*2, rWidth, rWidth);
      var rect4 = two.makeRectangle(0, 1-cWidth*2, rWidth, rWidth);
      var line = two.makeLine(0, 0, 100, 0);
      var line2 = two.makeLine(0, 0, 0, 100);
      var line3 = two.makeLine(0, 0, -100, 0);
      var line4 = two.makeLine(0, 0, 0, -100);

      circle.fill = '#FF8000';
      rect.fill = 'rgba(0, 200, 255, 0.75)';
      rect2.fill = rect3.fill = rect4.fill = rect.fill;

      self.group = two.makeGroup(circle, rect, rect2, line, line2, line3, line4, rect3, rect4);
      self.group.translation.set(self.x, self.y);
      self.group.scale = 0.9;
      self.group.stroke = "white";
    }
    return this;
};


(function() {
  _.extend(AVUgenOne.prototype, animations.Animation.prototype);
})();
