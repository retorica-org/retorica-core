/*****************************************************************************/
/* UniversitiesList: Event Handlers */
/*****************************************************************************/
Template.UniversitiesList.events({
});

/*****************************************************************************/
/* UniversitiesList: Helpers */
/*****************************************************************************/
Template.UniversitiesList.helpers({
    universitiesIndex: () => UniversitiesIndex,
    btnLoadMoreAttributes: {class: 'btn'}
});

/*****************************************************************************/
/* UniversitiesList: Lifecycle Hooks */
/*****************************************************************************/
Template.UniversitiesList.onCreated(function () {
    Retorica.search = new SearchHelper({
        collection: Universities,
        searchIndex: UniversitiesIndex,
        createIfNotFound: true,
        redirectTo: 'universities.dashboard',
        searchPlaceholder: 'search for your university'
    });
});

Template.UniversitiesList.onRendered(function () {
});

Template.UniversitiesList.onDestroyed(function () {
    Retorica.search.dispose();
    delete Retorica.search;
});
