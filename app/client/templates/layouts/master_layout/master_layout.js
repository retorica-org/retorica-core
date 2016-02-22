Template.MasterLayout.events({
    'keyup .text-search': (event) => {
        event.preventDefault();

        if (Retorica.search) {
            Retorica.search.onQueryChange(event);
        }
    },
    'submit .search': (event) => {
        event.preventDefault();

        if (Retorica.search) {
            Retorica.search.onSubmit(event);
        }
    },
    'click .button-logout': (event) => {
        event.preventDefault();
        Meteor.logout();
    },
});

Template.MasterLayout.helpers({
    username: () => {
        var user = Meteor.user()
        return user ? user.emails[0].address : null
    },
    showIfUser: () => {
        return Meteor.userId() ? '' : 'hide'
    },
    searchPlaceholder: () => Session.get('master.search.placeholder')
});

Template.MasterLayout.onRendered(function () {
     $('.dropdown-button').dropdown()
     $('.collapsible').collapsible()
     $('.button-collapse').sideNav()
});
