var animations = {
    Animation: function(audioCtx) {
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
      self.audioCtx = audioCtx;
      self.soundFile = './data/audio/clips/bass.ogg';
      self.oscillatorFrequency = 70;
      self.gainValue = 0.3;
      self.playCount = 0;
      self.hotspot = {};
      self.running = false;

      self.fill = "red";
      self.stroke = "orangered";
      self.linewidth = 5;
      self.scale = 0.1;
      self.opacity = 0.75;
      self.animate = false;
      self.animateTime = 500;


      this.initializeWaveform = function () {
        // create web audio api context
        var audioCtx = self.audioCtx;

        // create Oscillator and gain node
        var oscillator = audioCtx.createOscillator();
        var gainNode = audioCtx.createGain();

        // connect oscillator to gain node to speakers
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        gainNode.gain.value = self.gainValue;

        self.oscillator = oscillator;
        self.gainNode = gainNode;

        // set options for the oscillator
        oscillator.type = 'sine';
        oscillator.frequency.value = self.oscillatorFrequency; // value in hertz

        // start in Webkit or FF
        if (window.webkitAudioContext) {
          oscillator.noteOn(0);
        } else {
          oscillator.start();
        }
      }

      this.start =  function() {
        // console.log("Starting animation..")
        self.begin().start()
        self.running = true;
        self.initializeWaveform();

        setInterval(function(){
          if (self.animate && self.hotspot.fill == "transparent") {
            self.hotspot.fill = self.fill;
            self.gainNode.gain.value = self.gainValue;
          } else {
            if (self.animate) {
              self.hotspot.fill = "transparent";
              self.muteAudio();
            }
          }
        }, self.animateTime);

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

      this.destroyAudio = function () {
        if (window.webkitAudioContext) {
          self.gainNode.disconnect();
          self.oscillator.disconnect();
        } else {
          self.gainNode.disconnect();
        }
      }

      this.muteAudio = function () {
        self.gainNode.gain.value = 0;
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
        if (self.hotspot.scale != 1) {
          self.animate = true;
        }
      }

      this.update = function(frameCount, timeDelta) {
        // this.hotspot.width = $two.width;
      }

      this.resizeModal = function () {
        $(".ui.modal").animate({'margin-top': '10px', 'top': '10px'});
        $(".ui.modal .content").animate({height: $(window).height() - 200});
      }
    }
};
