Classes = new Mongo.Collection('classes', {
    transform: (doc) => {
        doc.course = Courses.findOne({_id: doc.courseId});
        return doc;
    }
});

Schemas.classes = new SimpleSchema({
    term: {
        type: Number,
    },
    year: {
        type: Number,
    },
    professorId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true,
    },
    courseId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
});


Classes.attachSchema(Schemas.classes);


ClassesIndex = new EasySearch.Index({
    collection: Classes,
    fields: ['term', 'year', 'courseId'],
    // selectorPerField: function (field, searchString) {
    //     if (field == 'term') {
    //         return {
    //             term: parseInt(searchString)
    //         }
    //     }
    //
    //     if (field == 'year') {
    //         return {
    //             year: parseInt(searchString)
    //         }
    //     }
    //
    //     return this.defaultConfiguration().selectorPerField(field, searchString);
    // },
    engine: new EasySearch.Minimongo(),
});


if (Meteor.isServer) {
    Classes.allow({
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
