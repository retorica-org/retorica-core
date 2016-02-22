DepartmentDashboardController = RouteController.extend({

  subscriptions: function() {
  },
  waitOn: function () {
      return this.subscribe('department', this.params._id);
  },
  data: function () {
      return Departments.findOne({_id: this.params._id});
  },

  // You can provide any of the hook options

  onRun: function () {
    this.next();
  },
  onRerun: function () {
    this.next();
  },
  onBeforeAction: function () {
    this.next();
  },

  action: function () {
    this.render();
  },
  onAfterAction: function () {
  },
  onStop: function () {
  }
});
