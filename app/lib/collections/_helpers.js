Schemas = {};


SchemaCommons = {
    ownerField: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function () {
            if (this.isInsert) {
                return Meteor.userId();
            } else if (this.isUpsert) {
                return {$setOnInsert: Meteor.userId()};
            } else {
                this.unset();
            }
        }
    }
};


/*
 * UpdateHistory
 *
 * Automatic update history keeping for mongodb documents.
 *
 * UpdateHistory builds a sub-schema by coping the tracked fields from the
 * collection previous schemas and persisting these as the collection is
 * updated. Because such copy happens, the "default schema" must be attached
 * before attaching UpdateHistory's.
 * Usage example:
 *
 *
 * var Users = new Mongo.Collection('users');
 * users.attachSchema(new SimpleSchema({
 *     username: {type: String},
 *     emails: {type: [String]}
 * }));
 * users.attachSchema(new UpdateHistory(Users, ['username']).toSchema());
 *
 * Here, the `username` property will be tracked. At every update,
 * its value will be copied to an entry in the `_history` array, along with
 * the current timestamp and the ID of the user which modified the document.
 *
 * Notes:
 *
 *     1. The **creator** of a document is the user with ID equals to
 *        `doc._history[0].author`; whereas the timestamp of a document's
 *        creation is `doc._history[0].updatedAt`.
 *     3. The timestamp of a document's last update is
 *        `doc._history[-1].updatedAt`.
 *
 */
UpdateHistory = function(options) {
    var self = this;

    self.logChanges = function(schema) {
        var log = {},
            // If the document doesn't exist, oldDoc becomes the empty dict {}
            oldDoc = options.collection.findOne({_id: schema.docId}) || {};

        // Compares every tracked field's current set value to the original
        // one. If they differ, the field and updated value are inserted
        // into the history.
        for (var field of options.fields) {
            var schemaField = schema.field(field);

            if (!schemaField.isSet) continue;

            if (schemaField.value !== oldDoc[field]) {
                log[field] = schemaField.value;
            }
        }

        log['author'] = schema.userId;
        log['updatedAt'] = new Date();

        return schema.isInsert ? [log] : {$push: log};
    };

    self.toSchema = function () {
        var collectionSchema = options.collection.simpleSchema().schema();

        var historySchema = {
            _history: {
                type: [Object],
                optional: true,
                autoValue: function() {
                    return self.logChanges(this);
                }
            },
            '_history.$.author': {
                type: String,
            },
            '_history.$.updatedAt': {
                type: Date,
            },
        };

        for (var field of options.fields) {
            // Copy all tracked fields' types to
            // their mirrors  in the history log.
            var type = collectionSchema[field].type;

            if (type === Array) {
                // If type is array, we must check its inner type.
                type = [collectionSchema[field + '.$'].type];
            }

            historySchema['_history.$.' + field] = {
                type: type,
                optional: true
            };
        }

        return historySchema;
    }
};
