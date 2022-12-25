const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const moment = require("moment");
const Room = require("../models/room");

// Fungsi Book Room {bookroom} TampilanBooking
router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalhari, totalharga } = req.body;

  try {
    const newbooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromdate,
      todate,
      totalhari,
      totalharga,
      transactionid: "xxcjiu90312",
    });

    const booking = await newbooking.save();

    const roomtemp = await Room.findOne({ _id: room._id });

    roomtemp.pelanggan.push({
      bookingid: booking._id,
      fromdate: fromdate,
      todate: todate,
      userid: userid,
      status: "Transaksi Diterima",
    });
    await roomtemp.save();

    res.send("Berhasil Boking Kamar");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/getbookingsbyuserid", async (req, res) => {
  const userid = req.body.userid;

  try {
    const bookings = await Booking.find({ userid: userid });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Admin
router.post("/approvepembayaran", async (req, res) => {
  const { bookingid, roomid } = req.body;

  try {
    const bookingitem = await Booking.findOne({ _id: bookingid });

    bookingitem.status = "Sudah Bayar";
    await bookingitem.save();

    const room = await Room.findOne({ _id: roomid });

    // const bookings = room.pelanggan;

    // const temp = bookings.filter(
    //   (booking) => booking.bookingid.toString() !== bookingid
    // );
    // room.pelanggan = temp;

    // await room.save();

    res.send("Okay");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
