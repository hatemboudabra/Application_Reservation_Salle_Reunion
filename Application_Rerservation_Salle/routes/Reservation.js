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
    const meetingRoom = await MeetingRoom.findById(reservation.meetingRoom);
    const userEmail = user.email;
    const info = await transporter.sendMail({
      from: '<hatemboudabra41@gmail.com>', // sender address
      to: "dhiasmairi123@gmail.com, mouhadje@gmail.com ",
      subject: "Confirmation de réservation", // Subject line
      html: `
          <p>Bonjour,</p>
          <p>Veuillez confirmation de réservation :</p>
          <p><strong>User :</strong> ${user.username}</p>
          <p><strong>Date de réservation :</strong> ${reservation.startTime}</p>
          <p><strong>Meeting Room :</strong> ${meetingRoom.name}</p>
          <p><strong>End Date :</strong> ${reservation.endTime}</p>
          <p>Confirmez-vous cette réservation ?</p>
          <p>
              <a href="http://example.com/confirm/yes/${reservation._id}">Oui</a>
              <a href="http://example.com/confirm/no/${reservation._id}">Non</a>
          </p>
      `,
 
    });
  
    console.log("Message sent: %s", info.messageId);
  }
  router.get('/confirm/:id/:response', async (req, res) => {
    try {
      const id = req.params.id;
      const response = req.params.response.toLowerCase(); // "yes" ou "no"
  
      // Recherche de la réservation par son identifiant
      const reservation = await Reservation.findById(id).populate('meetingRoom');
  
      if (!reservation) {
        return res.status(404).send({ message: "Réservation introuvable." });
      }
  
      if (response === "yes") {
        // Mettre à jour le statut de la réservation pour la confirmer
        reservation.confirmed = true;
        await reservation.save();
  
        // Soustraire 1 de la capacité de la salle de réunion associée
        const meetingRoom = reservation.meetingRoom;
        meetingRoom.capacity -= 1;
        await meetingRoom.save();
  
        // Envoyer un e-mail de confirmation
        await sendConfirmationEmail(reservation);
  
        res.send("Réservation confirmée avec succès.");
      } else if (response === "no") {
        // Supprimer la réservation si l'utilisateur ne souhaite pas la confirmer
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
  
  async function sendConfirmationEmail(reservation) {
    try {
      const user = await User.findById(reservation.user);
      const meetingRoom = await MeetingRoom.findById(reservation.meetingRoom);
  
      const info = await transporter.sendMail({
        from: '<hatemboudabra41@gmail.com>', // Adresse e-mail de l'expéditeur
        to: "dhiasmairi123@gmail.com", // Adresse e-mail du destinataire
        subject: "Confirmation de réservation", // Sujet de l'e-mail
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