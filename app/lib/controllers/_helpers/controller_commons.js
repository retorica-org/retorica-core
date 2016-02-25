ControllerCommons = {
    requireAuthentication: function () {
        if (!Meteor.userId()) {
            Router.go('sign');
        } else {
            this.next();
        }
    },
}
