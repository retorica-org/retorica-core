/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.Home.events({
});

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.Home.helpers({
    universitiesIndex: () => UniversitiesIndex,
    btnLoadMoreAttributes: {class: 'btn'}
});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.onCreated(function () {
    Demosthenes.search = new SearchHelper(
        Universities, UniversitiesIndex,
        'registerIfNotFound', 'universities.dashboard');

    Session.set('master.search.placeholder', 'search for your university');
});

Template.Home.onRendered(function () {
});

Template.Home.onDestroyed(function () {
    delete Demosthenes.search;
    Session.set('master.search.placeholder', 'search');
});
