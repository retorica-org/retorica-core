/*****************************************************************************/
/* ClassesList: Event Handlers */
/*****************************************************************************/
Template.ClassesList.events({
});

/*****************************************************************************/
/* ClassesList: Helpers */
/*****************************************************************************/
Template.ClassesList.helpers({
    classesIndex: () => ClassesIndex,
    btnLoadMoreAttributes: {class: 'btn'},
});

/*****************************************************************************/
/* ClassesList: Lifecycle Hooks */
/*****************************************************************************/
Template.ClassesList.onCreated(function () {
    var template = this;

    Retorica.search = new SearchHelper({
        collection: Classes,
        searchIndex: ClassesIndex,
        createIfNotFound: true,
        searchPlaceholder: 'search for your class (e.g.: 2015-1)',
        newDocument: {
            courseId: this.data._id
        },
        beforeInsert: (doc) => {
            var splitQuery = doc.name.split(/[-/.\s]/);

            try {
                if (splitQuery.length !== 2)
                    throw 'Invalid query {' + doc.name + '}';

                doc.year = parseInt(splitQuery[0]);
                doc.term = parseInt(splitQuery[1]);

                if (isNaN(doc.year) || isNaN(doc.term)) {
                    throw 'Didn\'t understand {' + doc.name + '}';
                }

                if (splitQuery[0].length != 4)
                    if (splitQuery[1].length != 4)
                        throw 'Cannot find year in {' + doc.name + '}';
                    else {
                        // Second split of query has the year. Swap fields.
                        var term = doc.year;
                        doc.year = doc.term;
                        doc.term = term;
                    }
            } catch (e) {
                new OperationResponseToaster({
                    error: e, toastOnSuccess: false
                }).process();

                return null;
            }

            return doc;
        }
    });
});

Template.ClassesList.onRendered(function () {
});

Template.ClassesList.onDestroyed(function () {
    Retorica.search.dispose();
    delete Retorica.search;
});
