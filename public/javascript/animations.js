var animations = {
    Animation: function() {
      var self = this;
      var factor = 1500;
      self.x = 100;
      self.y = 100;
      self.duration = factor/2;
      self.durationDivisor = 1;
      self.delay = 0;
      self.easing = TWEEN.Easing.Elastic.InOut;
      self.tweens = [];
      self.group = {};
      self.soundFile = './data/audio/clips/bass.ogg';
      self.playCount = 0;
      self.hotspot = {};
      self.running = false;

      this.start =  function() {
        // self.sound = new Sound(self.soundFile, self.tweens[0].start());
        self.tweens[0].start()
        console.log("Starting animation..")
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
        console.log(self.running);
        self.running == true ? self.stop() : self.start();
      }

      this.play = function(options) {
        self.playCount += 1;
        // self.sound.play(options);
      }

      this.randomUpTo = function(max) {
        return Math.floor((Math.random() * max) + 1);
      }

      this.randomY = function() {

      }
    }
};
