Courses = new Mongo.Collection('courses', {
    transform: (doc) => {
        doc.department = Departments.findOne({_id: doc.departmentId});
        return doc;
    }
});


Schemas.courses = new SimpleSchema({
    name: {
        type: String,
        label: 'Name'
    },
    aliases: {
        type: [String],
        optional: true,
        label: 'Aliases'
    },
    departmentId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    }
});


Courses.attachSchema(Schemas.courses);
Courses.attachSchema(
    new UpdateHistory({
        collection: Courses,
        fields: ['name', 'aliases']
    }).toSchema());


CoursesIndex = new EasySearch.Index({
    collection: Courses,
    fields: ['name', 'aliases'],
    engine: new EasySearch.Minimongo()
});


if (Meteor.isServer) {
  Courses.allow({
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
