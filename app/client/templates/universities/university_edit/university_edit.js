/*****************************************************************************/
/* UniversityEdit: Event Handlers */
/*****************************************************************************/
Template.UniversityEdit.events({
    'submit .form-university-edit': function (event) {
        event.preventDefault()
    },
    'submit .form-university-aliases': function (event) {
        event.preventDefault()
    },
    'submit .form-university-commit': function (event) {
        event.preventDefault()

        // Commit info update.
        var updates
            = new FormUpdatesHelper(this, ['name', 'lead'])
                .lookIn($('.form-university-edit')[0])
                .updates()

        // Commit changes in aliases.
        updates.aliases = this.aliases;

        Universities.update(
            this._id,
            { $set: updates },
            new ResponseDisplayer().asRequestCallback);

        Session.set('universities.dashboard.editing', false)
    },
    'click .chip-alias': function (event) {
        event.preventDefault()

        var alias = event.target.dataset.alias

        var i = this.aliases.indexOf(alias)
        if (i > -1) {
            this.aliases.splice(i, 1)
            Session.set('universities.edit.aliases', this.aliases)
        }
    },
    'keyup #text-add-aliases': function (event) {
        event.preventDefault()

        if (event.keyCode === 13
            && this.aliases.indexOf(event.target.value) == -1) {
            // Enter was pressed and alias doesn't exist.
            this.aliases.push(event.target.value)
            Session.set('universities.edit.aliases', this.aliases)

            event.target.value = ''
        }
    }
})

/*****************************************************************************/
/* UniversityEdit: Helpers */
/*****************************************************************************/
Template.UniversityEdit.helpers({
    updatedAt: function () {
        return this
            ._history[this._history.length -1]
            .updatedAt;
    },
    reactiveAliases: function () {
        return Session.get('universities.edit.aliases');
    }
});

/*****************************************************************************/
/* UniversityEdit: Lifecycle Hooks */
/*****************************************************************************/
Template.UniversityEdit.onCreated(function () {
    // Transforms null alias arrays into empty ones.
    this.data.aliases = this.data.aliases || [];

    Session.set('universities.edit.aliases', this.data.aliases);
});

Template.UniversityEdit.onRendered(function () {
});

Template.UniversityEdit.onDestroyed(function () {
});
