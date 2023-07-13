const db = require('../models');
const mongoose = require('mongoose');
const User = db.users;

exports.createUser = (req, res) => {
    // Validate request

    /* #swagger.parameters['user'] = {
    in: 'body',
    schema: {
      $firstName: '',
      $middleName: '',
      $lastName: '',
      $username: '',
      $password: '',
      $email: '',
      $phone: '',
      $juniorParticipants: 0,
      $adultParticipants: 0
    }
  } */

    if (!req.body.firstName) {
        res.status(400).send({ message: 'Content cannot be empty!' });
        return;
    }

    // Create a User
    const user = new User();

    user.firstName = req.body.firstName,
    user.middleName = req.body.middleName,
    user.lastName = req.body.lastName,
    user.username = req.body.username,
    user.password = req.body.password,
    user.email = req.body.email,
    user.phone = req.body.phone,
    user.juniorParticipants = req.body.juniorParticipants,
    user.adultParticipants = req.body.adultParticipants,

    // Save User in the database
    user
        .save(user)
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((err) => {
            res.status(500).json({
                message: 'Some error occurred while creating the User.',
            });
        });
};

exports.getAllUsers = (req, res) => {
    User.find(
        {},
        {
            firstName: 1,
            middleName: 1,
            lastName: 1,
            username: 1,
            password: 1,
            email: 1,
            phone: 1,
            juniorParticipants: 1,
            adultParticipants: 1,
            _id: 0,
        }
    )
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving users.',
            });
        });
}

exports.getUser = (req, res) => {
    const _id = req.params._id;

    User.find({ _id: _id })
        .then((data) => {
            if (!data)
                res
                    .status(404)
                    .send({ message: 'Not found User with id ' + _id });
            else res.status(201).send(data[0]);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Error retrieving User with _id=' + _id,
            });
        });
}

exports.updateUser = (req, res) => {
  /* #swagger.parameters['user'] = {
    in: 'body',
    schema: {
      $firstName: '',
      $middleName: '',
      $lastName: '',
      $username: '',
      $password: '',
      $email: '',
      $phone: '',
      $juniorParticipants: 0,
      $adultParticipants: 0
    }
  } */

  if (!req.body) {
      return res.status(400).send({
          message: 'Data to update cannot be empty!',
      });
  }

  const _id = req.params._id;

  User.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
      .then((data) => {
          if (!data) {
              res.status(404).send({
                  message: `Cannot update User with id=${_id}. Maybe User was not found.`,
              });
          } else res.status(201).send({ message: 'User was updated successfully' });
      })
      .catch((err) => {
          res.status(500).send({
              message: err.message || 'Error updating User with id=' + _id,
          });
      });
};

exports.deleteUser = (req, res) => {
  const _id = req.params._id;

  User.findByIdAndRemove(_id)
    .then((data) => {
      res.status(204).send({ message: 'Removed User: ', data });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || 'Some error occurred while deleting the user' });
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