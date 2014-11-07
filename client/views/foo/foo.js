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

  Accounts.config({
    forbidClientAccountCreation : true
  });

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });

  Template.foo.rendered = function () {
    // geometry
    var $info, $buy;

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
        console.log("");
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
        });
    }

    function bindEventHandlers(info, buy, watch) {
      $(info.hotspot._renderer.elem)
        .css('cursor', 'pointer')
        .click(function(e) {
          info.animate = false;
          var driver = buy.minimize();
          driver.chain(watch.minimize().chain(info.fullscreen()));
          driver.start()
        });

      $(info.hotspot._renderer.elem)
        .css('cursor', 'pointer')
        .hover(info.hoverOn, info.hoverOff);

      $(buy.hotspot._renderer.elem)
        .css('cursor', 'pointer')
        .click(function(e) {
          buy.animate = false;
          var driver = info.minimize();
          driver.chain(watch.minimize().chain(buy.fullscreen()));
          driver.start()
        });

      $(buy.hotspot._renderer.elem)
        .css('cursor', 'pointer')
        .hover(buy.hoverOn, buy.hoverOff);

      $(watch.hotspot._renderer.elem)
        .css('cursor', 'pointer')
        .click(function(e) {
          watch.animate = false;
          var driver = info.minimize();
          driver.chain(buy.minimize().chain(watch.fullscreen()));
          driver.start()
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
