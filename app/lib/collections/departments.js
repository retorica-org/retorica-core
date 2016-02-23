Departments = new Mongo.Collection('departments', {
    transform: (doc) => {
        doc.university = Universities.findOne({_id: doc.universityId});
        return doc;
    }
});


Schemas.departments = new SimpleSchema({
    name: {
        type: String
    },
    aliases: {
        type: [String],
        optional: true,
        label: 'Aliases'
    },
    representatives: {
        type: [Meteor.users],
        optional: true
    },
    universityId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    }
});


Departments.attachSchema(Schemas.departments);
Departments.attachSchema(
    new UpdateHistory({
        collection: Departments,
        fields: ['name', 'aliases']
    }).toSchema());


DepartmentsIndex = new EasySearch.Index({
    collection: Departments,
    fields: ['name', 'aliases'],
    engine: new EasySearch.Minimongo()
});


if (Meteor.isServer) {
    Departments.allow({
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
