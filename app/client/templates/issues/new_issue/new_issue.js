/*****************************************************************************/
/* NewIssue: Event Handlers */
/*****************************************************************************/
Template.NewIssue.events({
    'submit .form-new-issue': function (event) {
        event.preventDefault()
        var content = event.target.textareaIssueContent

        var _id = Issues.insert({content: content.value});
        if (_id) {
            toastr.success('Done! Hang tight while we answer you.')
            content.value = ''
            $('.collapsible-new-issue > li > .collapsible-header').click()
        } else {
            toastr.error('Something went wrong. Try again later.')
        }
    }
})

/*****************************************************************************/
/* NewIssue: Helpers */
/*****************************************************************************/
Template.NewIssue.helpers({
})

/*****************************************************************************/
/* NewIssue: Lifecycle Hooks */
/*****************************************************************************/
Template.NewIssue.onCreated(function () {
})

Template.NewIssue.onRendered(function () {
})

Template.NewIssue.onDestroyed(function () {
})
