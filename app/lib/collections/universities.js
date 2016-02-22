Universities = new Mongo.Collection('universities');

Schemas.universities = new SimpleSchema({
    name: {
        type: String,
        max: 64,
        label: 'Name'
    },
    lead: {
        type: String,
        max: 256,
        optional: true,
        label: 'Lead'
    },
    aliases: {
        type: [String],
        optional: true,
        label: 'Aliases'
    },
    students: {
        type: [Meteor.users],
        optional: true
    },
    representatives: {
        type: [Meteor.users],
        optional: true
    },
    enrollable: {
        type: Boolean,
        optional: true,
        label: 'Enrollable',
        autoValue: function () {
            if (this.isInsert) {
                return true
            }
        }
    },
    acceptEmailFromDomains: {
        type: [String],
        optional: true,
        label: 'Accept emails from the these domains',
    }
});

Universities.attachSchema(Schemas.universities)
Universities.attachSchema(
    new UpdateHistory(Universities, ['name', 'lead', 'aliases']).toSchema());


UniversitiesIndex = new EasySearch.Index({
    collection: Universities,
    fields: ['name', 'aliases'],
    engine: new EasySearch.Minimongo()
});


if (Meteor.isServer) {
    Universities.allow({
        insert: function (userId, doc) {
            return !!userId;
        },

        update: function (userId, doc, fieldNames, modifier) {
            return !!userId;
        },

        remove: function (userId, doc) {
            return false;
        }
    });
}
