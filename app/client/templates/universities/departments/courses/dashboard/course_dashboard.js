/*****************************************************************************/
/* CourseDashboard: Event Handlers */
/*****************************************************************************/
Template.CourseDashboard.events({
    'click .button-editing-mode': function (event) {
        event.preventDefault();

        // Toogle editing mode.
        Session.set('courses.dashboard.editing',
                    !Session.get('courses.dashboard.editing'))
    }
});

/*****************************************************************************/
/* CourseDashboard: Helpers */
/*****************************************************************************/
Template.CourseDashboard.helpers({
    editing: function () {
        return Session.get('courses.dashboard.editing');
    },
});

/*****************************************************************************/
/* CourseDashboard: Lifecycle Hooks */
/*****************************************************************************/
Template.CourseDashboard.onCreated(function () {
    Session.set('courses.dashboard.editing', false);
});

Template.CourseDashboard.onRendered(function () {
});

Template.CourseDashboard.onDestroyed(function () {
});
