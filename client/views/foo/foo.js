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
    // geometry
    var $info, $buy;

    // two.js
    initializeScene();
    $two.bind('update', animationLoop).play();
    watchForWindowResize();

    // utils
    function initializeScene() {
      $info = new AVUgenOne();
      $buy = new AVUgenTwo();

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

      bindEventHandlers($info, $buy);
    }

    function animationLoop(frameCount, timeDelta) {
        // console.log(frameCount+" : "+timeDelta);
        console.log("");
        TWEEN.update();
        $info.update(frameCount, timeDelta);
        $buy.update(frameCount, timeDelta);
    }

    function watchForWindowResize() {
      $window
        .bind('resize', function() {
          console.log("WINDOW RESIZE w: "+$window.width()+" height: "+$window.height());

          if (!$two) {
            return;
          }

          $two.clear();

          initializeScene();
        });
    }

    function bindEventHandlers(info, buy) {
      $(info.hotspot._renderer.elem)
        .css('cursor', 'pointer')
        .click(function(e) {
          info.animate = false
          // info.hotspot.fill = getRandomColor();
          if (!info.fullscreenState) {
            var driver = buy.minimize();
            driver.chain(info.fullscreen());
            driver.start()
          }
        });

      $(info.hotspot._renderer.elem)
        .css('cursor', 'pointer')
        .hover(info.hoverOn, info.hoverOff);

      $(buy.hotspot._renderer.elem)
        .css('cursor', 'pointer')
        .click(function(e) {
          info.animate = false
          // info.hotspot.fill = getRandomColor();
          if (!buy.fullscreenState) {
            var driver = info.minimize();
            driver.chain(buy.fullscreen());
            driver.start()
          }
        });

      $(buy.hotspot._renderer.elem)
        .css('cursor', 'pointer')
        .hover(buy.hoverOn, buy.hoverOff);

    }

    function getRandomColor() {
        return 'rgb('
          + Math.floor(Math.random() * 255) + ','
          + Math.floor(Math.random() * 255) + ','
          + Math.floor(Math.random() * 255) + ')';
    }

  };
}
