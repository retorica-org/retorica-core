/*****************************************************************************/
/* Sign: Event Handlers */
/*****************************************************************************/
Template.Sign.events({
    'submit .form-sign-email': function (event) {
        event.preventDefault();

        var email = event.target.email.value
        var userExists = Meteor.users.findOne({'emails.address': email})

        Session.set('sign.email', email)
        Session.set('sign.signingMode',
            userExists ? 'logging' : 'registering')
    },
    'submit .form-sign-registering' : function (event) {
        event.preventDefault()

        var email           = Session.get('sign.email'),
            password        = event.target.password.value,
            confirmPassword = event.target.confirmPassword.value;

        if (password != confirmPassword) {
            return toastr.warning('Passwords differ!');
        }

        var result = Accounts.createUser(
            {email: email, password: password},
            function (error) { if (error) toast.error(error); }
        )

        console.log(result)
    },
    'submit .form-sign-logging': function (event) {
        event.preventDefault()

        var email    = Session.get('sign.email'),
            password = event.target.password.value;

        Meteor.loginWithPassword(email, password, function (error) {
            if (error) {
                toastr.error(error);
            }
            else {
                Session.get('sign.signingMode', false);
            }
        });
    },
    'click .btn-signing-back': function (event) {
        event.preventDefault();
        Session.set('sign.signingMode', false)
    }
});

/*****************************************************************************/
/* Sign: Helpers */
/*****************************************************************************/
Template.Sign.helpers({
    hideOnSigning: function () {
        return Session.get('sign.signingMode') ? 'hide' : ''
    },
    showOnRegistering: function () {
        return Session.get('sign.signingMode') == 'registering' ? '' : 'hide'
    },
    showOnLogging: function () {
        return Session.get('sign.signingMode') == 'logging' ? '' : 'hide'
    },
    email: function () {
        return Session.get('sign.email');
    }
});

/*****************************************************************************/
/* Sign: Lifecycle Hooks */
/*****************************************************************************/
Template.Sign.onCreated(function () {
});

Template.Sign.onRendered(function () {
});

Template.Sign.onDestroyed(function () {
});
