const db = require('../models');
const mongoose = require('mongoose');
const User = db.users;
const Student = db.students;

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