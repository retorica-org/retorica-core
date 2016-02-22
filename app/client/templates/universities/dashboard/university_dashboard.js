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
                changes.push({field: field, value: entry[field]})
            }
        }

        return changes;
    },
    departmentsSearch: () => Session.get('search.departments'),
    departmentsSearchFound: () => Session.get('search.departments.found')
});

/*****************************************************************************/
/* UniversityDashboard: Lifecycle Hooks */
/*****************************************************************************/
Template.UniversityDashboard.onCreated(function () {
    var docId = this.data._id;

    Demosthenes.search = new LocalSearchHelper(
        this.data.departments,
        'name', 'search.departments',
        (event) => {
            var query = event.target.search.value;

            // Doesn't create if query matches an existing doc.
            if (!query || Demosthenes.search.performQuery(query).length)
                return;

            var newDepartment = {name:query};

            var update = Demosthenes.search.localSet
                       ? {$push: {departments: newDepartment}}
                       : {$set:{departments: [newDepartment]}};

            Universities.update(
                docId, update, new ResponseDisplayer().asRequestCallback);
        });

    Session.set('universities.dashboard.editing', false);
    Session.set('master.search.placeholder', 'search for your department');
});

Template.UniversityDashboard.onRendered(function () {
    $('.modal-trigger').leanModal();
});

Template.UniversityDashboard.onDestroyed(function () {
    Session.set('master.search.placeholder', 'search');
});
