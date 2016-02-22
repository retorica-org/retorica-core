// Template helpers

Template.registerHelper('not', function (expression) {
    return !expression;
});

Template.registerHelper('and', function (a, b) {
    return a && b;
});

Template.registerHelper('equals', function (a, b) {
    return a === b;
});

Template.registerHelper('empty', function (l) {
    return !l || l.length == 0;
});

Template.registerHelper('localDate', function (date) {
    return date ? date.toLocaleDateString() : '';
});

Template.registerHelper('localDateTime', function (date) {
    return date ? date.toLocaleString() : '';
});

Template.registerHelper('randomColor', function (seed) {
    var randomColorIndex = Math.floor(Math.random()*Retorica.colors.length);
    return Retorica.colors[randomColorIndex];
});
