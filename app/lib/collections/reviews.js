Reviews = new Mongo.Collection('reviews');

Schemas.comments = new SimpleSchema({
    userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    content: {
        type: String,
    },
    createdAt: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
            }

            this.unset();
        }
    }
});

Schemas.reviews = new SimpleSchema({
    classId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    studentId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true,
    },
    statement: {
        type: String,

    },
    comments: {
        type: [Schemas.comments],
        optional: true
    },
    approved: {
        type: Boolean,
        autoValue: function () {
            if (this.isInsert) {
                return false;
            }
        }
    }
});


if (Meteor.isServer) {
    Reviews.allow({
        insert: function (userId, doc) {
          return true;
        },

        update: function (userId, doc, fieldNames, modifier) {
          return false;
        },

        remove: function (userId, doc) {
          return false;
        }
    });
}
