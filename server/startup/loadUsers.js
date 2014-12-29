function loadUser(user) {
  var userAlreadyExists = typeof Meteor.users.findOne({ username : user.username }) === 'object';

  if (!userAlreadyExists) {
    Accounts.createUser(user);
  } else {
    console.log("DUPE! "+user.username);
  }
}

Meteor.startup(function () {
  var users = YAML.eval(Assets.getText('users.yml'));

  console.log("Starting user load...");
  for (key in users) if (users.hasOwnProperty(key)) {
    //console.log("loading.. users[key]: "+users[key].username);
    loadUser(users[key]);
  }
  console.log("DONE user load!");
});