/*****************************************************************************/
/* DepartmentDashboard: Event Handlers */
/*****************************************************************************/
Template.DepartmentDashboard.events({
    'click .button-editing-mode': function (event) {
        event.preventDefault();

        // Toogle editing mode.
        Session.set('departments.dashboard.editing',
                    !Session.get('departments.dashboard.editing'))
    }
});

/*****************************************************************************/
/* DepartmentDashboard: Helpers */
/*****************************************************************************/
Template.DepartmentDashboard.helpers({
    editing: function () {
        return Session.get('departments.dashboard.editing');
    },
});

/*****************************************************************************/
/* DepartmentDashboard: Lifecycle Hooks */
/*****************************************************************************/
Template.DepartmentDashboard.onCreated(function () {
    Session.set('departments.dashboard.editing', false);
});

Template.DepartmentDashboard.onRendered(function () {
});

Template.DepartmentDashboard.onDestroyed(function () {
});
