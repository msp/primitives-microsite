var HomeController = RouteController.extend({
  template: 'home'
});

Router.map(function () {
  this.route('home', {
    path :  '/_ref',
    controller :  HomeController
  });
});
