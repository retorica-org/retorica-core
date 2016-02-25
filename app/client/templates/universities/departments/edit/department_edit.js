/*****************************************************************************/
/* DepartmentEdit: Event Handlers */
/*****************************************************************************/
Template.DepartmentEdit.events({
    'submit .form-department-edit': function (event) {
        event.preventDefault();
    },
    'submit .form-department-aliases': function (event) {
        event.preventDefault();
    },
    'submit .form-department-commit': function (event) {
        event.preventDefault();

        // Find which changes were made.
        var updates = new FormUpdatesHelper(
            {model: this, fields: ['name', 'lead', 'aliases']})
            .lookIn($('.form-department-edit')[0])
            .lookIn({aliases: {value: Session.get('departments.edit.aliases')}})
            .updates();

        // Commit info update.
        if (updates)
            Departments.update(
                this._id,
                { $set: updates },
                new OperationResponseToaster().process);

        Session.set('departments.dashboard.editing', false);
    },
    'click .chip-alias': function (event) {
        event.preventDefault()

        var alias = event.target.dataset.alias,
            aliases = Session.get('departments.edit.aliases');

        var i = aliases.indexOf(alias);
        if (i > -1) {
            aliases.splice(i, 1);
            Session.set('departments.edit.aliases', aliases);
        }
    },
    'keyup #text-add-aliases': function (event) {
        event.preventDefault()

        if (event.keyCode === 13
            && this.aliases.indexOf(event.target.value) == -1) {
            // Enter was pressed and alias doesn't exist.
            var aliases = Session.get('departments.edit.aliases');
            aliases.push(event.target.value);
            Session.set('departments.edit.aliases', aliases);

            event.target.value = ''
        }
    }
});

/*****************************************************************************/
/* DepartmentEdit: Helpers */
/*****************************************************************************/
Template.DepartmentEdit.helpers({
    updatedAt: function () {
        return this
            ._history[this._history.length -1]
            .updatedAt;
    },
    reactiveAliases: function () {
        return Session.get('departments.edit.aliases');
    }
});

/*****************************************************************************/
/* DepartmentEdit: Lifecycle Hooks */
/*****************************************************************************/
Template.DepartmentEdit.onCreated(function () {
    // Transforms null alias arrays into empty ones.
    this.data.aliases = this.data.aliases || [];

    Session.set('departments.edit.aliases', this.data.aliases.slice(0));
});

Template.DepartmentEdit.onRendered(function () {
});

Template.DepartmentEdit.onDestroyed(function () {
    delete Session.keys['departments.edit.aliases'];
});
