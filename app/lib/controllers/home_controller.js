HomeController = RouteController.extend({

  subscriptions: function() {
      this.subscribe('universities');
  },

  waitOn: function () {
  },

  data: function () {
  },

  // You can provide any of the hook options

  onRun: function () {
    this.next();
  },
  onRerun: function () {
    this.next();
  },
  onBeforeAction: ControllerCommons.requireAuthentication,

  action: function () {
    this.render();
  },
  onAfterAction: function () {
  },
  onStop: function () {
  }
});
