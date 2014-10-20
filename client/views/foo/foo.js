Template['foo'].helpers({
    mspLogger: function () {
        console.log("Oh HAI !");
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
