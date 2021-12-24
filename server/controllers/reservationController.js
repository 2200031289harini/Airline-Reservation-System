const Reservation = require("../models/Reservation");
const Flight = require("../models/Flight");

deleteReservation = async (req, res) => {
    await Reservation.findByIdAndDelete({ _id: req.params.id }, (err, reservation) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
  
      if (!reservation) {
        return res
          .status(404)
          .json({ success: false, error: `Reservation not found` });
      }
  
      return res.status(200).json({ success: true, data: reservation});
    }).catch((err) => console.log(err));
  };

  getReservationById = (req, res) => {
     Reservation.find({UserId: req.params.id }, (err, reservation) =>{
        console.log(reservation);
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
  
      if (!reservation) {
        return res
          .status(404)
          .json({ success: false, error: "Reservation not found" });
      }
      return res.status(200).json({ success: true, data: reservation});
    })
    .populate({path: 'Reservation.FlightId', select:['DepartureTime', 'ArrivalTime', 'DepartureDate', 'ArrivalDate','DepartureAirport', 'DepartureTermnal', 'ArrivalAirport', 'ArrivalTerminal', 'TripDuration']})
    .catch((err) => console.log(err));
  };

  updateReservationFlight = (req, res) => {
    const reservationId = req.params.id
    const body = req.body
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a body to update",
      });
    }
    Reservation.findOne({_id: req.params.id}).then((reservation) => {
        var filterOld = {}
        var filterDec = { _id: body.OldFlightId };
        var updateDec = {};
        var updateOld = {};
        switch (body.OldCabinClass) {
          case "Economy":
            filterOld = {_id: body.OldFlightId, "EconomySeats.Seats.Seat": body.OldChosenSeat};
            updateOld = {$set: {"EconomySeats.Seats.$.Reserved": false }};
            updateDec = { $inc: {"EconomySeats.AvailableSeats": 1 }};
            break;
          case "Business":
            filterOld = {_id: body.OldFlightId, "BusinessSeats.Seats.Seat": body.OldChosenSeat};
            updateOld = {$set: {"BusinessSeats.Seats.$.Reserved": false }};
            updateDec = { $inc: {"BusinessSeats.AvailableSeats": 1 }};
            break;
          case "FirstClass":
            filterOld = {_id: body.OldFlightId, "FirstClassSeats.Seats.Seat": body.OldChosenSeat};
            updateOld = {$set: {"FirstClassSeats.Seats.$.Reserved": false }};
            updateDec = { $inc: {"FirstClassSeats.AvailableSeats": 1 }};
            break;
        }
        Flight.findOneAndUpdate(filterDec, updateDec, { new: true }, (err, flight) => {
          if (err) {
            console.log("error");
          }
        });
        Flight.findOneAndUpdate(filterOld, updateOld, { new: true }, (err, flight) => {
          if (err) {
            console.log("error");
          }
        });
        var filterNew = {}
        var filterInc = { _id: body.NewFlightId };
        var updateInc = {};
        var updateNew = {};
        switch (body.NewCabinClass) {
          case "Economy":
            filterNew = {_id: body.NewFlightId , "EconomySeats.Seats.Seat": body.NewChosenSeat};
            updateNew= {$set: {"EconomySeats.Seats.$.Reserved": true }};
            updateInc = {$inc: {"EconomySeats.AvailableSeats": -1 }};
            break;
          case "Business":
            filterNew = {_id: body.NewFlightId , "BusinessSeats.Seats.Seat": body.NewChosenSeat};
            updateNew = {$set: {"BusinessSeats.Seats.$.Reserved": true }};
            updateInc = {$inc: {"BusinessSeats.AvailableSeats": -1 }};
            break;
          case "FirstClass":
            filterNew = {_id: body.NewFlightId , "FirstClassSeats.Seats.Seat": body.NewChosenSeat};
            updateNew = {$set: {"FirstClassSeats.Seats.$.Reserved": true }};
            updateInc = {$inc: {"FirstClassSeats.AvailableSeats": -1 }};
            break;
        }
        Flight.findOneAndUpdate(filterInc, updateInc, { new: true }, (err, flight) => {
          if (err) {
            console.log("error");
          }
        });
        Flight.findOneAndUpdate(filterNew, updateNew, { new: true }, (err, flight) => {
          if (err) {
            console.log("error");
          }
        });
    });
    
    const filter = {_id: req.params.id, "Reservation.FlightId": body.OldFlightId, "Reservation.ChosenSeat": body.OldChosenSeat }
    const update = {
      $set: {
        "Reservation.$.PassengerFirstName": body.PassengerFirstName,
        "Reservation.$.PassengerLastName": body.PassengerLastName,
        "Reservation.$.PassengerType": body.PassengerType,
        "Reservation.$.PassengerPassportNumber": body.PassengerPassportNumber,
        "Reservation.$.FlightId": body.NewFlightId,
        "Reservation.$.CabinClass": body.NewCabinClass,
        "Reservation.$.ChosenSeat": body.NewChosenSeat,
      },
    };
    
    Reservation.findOneAndUpdate(filter, update, { new: true })
      .then((reservation) => {
        console.log(reservation)
        console.log(reservation._id);
        return res.status(200).json({
          success: true,
          id: reservation._id,
          data: reservation,
          message: "Reservation updated!",
        });
      })
      .catch((error) => {
        console.log(error)
        return res.status(404).json({
          error,
          message: "Reservation not updated!",
        });
      });
  }

  updateReservationSeat = (req, res) => {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a body to update",
      });
    }
       const filterSeatArray = {_id: req.params.id, "Reservation.FlightId": body.FlightId, "Reservation.ChosenSeat": body.OldChosenSeat }
        const updateSeatArray = {$set:{"Reservation.$.ChosenSeat": body.NewChosenSeat}}
        var filterOld = {}
        var filterNew = {};
        var updateNew = {};
        var updateOld = {};
        switch (body.CabinClass) {
          case "Economy":
            filterOld = {_id: body.FlightId, "EconomySeats.Seats.Seat": body.OldChosenSeat};
            filterNew = {_id: body.FlightId, "EconomySeats.Seats.Seat": body.NewChosenSeat};
            updateOld = {$set: { "EconomySeats.Seats.$.Reserved": false }}
            updateNew = {$set: { "EconomySeats.Seats.$.Reserved": true }};
            break;
          case "Business":
            filterOld = {_id: body.FlightId, "BusinessSeats.Seats.Seat": body.OldChosenSeat};
            filterNew = {_id: body.FlightId, "BusinessSeats.Seats.Seat": body.NewChosenSeat};
            updateOld = {$set: { "BusinessSeats.Seats.$.Reserved": false }}
            updateNew = {$set: { "BusinessSeats.Seats.$.Reserved": true }};
            break;
          case "FirstClass":
            filterOld = {_id: body.FlightId, "FirstClassSeats.Seats.Seat": body.OldChosenSeat};
            filterNew = {_id: body.FlightId, "FirstClassSeats.Seats.Seat": body.NewChosenSeat};
            updateOld = {$set: { "FirstClassSeats.Seats.$.Reserved": false }}
            updateNew = {$set: { "FirstClassSeats.Seats.$.Reserved": true }};
            break;
        }
        Flight.findOneAndUpdate(filterNew, updateNew, { new: true }, (err, flight) => {
          if (err) {
            console.log("error");
          }
        });
        Flight.findOneAndUpdate(filterOld, updateOld, { new: true }, (err, flight) => {
          if (err) {
            console.log("error");
          }
        });
    Reservation.findOneAndUpdate(filterSeatArray, updateSeatArray, { new: true })
      .then((reservation) => {
        return res.status(200).json({
          success: true,
          id: reservation._id,
          data: reservation,
          message: "Reservation updated!",
        });
      })
      .catch((error) => {
        console.log(error)
        return res.status(404).json({
          error,
          message: "Reservation not updated!",
        });
      });
  };
   
 createReservation = (req, res) => {
   var reser =  Reservation.create(req.body)
      .then((reservation) =>
        res.json({ msg: "Reservation added successfully", data: reservation._id })
      )
      .catch((err) =>
        res.status(400).json({ error: err})
      );
  };

  sendReservationDetails = (req, res) => {
    Reservation.findOne({ _id: req.params.id },
         (err, reservation) =>{
         console.log(reservation);
       if (err) {
         return res.status(400).json({ success: false, error: err });
       }
   
       if (!reservation) {
         return res
           .status(404)
           .json({ success: false, error: "Reservation not found" });
       }
       //return res.status(200).json({ success: true, data: reservation});
     
     User.findById(reservation.UserId, " FirstName Email", (err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log(user.Email);
        let mailTransporter = nodemailer.createTransport({
          service: "hotmail",
          auth: {
            user: "cheetosmym1@outlook.com",
            pass: "Acltestingmail.1",
          },
        });
        console.log(user);
        let mail="";
        console.log("wwwwwwwwwwwwwwwwwwwwww");
        console.log(reservation);
        for(let i=0;i<reservation.Reservation.length;i++){
          mail= mail+
         " with the following details "+"\n" +"ticket number: "+(i+1)+"\n"
         +"Passenger First Name:  "+ reservation.Reservation[i].PassengerFirstName+"\n" +
            
            "\n "+"Passenger LastName : "+reservation.Reservation[i].PassengerLastName +
           // "\n "+"Flight id : "+reservation.Reservation[i].FlightId +
            "\n "+"Passenger Type : "+reservation.Reservation[i].PassengerType +
            "\n "+"Passenger PassportNumber : "+reservation.Reservation[i].PassengerPassportNumber +
            
  
            "\n "+"Cabin Class : "+reservation.Reservation[i].CabinClass +
            "\n "+"Chosen Seat :"+reservation.Reservation[i].ChosenSeat 
            
          
          let x= Flight.findOne({_id: reservation.Reservation[i].FlightId}).then((flight) => {
            mail=mail+"Flight number: "+flight.FlightNumber+"\n"
          +"Departure Date: "+flight.DepartureDate+"\n"
          +"Departure Time: "+flight.DepartureTime+"\n"
          +"Arrival Date: "+flight.ArrivalDate+"\n"
          +"Arrival Time: "+flight.ArrivalTime+"\n"
          +"Departure Airport: "+flight.DepartureAirport+"\n"
          +"Arrival Airpirt: "+flight.ArrivalAirport+"\n"
          +"Departure Terminal: "+flight.DepartureTerminal+"\n"
          +"Arrival Terminal: "+flight.ArrivalTerminal+"\n"
          +"trip Duration: "+flight.TripDuration+"\n"});
         
         
        }
        let mailDetails = {
          from: "cheetosmym1@outlook.com",
          to: user.Email,
          subject: "Flight Confirmation",
          text:
            "Dear " +
            user.FirstName +
            " , \n This email serves as a notification that your reservation was booked sucessfully." + 
            "with confirmation number " + reservation._id + 
            "\n " +
            mail+
            " total Price : " +
            reservation.TotalPrice,
  
        };
        mailTransporter.sendMail(mailDetails, function (err, data) {
          if (err) {
            console.log("Error Occured", err);
          } else {
            console.log("Email sent successfully");
          }
        });
      }
    });
  })
    }


  module.exports = {
    deleteReservation,
    createReservation,
    getReservationById,
    updateReservationSeat,
    updateReservationFlight,
    sendReservationDetails
  };