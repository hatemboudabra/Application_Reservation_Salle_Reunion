const express = require('express');
const multer = require('multer');
const router = express.Router();
const bodyParser = require('body-parser');
const authenticate = require('../midlware/authenticate')
const MeetingRoom = require('../models/meetingRoom');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
filename = '';

const storage1 = multer.diskStorage(
    {
    destination : './upload/admin',
    filename: function(req, file, cb){
        date = Date.now();
        filename = date + '.' + file.mimetype.split('/')[1]
        cb(null, filename);
       

    },
    }
);
const upload =  multer ({storage: storage1});
router.get('/all', authenticate,(req, res) => {
  MeetingRoom.find().then(
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

  MeetingRoom.findOneAndUpdate({ _id: id }, a, { new: true }).then(
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
    MeetingRoom.findByIdAndDelete({ _id: id }).then(
    (deleted) => {
      res.send(deleted);
    },
    (err) => {
      res.send(err);
    }
  );
});
router.post('/ajouter'  , upload.any('image'), authenticate,(req, res) => {
  console.log(req.body);
  let meetfromb = req.body;
  let meetingRoom = new MeetingRoom(meetfromb);
  meetingRoom.image=filename;
  meetingRoom.save().then(
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
router.get('/getroombyiduser/:userId', authenticate, (req, res) => {
  const userId = req.params.userId;
  MeetingRoom.find({ user: userId })
    .then(rooms => {
      if (!rooms || rooms.length === 0) {
        return res.status(404).json({ message: 'Meeting rooms not found for this user' });
      }
      res.json(rooms);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});


module.exports = router;
