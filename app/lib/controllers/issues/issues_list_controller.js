IssuesListController = RouteController.extend({

  subscriptions: function() {
      this.subscribe('issues')
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
  onBeforeAction: function () {
      if (!Meteor.userId()) {
          Router.go('sign')
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
