Issues = new Mongo.Collection('issues');

Schemas.issues = new SimpleSchema({
    content: {
        type: String
    },
    owner: SchemaCommons.ownerField,
    open: {
        type: Boolean,
        autoValue: function () {
            if (this.isInsert) {
                return true
            }
        }
    },
    createdAt: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date()
            }

            this.unset()
        }
    }
})

Issues.attachSchema(Schemas.issues)

if (Meteor.isServer) {
  Issues.allow({
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
