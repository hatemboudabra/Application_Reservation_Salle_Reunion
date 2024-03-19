const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const authenticate = require('../midlware/authenticate')
const User = require('../models/User');
const Reservation = require('../models/Reservation');
const nodemailer = require('nodemailer');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "hatemboudabra41@gmail.com",
    pass: "tzct gurs efan lbru",
  },
});

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

router.post('/ajouter', authenticate, (req, res) => {
  let reservfromb = req.body;

  let reserv = new Reservation(reservfromb);

  reserv.save().then(
    (data) => {
      sendEmailNotification(data);
      res.send(data);
    },
    (error) => {
      console.log(error);
      res.send(error);
    }
  );
});

async function sendEmailNotification(reservation) {
    const user = await User.findById(reservation.user);
    const userEmail = user.email;
    const info = await transporter.sendMail({
      from: '<hatemboudabra41@gmail.com>', // sender address
      to: "dhiasmairi123@gmail.com, mouhadje@gmail.com ",
      subject: "", // Subject line
 
    });
  
    console.log("Message sent: %s", info.messageId);
  }
module.exports = router;