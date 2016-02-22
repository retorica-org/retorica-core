
// Base helpers

Retorica = {
    colors: ['red lighten-2', 'blue lighten-2', 'green', 'orange lighten-2'],
};

/// FormUpdatesHelper
///
/// Helper for automatically tracking updates made in forms.
FormUpdatesHelper = function (model, fields) {
    this.model = model;
    this.fields = fields;
    this.forms = [];

    /// lookIn
    ///
    /// form: where we should look for the updates.
    /// return: this
    this.lookIn = function (form) {
        this.forms.push(form);
        return this;
    };

    /// updates
    ///
    /// return: dict {field:value} where `field` is a filed
    /// updated and `value` is the new value.
    this.updates = function () {
        var updates = {};

        for (var field of this.fields) {
            for (var form of this.forms) {
                if (field in form) {
                    if (form[field].value != this.model[field]) {
                        updates[field] = form[field].value;
                    }

                    break;
                }
            }
        }

        return updates;
    };
};

/// ResponseDisplayer
///
/// Helper for responses coming from calls such as
/// Collection.insert() and Collection.update().
ResponseDisplayer = function (error) {
    var self = this;

    self.error = error;

    this.asRequestCallback = function (error, docs) {
        self.error = error;
        self.successOrToastErrors();
    };

    this.successOrToastErrors = function (message) {
        message = message || 'Done!';

        if (self.error) {
            console.log(self.error);
            toastr.error(self.error);
        } else {
            toastr.success(message);
        }
    };
};

/// SearchHelper
///
/// Helper for searching through the search input box located in
/// the main navbar.
SearchHelper = function (options) {
    var self = this;

    self.collection  = options.collection;
    self.searchIndex = options.searchIndex;
    self.timeout     = options.timeout !== undefined ? options.timeout : 200;
    self.createIfNotFound = !!options.createIfNotFound;
    self.redirectTo  = options.redirectTo;
    self.newDocument = options.newDocument;
    self.handler     = undefined;

    Session.set('master.search.placeholder', options.searchPlaceholder);

    self.onQueryChange = function (event) {
        clearTimeout(self.handler);

        var query = event.target.value;

        self.handler = setTimeout(
            () => self.searchIndex.getComponentMethods().search(query),
            self.timeout);
    }

    self.onSubmit = function (event) {
        var query  = event.target.search.value;
        if (!query || !self.searchIndex) return;

        var exists = self.searchIndex.search(query).count();

        if (self.createIfNotFound && query && !exists) {
            var newDoc = self.newDocument || {};
            newDoc.name = query;

            var _id = self.collection.insert(newDoc,
                new ResponseDisplayer().asRequestCallback);

            event.target.search.value = '';
            Router.go(self.redirectTo, {_id: _id});
        }
    },

    self.dispose = function () {
        delete Session.keys['master.search.placeholder'];
        return self;
    }
}
