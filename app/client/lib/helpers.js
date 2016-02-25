
// Base helpers

Retorica = {
    colors: ['red lighten-2', 'blue lighten-2', 'green', 'orange lighten-2'],
};


/// FormUpdatesHelper
///
/// Automatic tracking of updates made in forms.
FormUpdatesHelper = function (options) {
    var self = this;

    self.forms = [];

    /// lookIn
    ///
    /// form: where we should look for the updates.
    /// return: this
    self.lookIn = function (form) {
        self.forms.push(form);
        return self;
    };

    /// updates
    ///
    /// return: dict {field:value} where `field` is a filed
    /// updated and `value` is the new value.
    self.updates = function () {
        var updates = {};

        for (var field of options.fields) {
            for (var form of self.forms) {
                if (field in form) {
                    var value = form[field].value,
                        old   = options.model[field];

                    if (!Array.isArray(value)) {
                        // Shallow comparison.
                        if (value != old)
                            updates[field] = value;

                    } else if (!Array.isArray(old)
                        || value.length != old.length
                        || !value.every((el, i) => el === old[i])) {
                            // Value is an array. It's indeed different than
                            // old if old is not an array, if their size
                            // differ or if some value differ.
                            updates[field] = value;
                    }

                    // Breaks here, preventing overriding of found value
                    // by others found in following forms.
                    break;
                }
            }
        }

        return updates;
    };
};


/// OperationResponseToaster
///
/// Helper for responses coming from calls such as
/// Collection.insert() and Collection.update().
///
/// Params:
///
///     toasting:
///         Toast errors and success messages if true.
///         Only displays console messages, otherwise.
///
///     toastOnSuccess:
///         Toast success messages, and not only error ones.
///         This is ignored when `toasting` is false.
///
///    error:
///         Operation's result, or `undefined` if no errors.
///
///   successMessage (default='Done!'):
///         Success message to be displayed.
///
/// Usage example:
///
/// Universities.insert(
///     newUniversity,
///     (errors, count) => new OperationResponseToaster({
///         error:errors,
///         successMessage: 'University created!'
///     }).process()
/// );
///
/// Departments.update(
///     {_id: 1},
///     {$set: {name: 'Computer Science'}},
///     new OperationResponseToaster().process
/// );
///
OperationResponseToaster = function (options) {
    var self = this;

    options = options || {};

    if (!('toasting' in options))
        options.toasting = true;
    if (!('toastOnSuccess' in options))
        options.toastOnSuccess = true;

    self.hasErrors = function () {
        return options.error;
    };

    self.process = function (error, count) {
        if (error !== undefined) {
            options.error = error;
        }

        if (options.toasting) {
            if (options.error) {
                toastr.error(options.error);
            } else if (options.toastOnSuccess) {
                toastr.success(options.successMessage || 'Done!');
            }
        }

        // Always write errors on console.
        if (options.error) console.log(options.error);

        return self;
    };
};


/// SearchHelper
///
/// Helper for searching through the search input box located in
/// the main navbar.
SearchHelper = function (options) {
    var self = this;

    self.handler = undefined;

    if (!'timeout' in options)
        options.timeout = 200;

    Session.set('master.search.placeholder', options.searchPlaceholder);

    self.onQueryChange = function (event) {
        clearTimeout(self.handler);

        var query = event.target.value;

        self.handler = setTimeout(
            () => options.searchIndex.getComponentMethods().search(query),
            options.timeout);
    };

    self.onSubmit = function (event) {
        var query  = event.target.search.value;
        if (!query || !options.searchIndex) return;

        var exists = options.searchIndex.search(query).count();

        if (options.createIfNotFound && !exists) {
            var newDoc = options.newDocument || {};
            newDoc.name = query;

            if ('beforeInsert' in options) {
                newDoc = options.beforeInsert(newDoc);

                // beforeInsert's invalidated query variable. Abort insertion.
                if (!newDoc) return;
            }

            var _id = options.collection.insert(newDoc,
                new OperationResponseToaster().process);

            event.target.search.value = '';

            if (options.redirectTo)
                Router.go(options.redirectTo, {_id: _id});
        }
    };

    self.dispose = function () {
        delete Session.keys['master.search.placeholder'];
        document.getElementById('text-search').value = '';
        return self;
    };
}
