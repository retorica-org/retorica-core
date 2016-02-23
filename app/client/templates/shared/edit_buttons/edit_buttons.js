/*****************************************************************************/
/* EditButtons: Event Handlers */
/*****************************************************************************/
Template.EditButtons.events({
});

/*****************************************************************************/
/* EditButtons: Helpers */
/*****************************************************************************/
Template.EditButtons.helpers({
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
/* EditButtons: Lifecycle Hooks */
/*****************************************************************************/
Template.EditButtons.onCreated(function () {
});

Template.EditButtons.onRendered(function () {
    $('.modal-trigger').leanModal();
});

Template.EditButtons.onDestroyed(function () {
});
