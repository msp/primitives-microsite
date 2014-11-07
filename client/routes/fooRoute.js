var fooController = RouteController.extend({
  template: 'foo'
});

Router.map(function () {
  this.route('fooRoute', {
    path :  '/',
    controller :  fooController
  });
});
