CourseDashboardController = RouteController.extend({

  subscriptions: function() {
      this.subscribe('course.classes', this.params._id);
  },

  waitOn: function () {
      return this.subscribe('course', this.params._id);
  },

  data: function () {
      return Courses.findOne({_id: this.params._id});
  },

  // You can provide any of the hook options

  onRun: function () {
    this.next();
  },
  onRerun: function () {
    this.next();
  },
  onBeforeAction: ControllerCommons.requireAuthentication,

  // The same thing as providing a function as the second parameter. You can
  // also provide a string action name here which will be looked up on a Controller
  // when the route runs. More on Controllers later. Note, the action function
  // is optional. By default a route will render its template, layout and
  // regions automatically.
  // Example:
  //  action: 'myActionFunction'

  action: function () {
    this.render();
  },
  onAfterAction: function () {
  },
  onStop: function () {
  }
});
