/*****************************************************************************/
/* UniversityDashboard: Event Handlers */
/*****************************************************************************/
Template.UniversityDashboard.events({
    'click .button-editing-mode': function (event) {
        event.preventDefault();

        // Toogle editing mode.
        Session.set('universities.dashboard.editing',
                    !Session.get('universities.dashboard.editing'))
    }
});

/*****************************************************************************/
/* UniversityDashboard: Helpers */
/*****************************************************************************/
Template.UniversityDashboard.helpers({
    editing: function () {
        return Session.get('universities.dashboard.editing');
    },
    updatedAt: function () {
        return this
            ._history[this._history.length -1]
            .updatedAt;
    }
});

/*****************************************************************************/
/* UniversityDashboard: Lifecycle Hooks */
/*****************************************************************************/
Template.UniversityDashboard.onCreated(function () {
    Session.set('universities.dashboard.editing', false);
});

Template.UniversityDashboard.onRendered(function () {
});

Template.UniversityDashboard.onDestroyed(function () {
});
