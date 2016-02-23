/*****************************************************************************/
/* CourseEdit: Event Handlers */
/*****************************************************************************/
Template.CourseEdit.events({
    'submit .form-course-edit': function (event) {
        event.preventDefault();
    },
    'submit .form-course-aliases': function (event) {
        event.preventDefault();
    },
    'submit .form-course-commit': function (event) {
        event.preventDefault();

        // Find which changes were made.
        var updates = new FormUpdatesHelper(
            {model: this, fields: ['name', 'lead', 'aliases']})
            .lookIn($('.form-course-edit')[0])
            .lookIn({aliases: {value: Session.get('courses.edit.aliases')}})
            .updates();

        // Commit info update.
        if (updates)
            Courses.update(
                this._id,
                { $set: updates },
                new OperationResponseToaster().process);

        Session.set('courses.dashboard.editing', false);
    },
    'click .chip-alias': function (event) {
        event.preventDefault()

        var alias = event.target.dataset.alias,
            aliases = Session.get('courses.edit.aliases');

        var i = aliases.indexOf(alias);
        if (i > -1) {
            aliases.splice(i, 1);
            Session.set('courses.edit.aliases', aliases);
        }
    },
    'keyup #text-add-aliases': function (event) {
        event.preventDefault()

        if (event.keyCode === 13
            && this.aliases.indexOf(event.target.value) == -1) {
            // Enter was pressed and alias doesn't exist.
            var aliases = Session.get('courses.edit.aliases');
            aliases.push(event.target.value);
            Session.set('courses.edit.aliases', aliases);

            event.target.value = ''
        }
    }
});

/*****************************************************************************/
/* CourseEdit: Helpers */
/*****************************************************************************/
Template.CourseEdit.helpers({
    updatedAt: function () {
        return this
            ._history[this._history.length -1]
            .updatedAt;
    },
    reactiveAliases: function () {
        return Session.get('courses.edit.aliases');
    }
});

/*****************************************************************************/
/* CourseEdit: Lifecycle Hooks */
/*****************************************************************************/
Template.CourseEdit.onCreated(function () {
    // Transforms null alias arrays into empty ones.
    this.data.aliases = this.data.aliases || [];

    Session.set('courses.edit.aliases', this.data.aliases.slice(0));
});

Template.CourseEdit.onRendered(function () {
});

Template.CourseEdit.onDestroyed(function () {
    delete Session.keys['courses.edit.aliases'];
});
