UniversityDashboardController = RouteController.extend({

  subscriptions: function() {
      this.subscribe('university', this.params._id).wait();
  },

  waitOn: function () {
  },

  data: function () {
      return Universities.findOne({_id: this.params._id});
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
