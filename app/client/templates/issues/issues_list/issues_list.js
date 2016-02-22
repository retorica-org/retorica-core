/*****************************************************************************/
/* IssuesList: Event Handlers */
/*****************************************************************************/
Template.IssuesList.events({
    'submit .form-archive-issue': function (event) {
        event.preventDefault()

        var issueId = event.target.issueId.value;

        Issues.update(issueId, {
            $set: {open: false}
        });
    }
})

/*****************************************************************************/
/* IssuesList: Helpers */
/*****************************************************************************/
Template.IssuesList.helpers({
    openIssues: function () {
        return Issues.find({open:true}, {sort: {createdAt: -1}})
    },
    archivedIssues: function () {
        return Issues.find({open:false})
    },
    openCount: function () { return Issues.find({open:true}).count() },
    archivedCount: function () { return Issues.find({open:false}).count() },
})

/*****************************************************************************/
/* IssuesList: Lifecycle Hooks */
/*****************************************************************************/
Template.IssuesList.onCreated(function () {
})

Template.IssuesList.onRendered(function () {
})

Template.IssuesList.onDestroyed(function () {
})
