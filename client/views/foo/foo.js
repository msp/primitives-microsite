Template['foo'].helpers({
    mspLogger: function () {
        console.log("Oh HAI !");
    }
    ,modalTitle: function () {
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
    $("#show-greeting").on("click", function() {
      $("#greeting").toggle();
    });
  };
}
