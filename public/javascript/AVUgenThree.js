  var AVUgenThree = function() {
    // Binding
    animations.Animation.apply(this, arguments);
    var self = this;

    // Geometry
    var cWidth = $two.width - $two.width/4;

    self.x = $two.width - $two.width/2;
    self.y = $two.height - $two.height/2;
    self.delay = 1000;

    self.fill = "lightblue";
    self.animateTime = 1000;

    self.oscillatorFrequency = 500;
    self.gainValue = 0.05;

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
  self.animate = false;
  self.hotspot.fill = self.fill;

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

AVUgenThree.prototype.fullscreen = function(callback) {
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

          $('.modal.main')
            .modal('setting', {
              closable  : false
              ,transition  : "vertical flip"
              ,onHide : function() {
                self.minimize().start();
              }
              ,onVisible : function() {
                self.resizeModal();
                callback();
              }
            })
            .modal('show');

          self.scale = self.hotspot.scale;

        })

  return t;
};

AVUgenThree.prototype.modalData = function() {
  body = "";
  body += "<p class=\"danni\">Our world, ultimately, is reducible to parameters – geometry, brightness, loudness.</p>";
  body += "<p class=\"danni\">But just as a storm is more than the combined force of water and electricity, Primitives calls to mind not just the basic physics of primal forms, but also the spectator’s inevitably subjective perception of these.</p>";
  body += "<p class=\"danni\">Spatial’s custom-built software controls invite chance. Playing permutation, shapes and hues not only expand and contract across space, but also through time. 2D becomes 3D as the dynamic of control and abandon - much like the earth’s own magnetism – shimmers and fluctuates. Primitives reminds us that through the tension between coded energies and human agency can be perceived a space of becoming.</p>";
  body += "<p>Danni Zuvela, 2014</p>";

  body += "<div class=\"pr\"><p>'Primitives' was born when Spatial devised a performative installation of light and sound by coding his own software, exploring the OpenFrameworks platform. ";
  body += "Influenced by the likes of Sally Golding, Bruce McClure and Greg Pope, he sought to investigate a similar materiality of light, sound and space manifested via the digital domain, to ";
  body += "\"explore sonic and optical intensity articulated by simple geometric figures and extreme frequencies.\" He continues: \"Projected images drive a sensory assault, consumed by your eyes, then ears, and existing somewhere between perceptions.' Elsewhere in his manifesto he states that he’s 'interrogating hacked code for excruciating light' and that it 'brings a new realisation to the relationships between seeing sound and hearing colour.\"</p>";

  body += "<p>‘Primitives’ has made live appearances at Cafe OTO & Apiary Studios in London and Supernormal Festival in Oxfordshire building the piece to its current form via a variety of evolutionary configurations, developing from the initial single screen staging to an expanded setup that fully inhabits that performance space. ";
  body += "The logical next step is to release it to the wider world in some shape – the work itself, Spatial’s software that created it and the underlying code to hack the project. But how does a producer and DJ release these related strands into a coherent package that envelops the project’s handmade, atavistic blossoming, both visual and aural? How could that blend with his prior output? And fundamentally, who would be mad enough to pull it all together? Step forward Broken20, the Glasgow label founded on \"an aesthetic, not a genre – releases concerned with decay, erosion, entropy, mistakes and errors, line noise and tape hiss, hum and buzz\". And as Broken20’s first foray into vinyl following a multi-format splurge of tapes, DVDs and custom made USB sticks it made sense to collaborate on a 12\" that was more than just a slab of wax. </p>";

  body += "<p>So we have ‘Primitives’, a DVD containing short films of live A/V content alongside an executable version of the software and the source code plus a 12” record containing four commissioned interpretations by Spatial himself, Broken20’s TVO, Bass Clef and Sculpture aimed somewhat more at the dancefloor. The combination of media represent the totality of the ‘Primitives’ experience. The DVD contains a series of live, improvised audiovisual art works under two distinct sections: Single Channel & Expanded. </p>";

  body += "<p>The Single Channel works are most revealing of the performance process and the underlying software. These screen recordings highlight each sequence as a composition of four AVUgens - base units combining visual representation and its effecting properties on the accompanying sonic component. Deliberately simple relationships, such as a polygon interacting with a sine wave, animate, coalesce and interplay to create an immersive sensory experience. </p>"

  body += "<p>The Expanded section takes this technical setup and explores the relationship and geometry of light and sound inhabiting a performance space. Recorded live using various cameras and segmented into a number of short visual works, these films liberate the software from its digital domain to focus on the material aspects of the output within an architecture. Embracing the ensuing degradation of the stylised visual perfection into hacked light, the audio is freed to breathe deep within three dimensions, enjoying the implicit bit crushing and dithering that occurs as it’s captured through the camera’s built in microphones. </p></div>"

  return {title: "Primitives", body: body, footer: "info footer"}
}

