/*****************************************************************************/
/* DepartmentsList: Event Handlers */
/*****************************************************************************/
Template.DepartmentsList.events({
});

/*****************************************************************************/
/* DepartmentsList: Helpers */
/*****************************************************************************/
Template.DepartmentsList.helpers({
    artifact: 'department',
    departmentsIndex: () => DepartmentsIndex,
    btnLoadMoreAttributes: {class: 'btn'}
});

/*****************************************************************************/
/* DepartmentsList: Lifecycle Hooks */
/*****************************************************************************/
Template.DepartmentsList.onCreated(function () {
    Retorica.search = new SearchHelper({
        collection: Departments,
        searchIndex: DepartmentsIndex,
        createIfNotFound: true,
        redirectTo: 'departments.dashboard',
        searchPlaceholder: 'search for your department',
        newDocument: {
            universityId: this.data._id
        }
    });
});

Template.DepartmentsList.onRendered(function () {
});

Template.DepartmentsList.onDestroyed(function () {
    Retorica.search.dispose();
    delete Retorica.search;
});
