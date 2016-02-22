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
    },
    describeChanges: function (entry) {
        var changes = [];

        for (var field in entry) {
            if (field != 'author' && field != 'updatedAt') {
                changes.push({field: field, value: entry[field]});
            }
        }

        return changes;
    }
});

/*****************************************************************************/
/* UniversityDashboard: Lifecycle Hooks */
/*****************************************************************************/
Template.UniversityDashboard.onCreated(function () {
    Session.set('universities.dashboard.editing', false);
});

Template.UniversityDashboard.onRendered(function () {
    $('.modal-trigger').leanModal();
});

Template.UniversityDashboard.onDestroyed(function () {
});
