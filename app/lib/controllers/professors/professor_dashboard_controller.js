ProfessorDashboardController = RouteController.extend({

  subscriptions: function() {
      this.subscribe('professor.classes', this.params._id);
  },

  waitOn: function () {
      return this.subscribe('professor', this.params._id);
  },

  data: function () {
      return Professors.findOne({_id: this.params._id});
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
