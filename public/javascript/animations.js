var animations = {
    Animation: function() {
      var self = this;
      var factor = 1500;
      self.x = 100;
      self.y = 100;
      self.duration = 1000;
      self.durationDivisor = 1;
      self.delay = 0;
      // self.easing = TWEEN.Easing.Elastic.InOut;
      self.easing = TWEEN.Easing.Linear.None;
      self.tweens = [];
      self.group = {};
      self.soundFile = './data/audio/clips/bass.ogg';
      self.playCount = 0;
      self.hotspot = {};
      self.running = false;

      self.fill = "red";
      self.stroke = "orangered";
      self.linewidth = 5;
      self.scale = 0.1;
      self.opacity = 0.75;


      this.start =  function() {
        // self.sound = new Sound(self.soundFile, self.tweens[0].start());
        // console.log("Starting animation..")
        self.begin().start()
        self.running = true;
        return this;
      }

      this.stop =  function() {
        self.tweens.forEach(function(element, index, array){
          self.tweens[index].stop()
        })
        self.running = false;
        return this;
      }

      this.toggleStart = function() {
        self.running == true ? self.stop() : self.start();
      }

      this.play = function(options) {
        self.playCount += 1;
        // self.sound.play(options);
      }

      this.randomUpTo = function(max) {
        return Math.floor((Math.random() * max) + 1);
      }

      this.randomY = function() {}

      this.hoverOn = function() {
        self.animate = false;
        self.hotspot.fill = self.fill;
      }

      this.hoverOff = function() {
        if (!self.fullscreenState) {
          self.animate = true;
        }
      }

      this.update = function(frameCount, timeDelta) {
        // this.hotspot.width = $two.width;
        if (this.animate) {
          if (frameCount % 5 == 0) {
              this.hotspot.fill = "black";
          } else {
              this.hotspot.fill = this.fill;
          }
        }
      }

      this.resizeModal = function () {
        $(".ui.modal").animate({'margin-top': '10px', 'top': '10px'});
        $(".ui.modal .content").animate({height: $(window).height() - 200});
      }
    }
};
