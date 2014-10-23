  var AVUgenOne = function() {
    // Binding
    animations.Animation.apply(this, arguments);
    var self = this;

    // Geometry
    var cWidth = 500;
    var rWidth = 20;

    self.x = two.width/5
    self.y = two.height/3
    self.duration = 5000;

    drawGeometry();

    var t1Scale = {scale: 0.1}
    var t1TargetScale = {scale: 0.9}

    var t2Scale = {scale: 0.9}
    var t2TargetScale = {scale: 0.1}

    var position = { x : 0, y: 300 };
    var target = { x : 400, y: 50 };

    // Animation
    self.tweens.push(
      new TWEEN.Tween(t1Scale)
            .to(t1TargetScale, self.duration)
            .delay(self.delay)
            .easing(self.easing)
            .onUpdate(function(t) {
              // console.log(originalScale.scale)
              // self.hotspot.translation.set(position.x, position.y);
              self.hotspot.scale = t1Scale.scale;
            })
            .onComplete(function() {
              // self.play({semitones: -6});
              // self.tweens[1].start();
            })
      ,new TWEEN.Tween(t2Scale)
            .to(t2TargetScale, self.duration)
            .delay(self.delay)
            .easing(self.easing)
            .onUpdate(function(t) {
              // console.log(originalScale.scale)
              // self.hotspot.translation.set(position.x, position.y);
              self.hotspot.scale = t2Scale.scale;
            })
            .onComplete(function() {
              // self.play({semitones: -6});
              // self.tweens[1].start();
            })
    );

    // self.tweens[0].chain(self.tweens[1]);
    // self.tweens[1].chain(self.tweens[0]);

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

    // function update(frameCount, timeDelta) {
    //   if (frameCount % 2 == 0) {
    //       self.hotspot.fill = "white";
    //   } else {
    //       self.hotspot.fill = "#FF8000";
    //   }
    // };

    return this;
};


(function() {
  _.extend(AVUgenOne.prototype, animations.Animation.prototype);
})();
