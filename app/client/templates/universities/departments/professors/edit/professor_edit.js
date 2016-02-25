/*****************************************************************************/
/* ProfessorEdit: Event Handlers */
/*****************************************************************************/
Template.ProfessorEdit.events({
    'submit .form-professor-edit': function (event) {
        event.preventDefault();
    },
    'submit .form-professor-aliases': function (event) {
        event.preventDefault();
    },
    'submit .form-professor-commit': function (event) {
        event.preventDefault();

        // Find which changes were made.
        var updates = new FormUpdatesHelper(
            {model: this, fields: ['name', 'lead', 'aliases']})
            .lookIn($('.form-professor-edit')[0])
            .lookIn({aliases: {value: Session.get('professors.edit.aliases')}})
            .updates();

        // Commit info update.
        if (updates)
            Professors.update(
                this._id,
                { $set: updates },
                new OperationResponseToaster().process);

        Session.set('professors.dashboard.editing', false);
    },
    'click .chip-alias': function (event) {
        event.preventDefault()

        var alias = event.target.dataset.alias,
            aliases = Session.get('professors.edit.aliases');

        var i = aliases.indexOf(alias);
        if (i > -1) {
            aliases.splice(i, 1);
            Session.set('professors.edit.aliases', aliases);
        }
    },
    'keyup #text-add-aliases': function (event) {
        event.preventDefault()

        if (event.keyCode === 13
            && this.aliases.indexOf(event.target.value) == -1) {
            // Enter was pressed and alias doesn't exist.
            var aliases = Session.get('professors.edit.aliases');
            aliases.push(event.target.value);
            Session.set('professors.edit.aliases', aliases);

            event.target.value = ''
        }
    }
});

/*****************************************************************************/
/* ProfessorEdit: Helpers */
/*****************************************************************************/
Template.ProfessorEdit.helpers({
    updatedAt: function () {
        return this
            ._history[this._history.length -1]
            .updatedAt;
    },
    reactiveAliases: function () {
        return Session.get('professors.edit.aliases');
    }
});

/*****************************************************************************/
/* ProfessorEdit: Lifecycle Hooks */
/*****************************************************************************/
Template.ProfessorEdit.onCreated(function () {
    // Transforms null alias arrays into empty ones.
    this.data.aliases = this.data.aliases || [];

    Session.set('professors.edit.aliases', this.data.aliases.slice(0));
});

Template.ProfessorEdit.onRendered(function () {
});

Template.ProfessorEdit.onDestroyed(function () {
    delete Session.keys['professors.edit.aliases'];
});
