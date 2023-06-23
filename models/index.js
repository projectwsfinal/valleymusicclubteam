const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'User first name required']
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: [true, 'User last name required']
    },
    username: {
        type: String,
        required: [true, 'Username required']
    },
    password: {
        type: String,
        required: [true, 'Password required']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Please enter a valid email'
        },
        required: [true, 'Email required']
    },
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number`
        },
        required: [true, 'User phone number required']
    },
    juniorParticipants: {
        type: Number
    },
    adultParticipants: {
        type: Number
    },
})

const studentSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'User first name required']
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: [true, 'User last name required']
    },
    birthdate: {
        type: Date
    },
    user_id: {
        type: String,
        required: [true, 'User ID required']
    },
})

const eventSchema = new Schema({
    performance_type_ID: {
        type: String,
        required: [true, 'Performance type ID required']
    },
    class_level_ID: {
        type: String,
        required: [true, 'Class level ID required']
    },
    term_ID: {
        type: String,
        required: [true, 'Term ID required']
    },
    event_date: {
        type: Date,
        required: [true, 'Event date required']
    },
    event_start_time: {
        type: Date,
        required: [true, 'Event start time required']
    },
    event_end_time: {
        type: Date,
        required: [true, 'Event end time required']
    },
    student_ID: {
        type: String,
        required: [true, 'Student ID required']
    },
})



const User = mongoose.model('users', userSchema);
const Student = mongoose.model('students', studentSchema);
const Event = mongoose.model('events', eventSchema);

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
// db.users = require('./users.js')(mongoose);
db.users = User;
db.students = Student;
db.events = Event;

module.exports = db;