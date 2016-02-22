Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});


Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  where: 'client'
});


Router.route('/sign', {
  name: 'sign',
  template: 'Sign',
  controller: 'SignController',
  where: 'client'
});


Router.route("/universities/:_id", {
    name:"universities.dashboard",
    template:"UniversityDashboard",
    controller: 'UniversityDashboardController',
    where: 'client'
});


Router.route("/departments/:_id", {
    name:"departments.dashboard",
    template:"DepartmentDashboard",
    controller: 'DepartmentDashboardController',
    where: 'client'
});


Router.route("/issues", {
    name:"issues",
    template:"IssuesList",
    controller: 'IssuesListController',
    where: 'client'
});
