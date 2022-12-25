const express = require("express");
const router = express.Router();

const Room = require("../models/room");

router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
});

router.post("/getroombyid", async (req, res) => {
  const roomid = req.body.roomid;
  try {
    const room = await Room.findOne({ _id: roomid });
    res.send(room);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
});

router.post("/addroom", async (req, res) => {
  try {
    const newroom = new Room(req.body);
    await newroom.save();
    res.send("Berhasil Tambah Kamar");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/hapuskamar/:id", async (req, res) => {
  try {
    const hapusroom = await Room.deleteOne({ _id: req.params.id });
    res.send(hapusroom);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// progres edit

router.get("/getroomsbyid/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.json(room);
  } catch (error) {
    res.status(404).json({ message: err });
  }
});

router.patch("/editkamar/:id", async (req, res) => {
  try {
    const edit = await Room.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(edit);
  } catch (error) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
