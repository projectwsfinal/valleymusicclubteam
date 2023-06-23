const db = require('../models');
const mongoose = require('mongoose');
const User = db.users;
const Student = db.students;
const Event = db.events;

exports.validateUser = (req, res, next) => {
    const user = new User({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        juniorParticipants: req.body.juniorParticipants,
        adultParticipants: req.body.adultParticipants
    });

    let error = user.validateSync();

    if (error) {
        res.status(412).send({message: error.message});
    } else {
        next();
    }
}

exports.validateStudent = (req, res, next) => {
    const student = new Student({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        birthdate: req.body.birthdate,
        user_id: req.body.user_id
    });

    let error = student.validateSync();

    if (error) {
        res.status(412).send({message: error.message});
    } else {
        next();
    }
}

exports.validateEvent = (req, res, next) => {
    const event = new Event({
        performance_type_ID: req.body.performance_type_ID,
        class_level_ID: req.body.class_level_ID,
        term_ID: req.body.term_ID,
        event_date: req.body.event_date,
        event_start_time: req.body.event_start_time,
        event_end_time: req.body.event_end_time,
        student_ID: req.body.student_ID    
    });

    let error = event.validateSync();

    if (error) {
        res.status(412).send({message: error.message});
    } else {
        next();
    }
}

exports.validateInstrument = (req, res, next) => {
    const instrument = new Instrument({
        instrument: req.body.instrument_name,
    });

    let error = instrument.validateSync();

    if (error) {
        res.status(412).send({message: error.message});
    } else {
        next();
    }
}