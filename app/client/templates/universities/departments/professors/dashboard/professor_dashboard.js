/*****************************************************************************/
/* ProfessorDashboard: Event Handlers */
/*****************************************************************************/
Template.ProfessorDashboard.events({
    'click .button-editing-mode': function (event) {
        event.preventDefault();

        // Toogle editing mode.
        Session.set('professors.dashboard.editing',
                    !Session.get('professors.dashboard.editing'))
    }
});

/*****************************************************************************/
/* ProfessorDashboard: Helpers */
/*****************************************************************************/
Template.ProfessorDashboard.helpers({
    editing: function () {
        return Session.get('professors.dashboard.editing');
    },
});

/*****************************************************************************/
/* ProfessorDashboard: Lifecycle Hooks */
/*****************************************************************************/
Template.ProfessorDashboard.onCreated(function () {
    Session.set('professors.dashboard.editing', false);
});

Template.ProfessorDashboard.onRendered(function () {
});

Template.ProfessorDashboard.onDestroyed(function () {
});
