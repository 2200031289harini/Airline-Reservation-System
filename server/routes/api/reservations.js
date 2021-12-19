const express = require("express");

const router = express.Router();

const reservationController = require('../../controllers/reservationController')

const Reservation = require("../../models/Flight");

router.get("/getreservation/:id", reservationController.getReservationById)

router.delete("/deletereservation/:id",reservationController.deleteReservation)

router.post("/createreservation",reservationController.createReservation)


module.exports = router;