

Meteor.publish('universities', function () {
    if (!!this.userId) {
        return Universities.find();
    }
});


Meteor.publish('university', function(universityId) {
    if (!!this.userId) {
        return Universities.find({_id: universityId});
    }
});


Meteor.publish('department', function (departmentId) {
    if (!!this.userId) {
        return Departments.find({_id: departmentId});
    }
});


Meteor.publish('course', function (courseId) {
    if (!!this.userId) {
        return Courses.find({_id: courseId});
    }
});


Meteor.publish('issues', function() {
    if (!!this.userId) {
        return Issues.find();
    }
});


Meteor.publish('university.departments', function (universityId) {
    if (!!this.userId) {
        return Departments.find({universityId: universityId});
    }
});


Meteor.publish('department.courses', function (departmentId) {
    if (!!this.userId) {
        return Courses.find({departmentId: departmentId});
    }
});


Meteor.publish('course.classes', function (courseId) {
    if (!!this.userId) {
        return Classes.find({courseId: courseId});
    }
});


Meteor.publish('users.exists', function () {
    return Meteor.users.find({}, {fields: {_id: 1, emails: 1}});
});
