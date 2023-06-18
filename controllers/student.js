const db = require('../models');
const mongoose = require('mongoose');
const Student = db.students;

exports.createStudent = (req, res) => {
    // Validate request

    /* #swagger.parameters['student'] = {
    in: 'body',
    schema: {
      $firstName: '',
      $middleName: '',
      $lastName: '',
      $birthdate: '',
      $user_id: ''
    }
  } */

    if (!req.body.firstName) {
        res.status(400).send({ message: 'Content cannot be empty!' });
        return;
    }

    // Create a User
    const student = new Student();

    student.firstName = req.body.firstName,
    student.middleName = req.body.middleName,
    student.lastName = req.body.lastName,
    student.birthdate = req.body.birthdate,
    student.user_id = req.body.user_id,

    student.validateSync();

    // Save User in the database
    student
        .save(student)
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the student.',
            });
        });
};

exports.getAllStudents = (req, res) => {
    Student.find(
        {},
        {
            firstName: 1,
            middleName: 1,
            lastName: 1,
            birthdate: 1,
            user_id: 1,
            _id: 0
        }
    )
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving students.',
            });
        });
}

exports.getStudent = (req, res) => {
    const _id = req.params._id;

    Student.find({ _id: _id })
        .then((data) => {
            if (!data)
                res
                    .status(404)
                    .send({ message: 'Not found Student with id ' + _id });
            else res.status(201).send(data[0]);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Error retrieving Student with _id=' + _id,
            });
        });
}

exports.updateStudent = (req, res) => {
  /* #swagger.parameters['student'] = {
    in: 'body',
    schema: {
      $firstName: '',
      $middleName: '',
      $lastName: '',
      $birthdate: '',
      $user_id: ''
    }
  } */

  if (!req.body) {
      return res.status(400).send({
          message: 'Data to update cannot be empty!',
      });
  }

  const _id = req.params._id;

  Student.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
      .then((data) => {
          if (!data) {
              res.status(404).send({
                  message: `Cannot update Student with id=${_id}. Maybe Student was not found.`,
              });
          } else res.status(201).send({ message: 'Student was updated successfully' });
      })
      .catch((err) => {
          res.status(500).send({
              message: err.message || 'Error updating Student with id=' + _id,
          });
      });
};

exports.deleteStudent = (req, res) => {
  const _id = req.params._id;

  Student.findByIdAndRemove(_id)
    .then((data) => {
      res.status(204).send({ message: 'Removed Student: ', data });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || 'Some error occurred while deleting the student' });
    })
}

// const mongodb = require('../db/connect');
// const ObjectId = require('mongodb').ObjectId;

// const getAllUsers = async (req, res) => {
//     mongodb
//       .getDb()
//       .db()
//       .collection('users')
//       .find()
//       .toArray((err, lists) => {
//         if (err) {
//           res.status(400).json({ message: err });
//         }
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(lists);
//       });
//   };

// const getUser = async (req, res) => {
//     const userId = new ObjectId(req.params._id);
//     mongodb
//       .getDb()
//       .db()
//       .collection('users')
//       .find({ _id: userId })
//       .toArray((err, result) => {
//         if (err) {
//           res.status(400).json({ message: err });
//         }
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(result[0]);
//       });
//   };

// const createUser = async (req, res) => {
//     const user = {
//         firstName: req.body.firstName,
//         middleName: req.body.middleName,
//         lastName: req.body.lastName,
//         username: req.body.username,
//         password: req.body.password,
//         email: req.body.email,
//         phone: req.body.phone,
//         juniorParticipants: req.body.juniorParticipants,
//         adultParticipants: req.body.adultParticipants,
//     };
//     const response = await mongodb.getDb().db().collection('users').insertOne(user);
//     if (response.acknowledged) {
//         res.status(201).json(response);
//     } else {
//         res.status(500).json(response.error || 'Some error occurred while creating the user.');
//     }
//   };
  
// const updateUser = async (req, res) => {
//     if (!ObjectId.isValid(req.params._id)) {
//         res.status(400).json('Must use a valid user id to update a contact.');
//     }
//     const userId = new ObjectId(req.params._id);
//     // be aware of updateOne if you only want to update specific fields
//     const user = {
//         firstName: req.body.firstName,
//         middleName: req.body.middleName,
//         lastName: req.body.lastName,
//         username: req.body.username,
//         password: req.body.password,
//         email: req.body.email,
//         phone: req.body.phone,
//         juniorParticipants: req.body.juniorParticipants,
//         adultParticipants: req.body.adultParticipants,
//     };
//     const response = await mongodb
//         .getDb()
//         .db()
//         .collection('users')
//         .replaceOne({ _id: userId }, user);
//     console.log(response);
//     if (response.modifiedCount > 0) {
//         res.status(204).send();
//     } else {
//         res.status(500).json(response.error || 'Some error occurred while updating the contact.');
//     }
//   };
  
//   const deleteUser = async (req, res) => {
//     if (!ObjectId.isValid(req.params._id)) {
//       res.status(400).json('Must use a valid user id to delete a contact.');
//     }
//     const userId = new ObjectId(req.params._id);
//     const response = await mongodb.getDb().db().collection('users').remove({ _id: userId }, true);
//     console.log(response);
//     if (response.deletedCount > 0) {
//       res.status(204).send();
//     } else {
//       res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
//     }
//   };
  
  // module.exports = {
  //   getAllUsers,
  //   getUser,
  //   createUser,
  //   updateUser,
  //   deleteUser
  // };