SignController = RouteController.extend({

  subscriptions: function() {
      this.subscribe('users.exists')
  },

  waitOn: function () {
  },

  data: function () {
  },

  onRun: function () {
    this.next();
  },
  onRerun: function () {
    this.next();
  },
  onBeforeAction: function () {
      if (Meteor.userId()) {
          Router.go('home')
      } else {
          this.next();
      }
  },

  action: function () {
    this.render();
  },
  onAfterAction: function () {
  },
  onStop: function () {
  }
});
