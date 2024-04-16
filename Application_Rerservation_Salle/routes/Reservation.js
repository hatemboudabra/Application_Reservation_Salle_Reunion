const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const authenticate = require('../midlware/authenticate')
const User = require('../models/User');
const Reservation = require('../models/Reservation');
const MeetingRoom = require('../models/meetingRoom');
const nodemailer = require('nodemailer');
const meetingRoom = require('../models/meetingRoom');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: "hatemboudabra41@gmail.com",
    pass: "tzct gurs efan lbru",
  },
});
router.get('/getreservationbyiduser/:userId', authenticate, (req, res) => {
  const userId = req.params.userId;
  Reservation.find({ user: userId }).populate(['user','meetingRoom'])
    .then(reservations => {
      if (!reservations || reservations.length === 0) {
        return res.status(404).json({ message: 'Reservations not found for this user' });
      }
      res.json(reservations);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
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

router.post('/ajouter', authenticate, async (req, res) => {
  try {
    const reservfromb = req.body;
    const reservationExists = await Reservation.exists({
      meetingRoom: reservfromb.meetingRoom,
      $or: [
        {
          startTime: { $gte: reservfromb.startTime, $lt: reservfromb.endTime }
        },
        {
          endTime: { $gt: reservfromb.startTime, $lte: reservfromb.endTime }
        }
      ]
    });

    if (reservationExists) {
      return res.status(400).json({ message: 'The meeting room is already booked for the selected time .' });
    }

    const reserv = new Reservation(reservfromb);
    const data = await reserv.save();
    await sendEmailNotification(data);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

async function sendEmailNotification(reservation) {
   // const user = await User.findById(reservation.user);
    const meetingRoom = await MeetingRoom.findById(reservation.meetingRoom);
    const user = await User.findById(meetingRoom.user);
    const userEmail = user.email;
    const info = await transporter.sendMail({
      from: '<hatemboudabra41@gmail.com>', 
      to: userEmail,
      subject: "Confirmation de réservation",
      html: `
          <p>Bonjour,</p>
          <p>Veuillez confirmation de réservation :</p>
          <p><strong>User :</strong> ${user.username}</p>
          <p><strong>Date de réservation :</strong> ${reservation.startTime}</p>
          <p><strong>Meeting Room :</strong> ${meetingRoom.name}</p>
          <p><strong>End Date :</strong> ${reservation.endTime}</p>
          <p>Confirmez-vous cette réservation ?</p>
          <p>
              <a href="http://localhost:5000/Reservation/confirm/${reservation._id}/yes">Oui</a>
              <a href="http://localhost:5000/Reservation/confirm/${reservation._id}/no">Non</a>
          </p>
      `,
 
    });
  
    console.log("Message sent: %s", info.messageId);
  }
  router.get('/confirm/:id/:response', async (req, res) => {
   
    try {
      const id = req.params.id;
      const response = req.params.response.toLowerCase(); 
      const reservation = await Reservation.findById(id).populate('meetingRoom');
      const user = await User.findById(reservation.user);
      const userEmail1 = user.email;
        console.log(userEmail1);
      if (!reservation) {
        return res.status(404).send({ message: "Réservation introuvable." });
      }
  
      if (response === "yes") {
       
        reservation.confirmed = true;
        await reservation.save();
        
        const meetingRoom = reservation.meetingRoom;
        meetingRoom.capacity -= 1;
        await meetingRoom.save();
  
        await sendConfirmationEmail(reservation, userEmail1);
  
        res.send("Réservation confirmée avec succès.");
      } else if (response === "no") {
        await Reservation.findByIdAndDelete(id);
        res.send("Réservation annulée avec succès.");
      } else {
        res.status(400).send({ message: "Réponse non valide. Veuillez spécifier 'yes' ou 'no'." });
      }
    } catch (error) {
      console.error("Erreur lors de la confirmation de la réservation :", error);
      res.status(500).send({ message: "Une erreur est survenue lors de la confirmation de la réservation." });
    }
  });
  
  async function sendConfirmationEmail(reservation , userEmail1) {
    try {
      const user = await User.findById(reservation.user);
      const meetingRoom = await MeetingRoom.findById(reservation.meetingRoom);
  
      const info = await transporter.sendMail({
        from: '<hatemboudabra41@gmail.com>', 
        to: userEmail1,
        subject: "Confirmation de réservation", 
        html: `
          <p>Bonjour ${user.username},</p>
          <p>Votre réservation pour la salle de réunion "${meetingRoom.name}" a été confirmée avec succès.</p>
          <p>Date de début : ${reservation.startTime}</p>
          <p>Date de fin : ${reservation.endTime}</p>
        `,
      });
  
      console.log("E-mail de confirmation envoyé :", info.messageId);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'e-mail de confirmation :", error);
    }
  }
  
module.exports = router;