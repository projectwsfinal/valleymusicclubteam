const db = require('../models');
const mongoose = require('mongoose');
const Instrument = db.instrument;

exports.createInstrument = (req, res) => {
    if (!req.body.instrument) {
        res.status(400).send({ message: 'Content cannot be empty!' });
        return;
    }

    // Create a Instrument
    const instrument = new Instrument();

    instrument.instrument = req.body.instrument,

    instrument.validateSync();

    // Save Instrument in the database
    instrument
        .save(instrument)
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the instrument.',
            });
        });
};

exports.getAllInstruments = (req, res) => {
    instrument.find(
        {},
        {
            instrument: 1,
            _id: 0
        }
    )
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving instruments.',
            });
        });
}

exports.getInstrument = (req, res) => {
    const _id = req.params._id;

    instrument.find({ _id: _id })
        .then((data) => {
            if (!data)
                res
                    .status(404)
                    .send({ message: 'Not found instrument with id ' + _id });
            else res.status(201).send(data[0]);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Error retrieving instrument with _id=' + _id,
            });
        });
}

exports.updateInstrument = (req, res) => {
  if (!req.body) {
      return res.status(400).send({
          message: 'Data to update cannot be empty!',
      });
  }

  const _id = req.params._id;

  instrument.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
      .then((data) => {
          if (!data) {
              res.status(404).send({
                  message: `Cannot update instrument with id=${_id}. Maybe instrument was not found.`,
              });
          } else res.status(201).send({ message: 'Instrument was updated successfully' });
      })
      .catch((err) => {
          res.status(500).send({
              message: err.message || 'Error updating instrument with id=' + _id,
          });
      });
};

exports.deleteInstrument = (req, res) => {
  const _id = req.params._id;

  instrument.findByIdAndRemove(_id)
    .then((data) => {
      res.status(204).send({ message: 'Removed instrument: ', data });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || 'Some error occurred while deleting the instrument' });
    })
}