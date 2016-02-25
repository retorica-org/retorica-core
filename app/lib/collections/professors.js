Professors = new Mongo.Collection('professors', {
    transform: (doc) => {
        doc.department = Departments.findOne({_id: doc.departmentId});
        return doc;
    }
});


Schemas.professors = new SimpleSchema({
    name: {
        type: String,
    },
    aliases: {
        type: [String],
        optional: true,
    },
    departmentId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
});


Professors.attachSchema(Schemas.professors);
Professors.attachSchema(new UpdateHistory({
    collection: Professors,
    fields: ['name', 'aliases'],
}).toSchema());


ProfessorsIndex = new EasySearch.Index({
    collection: Professors,
    fields: ['name', 'aliases'],
    engine: new EasySearch.Minimongo()
});


if (Meteor.isServer) {
  Professors.allow({
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
