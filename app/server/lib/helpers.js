seed = function (collection, seeds) {
    if (!collection.find().count()) {
        for (var u of seeds) {
            collection.insert(u);
        }
    }
}
