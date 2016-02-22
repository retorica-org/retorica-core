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


UpdateHistory = function(collection, fields) {
    this.collection = collection;
    this.fields = fields;

    this.logChanges = function(schema) {
        var log = {},
            // If the document doesn't exist, oldDoc becomes the empty dict {}
            oldDoc = this.collection.findOne({_id: schema.docId}) || {};

        // Compares every tracked field's current set value to the original
        // one. If they differ, the field and updated value are inserted
        // into the history.
        for (var field of this.fields) {
            var schemaField = schema.field(field);

            if (schemaField.isSet && schemaField.value !== oldDoc[field]) {
                log[field] = schemaField.value;
            }
        }

        log['author'] = schema.userId;
        log['updatedAt'] = new Date();

        return schema.isInsert ? [log] : {$push: log};
    }

    this.toSchema = function () {
        var collectionSchema = this.collection.simpleSchema().schema(),
            self = this;

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

        for (var field of this.fields) {
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
