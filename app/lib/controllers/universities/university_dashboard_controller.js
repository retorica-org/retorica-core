UniversityDashboardController = RouteController.extend({

  subscriptions: function() {
      this.subscribe('university.departments', this.params._id);
  },

  waitOn: function () {
      return this.subscribe('university', this.params._id);
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
  onBeforeAction: ControllerCommons.requireAuthentication,

  action: function () {
    this.render();
  },
  onAfterAction: function () {
  },
  onStop: function () {
  }
});
