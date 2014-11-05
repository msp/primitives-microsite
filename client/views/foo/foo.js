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
  Template.foo.bgcolor = function () {
    return "background-color: " + Session.get("bgcolor") +";";
  };

  Template.foo.rendered = function () {
    // $("#show-greeting").on("click", function() {
    //   $("#greeting").toggle();
    // });

    // geometry
    var info = new AVUgenOne();
    var buy = new AVUgenTwo();

    // Update the renderer in order to generate corresponding DOM Elements.
    two.update();

    // Animation Loop.
    info.toggleStart();
    buy.toggleStart();
    two.bind('update', animate).play();

    function animate(frameCount, timeDelta) {
        // console.log(frameCount+" : "+timeDelta);
        TWEEN.update();
        info.update(frameCount, timeDelta);
        buy.update(frameCount, timeDelta);
    }

    // Bindings
    $(info.hotspot._renderer.elem)
      .css('cursor', 'pointer')
      .click(function(e) {
        info.animate = false
        // info.hotspot.fill = getRandomColor();
        if (!info.fullscreenState) {
          var driver = buy.minimize();
          driver.chain(info.fullscreen());
          driver.start()
          console.log($(this));
        }
      });

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

    // two.bind('update', function(frameCount, timeDelta) {
    //   info.group.scale += 0.05
    // });
    function getRandomColor() {
        return 'rgb('
          + Math.floor(Math.random() * 255) + ','
          + Math.floor(Math.random() * 255) + ','
          + Math.floor(Math.random() * 255) + ')';
    }

  };
}
