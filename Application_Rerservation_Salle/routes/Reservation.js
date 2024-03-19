const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const authenticate = require('../midlware/authenticate')
const Reservation = require('../models/Reservation');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/all', authenticate,(req, res) => {
    Reservation.find().populate(['user','meetingRoom']).then(
    (data) => {
      res.send(data);
    },
    (err) => {
      res.send(err);
    }
  );
});

router.put('/:id',authenticate, (req, res) => {
  let id = req.params.id;
  let a = req.body;

  Reservation.findOneAndUpdate({ _id: id }, a, { new: true }).then(
    (updated) => {
      res.send(updated);
    },
    (err) => {
      res.send(err);
    }
  );
});

router.delete('/:id',authenticate, (req, res) => {
  let id = req.params.id;
  Reservation.findByIdAndDelete({ _id: id }).then(
    (deleted) => {
      res.send(deleted);
    },
    (err) => {
      res.send(err);
    }
  );
});

router.post('/ajouter',authenticate, (req, res) => {
    console.log(req.body);
  let reservfromb = req.body;
 
  let reserv = new Reservation(reservfromb);

  reserv.save().then(
    (data) => {
      console.log(data);
      res.send(data);
    },
    (error) => {
      console.log(error);
      res.send(error);
    }
  );
});

module.exports = router;