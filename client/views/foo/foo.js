Template['foo'].helpers({
    modalTitle: function () {
      return Session.get("modal").title;
    }
    ,modalBody: function () {
      return Session.get("modal").body;
    }
    ,modalFooter: function () {
      return Session.get("modal").footer;
    }
});

Template['foo'].events({
});

// JavaScript
if (Meteor.isClient) {

  Template.foo.rendered = function () {
    // globals
    $window = $(window);
    $two = new Two({
      fullscreen: false
      ,width: $window.width()
      ,height: $window.height()
      ,autostart: true
    }).appendTo(document.getElementById("two-js-container"));

    // geometry
    var $info, $buy, $work;

    // two.js
    initializeScene();
    $two.bind('update', animationLoop).play();
    watchForWindowResize();

    // utils
    function initializeScene() {
      $watch = new AVUgenOne();
      $buy = new AVUgenTwo();
      $info = new AVUgenThree();

      console.log("$two renderer: ");
      console.log($two.renderer);
      console.log("$two w: "+$two.width+" height: "+$two.height);

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
          console.log("WINDOW RESIZE w: "+$window.width()+" height: "+$window.height());
          $two.clear();

          initializeScene();
          $info.resizeModal();
        });
    }

    function pauseAnimation() {
      console.log("pauseAnimation");
      $info.animate = false;
      $buy.animate = false;
      $watch.animate = false;

    }

    function bindEventHandlers(info, buy, watch) {

      // Util
      function infoFullscreen() {
        info.animate = false;
        var driver = buy.minimize();
        driver.chain(watch.minimize().chain(info.fullscreen(pauseAnimation)));
        driver.start();
        location.hash = "#info";
      }

      function buyFullscreen() {
        buy.animate = false;
        var driver = info.minimize();
        driver.chain(watch.minimize().chain(buy.fullscreen(pauseAnimation)));
        driver.start();
        location.hash = "#buy";
      }

      function watchFullscreen() {
        watch.animate = false;
        var driver = info.minimize();
        driver.chain(buy.minimize().chain(watch.fullscreen(pauseAnimation)));
        driver.start();
        location.hash = "#watch";
      }

      // URL triggers
      function locationHashChanged() {
          if (location.hash === "#info") {
              infoFullscreen();
          } else if (location.hash === "#buy") {
              buyFullscreen();
          } else if (location.hash === "#watch") {
              watchFullscreen();
          }
      }

      // watch
      window.onhashchange = locationHashChanged;


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
        return 'rgb('
          + Math.floor(Math.random() * 255) + ','
          + Math.floor(Math.random() * 255) + ','
          + Math.floor(Math.random() * 255) + ')';
    }
  };
}
