$(document).ready(function() {
  // globals
  $window = $(window);
  $two = new Two({
    fullscreen: false,
    width: $window.width(),
    height: $window.height(),
    autostart: true
  }).appendTo(document.getElementById("two-js-container"));

  $audioCtx = new(window.AudioContext || window.webkitAudioContext)();

  // geometry
  var $info, $buy, $work;

  // two.js
  initializeScene();
  $two.bind('update', animationLoop).play();
  watchForWindowResize();
  routeRequest();

  // utils
  function initializeScene() {
    $watch = new AVUgenOne($audioCtx);
    $buy = new AVUgenTwo($audioCtx);
    $info = new AVUgenThree($audioCtx);

    console.log("$two renderer: ");
    console.log($two.renderer);
    console.log("$two w: " + $two.width + " height: " + $two.height);

    $two.renderer.setSize($window.width(), $window.height());
    $two.width = $window.width();
    $two.height = $window.height();

    // Update the renderer in order to generate corresponding DOM Elements.
    $two.update();

    $info.toggleStart();
    $buy.toggleStart();
    $watch.toggleStart();

    bindEventHandlers($info, $buy, $watch);
  }

  function animationLoop(frameCount, timeDelta) {
    // console.log(frameCount+" : "+timeDelta);
    // console.log(""); at some point this made the animation smoother?!
    TWEEN.update();
    $info.update(frameCount, timeDelta);
    $buy.update(frameCount, timeDelta);
    $watch.update(frameCount, timeDelta);
  }

  function watchForWindowResize() {
    $window
      .bind('resize', function() {
        console.log("WINDOW RESIZE w: " + $window.width() + " height: " + $window.height());
        $info.destroyAudio();
        $buy.destroyAudio();
        $watch.destroyAudio();

        $two.clear();

        initializeScene();
        $info.resizeModal();
      });
  }

  function pauseAnimation() {
    console.log("pauseAnimation");

    $info.muteAudio();
    $buy.muteAudio();
    $watch.muteAudio();

    $info.animate = false;
    $buy.animate = false;
    $watch.animate = false;

  }

  function bindEventHandlers(info, buy, watch) {
    // watch
    window.onhashchange = routeRequest;

    // SVG hotspots
    $(info.hotspot._renderer.elem)
      .css('cursor', 'pointer')
      .click(function(e) {
        infoFullscreen();
      });

    $(info.hotspot._renderer.elem)
      .css('cursor', 'pointer')
      .hover(info.hoverOn, info.hoverOff);

    $(buy.hotspot._renderer.elem)
      .css('cursor', 'pointer')
      .click(function(e) {
        buyFullscreen();
      });

    $(buy.hotspot._renderer.elem)
      .css('cursor', 'pointer')
      .hover(buy.hoverOn, buy.hoverOff);

    $(watch.hotspot._renderer.elem)
      .css('cursor', 'pointer')
      .click(function(e) {
        watchFullscreen();
      });

    $(watch.hotspot._renderer.elem)
      .css('cursor', 'pointer')
      .hover(watch.hoverOn, watch.hoverOff);

  }

  function getRandomColor() {
    return 'rgb(' +
      Math.floor(Math.random() * 255) + ',' +
      Math.floor(Math.random() * 255) + ',' +
      Math.floor(Math.random() * 255) + ')';
  }

  function routeRequest() {
    switch (location.hash) {
      case "#info":
        infoFullscreen();
        break;
      case "#buy":
        buyFullscreen();
        break;
      case "#watch":
        watchFullscreen();
        break;
    }
  }

  function infoFullscreen() {
    $info.animate = false;
    var driver = $buy.minimize();
    driver.chain($watch.minimize().chain($info.fullscreen(pauseAnimation)));
    driver.start();
    location.hash = "#info";
    ga('send', 'pageview', location.pathname + location.hash);
  }

  function buyFullscreen() {
    $buy.animate = false;
    var driver = $info.minimize();
    driver.chain($watch.minimize().chain($buy.fullscreen(pauseAnimation)));
    driver.start();
    location.hash = "#buy";
    ga('send', 'pageview', location.pathname + location.hash);
  }

  function watchFullscreen() {
    $watch.animate = false;
    var driver = $info.minimize();
    driver.chain($buy.minimize().chain($watch.fullscreen(pauseAnimation)));
    driver.start();
    location.hash = "#watch";
    ga('send', 'pageview', location.pathname + location.hash);
  }
});
