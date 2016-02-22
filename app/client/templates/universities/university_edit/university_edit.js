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

        // Find which changes were made.
        var updates = new FormUpdatesHelper(
            {model: this, fields: ['name', 'lead', 'aliases']})
            .lookIn($('.form-university-edit')[0])
            .lookIn({aliases: {value: Session.get('universities.edit.aliases')}})
            .updates();

        // Commit info update.
        if (updates)
            Universities.update(
                this._id,
                { $set: updates },
                new ResponseDisplayer().process);

        Session.set('universities.dashboard.editing', false)
    },
    'click .chip-alias': function (event) {
        event.preventDefault()

        var alias = event.target.dataset.alias,
            aliases = Session.get('universities.edit.aliases');

        var i = aliases.indexOf(alias);
        if (i > -1) {
            aliases.splice(i, 1);
            Session.set('universities.edit.aliases', aliases);
        }
    },
    'keyup #text-add-aliases': function (event) {
        event.preventDefault()

        if (event.keyCode === 13
            && this.aliases.indexOf(event.target.value) == -1) {
            // Enter was pressed and alias doesn't exist.
            var aliases = Session.get('universities.edit.aliases');
            aliases.push(event.target.value);
            Session.set('universities.edit.aliases', aliases);

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

    Session.set('universities.edit.aliases', this.data.aliases.slice(0));
});

Template.UniversityEdit.onRendered(function () {
});

Template.UniversityEdit.onDestroyed(function () {
});
