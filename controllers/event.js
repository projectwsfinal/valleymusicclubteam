const db = require('../models');
const mongoose = require('mongoose');
const Event = db.events;

exports.createEvent = (req, res) => {
    // Validate request

    /* #swagger.parameters['event'] = {
    in: 'body',
    schema: {
      $performance_type_ID: '',
      $class_level_ID: '',
      $term_ID: '',
      $event_date: '',
      $event_start_time: '',
      $event_end_time: '',
      $student_ID: ''
    }
  } */

    if (!req.body.firstName) {
        res.status(400).send({ message: 'Content cannot be empty!' });
        return;
    }

    // Create a User
    const event = new Event();

    event.performance_type_ID = req.body.performance_type_ID,
    event.class_level_ID = req.body.class_level_ID,
    event.term_ID = req.body.term_ID,
    event.event_date = req.body.event_date,
    event.event_start_time = req.body.event_start_time,
    event.event_end_time = req.body.event_end_time,
    event.student_ID = req.body.student_ID,

    event.validateSync();

    // Save User in the database
    event
        .save(event)
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the event.',
            });
        });
};

exports.getAllEvents = (req, res) => {
    Event.find(
        {},
        {
            performance_type_ID: 1,
            class_level_ID: 1,
            term_ID: 1,
            event_date: 1,
            event_start_time: 1,
            event_end_time: 1,
            student_ID: 1,
            _id: 0
        }
    )
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving events.',
            });
        });
}

exports.getEvent = (req, res) => {
    const _id = req.params._id;

    Event.find({ _id: _id })
        .then((data) => {
            if (!data)
                res
                    .status(404)
                    .send({ message: 'Not found Event with id ' + _id });
            else res.status(201).send(data[0]);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Error retrieving Event with _id=' + _id,
            });
        });
}

exports.updateEvent = (req, res) => {
  /* #swagger.parameters['event'] = {
    in: 'body',
    schema: {
      $performance_type_ID: '',
      $class_level_ID: '',
      $term_ID: '',
      $event_date: '',
      $event_start_time: '',
      $event_end_time: '',
      $student_ID: ''
    }
  } */

  if (!req.body) {
      return res.status(400).send({
          message: 'Data to update cannot be empty!',
      });
  }

  const _id = req.params._id;

  Event.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
      .then((data) => {
          if (!data) {
              res.status(404).send({
                  message: `Cannot update Event with id=${_id}. Maybe Event was not found.`,
              });
          } else res.status(201).send({ message: 'Event was updated successfully' });
      })
      .catch((err) => {
          res.status(500).send({
              message: err.message || 'Error updating Event with id=' + _id,
          });
      });
};

exports.deleteEvent = (req, res) => {
  const _id = req.params._id;

  Event.findByIdAndRemove(_id)
    .then((data) => {
      res.status(204).send({ message: 'Removed event: ', data });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || 'Some error occurred while deleting the event' });
    })
}
  
  // module.exports = {
  //   createEvent,
  //   getAllEvents,
  //   getEvent,
  //   updateEvent,
  //   deleteEvent
  // };