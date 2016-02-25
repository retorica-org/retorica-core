Professors = new Mongo.Collection('professors');


Schemas.professors = new SimpleSchema({
    name: {
        type: String,
    },
    aliases: {
        type: [String],
        optional: true,
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
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return false;
    }
  });
}
