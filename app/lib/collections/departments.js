Schemas.departments = new SimpleSchema({
    'name': {
        type: String
    },
    'representatives': {
        type: [Meteor.users],
        optional: true
    }
})
