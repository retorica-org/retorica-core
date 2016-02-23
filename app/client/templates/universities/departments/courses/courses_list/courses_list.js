/*****************************************************************************/
/* CoursesList: Event Handlers */
/*****************************************************************************/
Template.CoursesList.events({
});

/*****************************************************************************/
/* CoursesList: Helpers */
/*****************************************************************************/
Template.CoursesList.helpers({
    coursesIndex: () => CoursesIndex,
    btnLoadMoreAttributes: {class: 'btn'}
});

/*****************************************************************************/
/* CoursesList: Lifecycle Hooks */
/*****************************************************************************/
Template.CoursesList.onCreated(function () {
    Retorica.search = new SearchHelper({
        collection: Courses,
        searchIndex: CoursesIndex,
        createIfNotFound: true,
        searchPlaceholder: 'search for your course',
        newDocument: {
            departmentId: this.data._id
        }
    });
});

Template.CoursesList.onRendered(function () {
});

Template.CoursesList.onDestroyed(function () {
    Retorica.search.dispose();
    delete Retorica.search;
});
