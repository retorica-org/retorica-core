
// Base helpers

Demosthenes = {
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
/// Helper for searching through the search
/// input box located in the main navbar.
SearchHelper = function (collection, searchIndex,
    registerIfNotFound, redirectTo, timeout) {
    var self = this;

    self.collection  = collection;
    self.searchIndex = searchIndex;
    self.timeout     = timeout !== undefined ? timeout : 500;
    self.registerIfNotFound = !!registerIfNotFound;
    self.redirectTo  = redirectTo || 'home';
    self.handler     = undefined;

    self.onQueryChange = function (event) {
        clearTimeout(self.handler);

        var query = event.target.value;

        self.handler = setTimeout(function (){
            self.searchIndex.getComponentMethods().search(query);
        }, self.timeout);
    }

    self.onSubmit = function (event) {
        var query  = event.target.search.value;
        if (!query || !self.searchIndex) return;

        var exists = self.searchIndex.search(query).count();

        if (self.registerIfNotFound && query && !exists) {
            var _id = self.collection.insert({name: query});

            event.target.search.value = "";
            Router.go(self.redirectTo, {_id: _id});
        }
    }
}

/// LocalSearchHelper
///
/// Helper for local searches.
LocalSearchHelper = function (localSet, field, resultSessionId, onSubmit) {
    var self = this;

    self.localSet = localSet || [];
    self.field    = field;
    self.resultSessionId = resultSessionId;
    self.handler  = undefined;
    self.timeout  = 200;
    self.onSubmit = onSubmit;

    Session.set(resultSessionId, localSet);

    self.performQuery = (query) => {
        var result = [];

        if (!query) {
            Session.set(self.resultSessionId, self.localSet);
            return;
        }

        self.localSet.forEach((el) => {
            if (el[self.field].toLowerCase().indexOf(query) > -1) {
                result.push(el);
            }
        });

        Session.set(self.resultSessionId, result);
        Session.set(self.resultSessionId + '.found', !!result.length);

        return result;
    };

    self.onQueryChange = (event) => {
        var query = event.target.value.toLowerCase();

        clearTimeout(self.handler);
        self.handler = setTimeout(
            () => self.performQuery(query), self.timeout);
    };
}

// Template helpers

Template.registerHelper('not', function (expression) {
    return !expression;
});

Template.registerHelper('and', function (a, b) {
    return a && b;
});

Template.registerHelper('equals', function (a, b) {
    return a === b;
});

Template.registerHelper('empty', function (l) {
    return l.length == 0;
});

Template.registerHelper('localDate', function (date) {
    return date ? date.toLocaleDateString() : '';
});

Template.registerHelper('localDateTime', function (date) {
    return date ? date.toLocaleString() : '';
});

Template.registerHelper('randomColor', function (seed) {
    var randomColorIndex = Math.floor(Math.random()*Demosthenes.colors.length);
    return Demosthenes.colors[randomColorIndex];
});
