const express = require("express");
const router = express.Router();

var jwt = require("jsonwebtoken");

const locals = require("../models/locals");
const users = require("../models/users");
const appointment = require("../models/appointment");

router.post("/", async (req, res) => {
  console.log(req)
  const decoded = jwt.decode(req.headers.token);

  dateToAppoinment = new Date(
    req.body.year,
    req.body.month - 1,
    req.body.day,
    req.body.hour - 3,
    req.body.minute
  );

  const findLocalToAppoinment = await locals.findOne(
    { _id: req.body.idLocal },
    async function (err, results) {
      if (err) return res.send("Local to make appoinment does not exist");
      else{
        const newAppointment = new appointment({
            idLocal: req.body.idLocal,
            idUser: decoded.user,
            status: "pending",
            date: dateToAppoinment,
          });

          console.log(newAppointment)
        
          await newAppointment.save();
        
          res.send("Appointment created succesfuly");
      }
    }
  );
});

module.exports = router;
