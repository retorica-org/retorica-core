/*****************************************************************************/
/* ProfessorsList: Event Handlers */
/*****************************************************************************/
Template.ProfessorsList.events({
});

/*****************************************************************************/
/* ProfessorsList: Helpers */
/*****************************************************************************/
Template.ProfessorsList.helpers({
    professorsIndex: () => ProfessorsIndex,
    artifact: 'professor',
    btnLoadMoreAttributes: {class: 'btn'}
});

/*****************************************************************************/
/* ProfessorsList: Lifecycle Hooks */
/*****************************************************************************/
Template.ProfessorsList.onCreated(function () {
    Retorica.search = new SearchHelper({
        collection: Professors,
        searchIndex: ProfessorsIndex,
        createIfNotFound: true,
        redirectTo: 'professors.dashboard',
        searchPlaceholder: 'search for your professor',
        newDocument: {
            departmentId: this.data._id
        }
    });
});

Template.ProfessorsList.onRendered(function () {
});

Template.ProfessorsList.onDestroyed(function () {
    Retorica.search.dispose();
    delete Retorica.search;
});
