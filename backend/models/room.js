const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    alamat: {
      type: String,
      required: true,
    },
    no_telp: {
      type: Number,
      required: true,
    },
    harga: {
      type: Number,
      required: true,
    },
    imageurls: [],
    pelanggan: [],
    kategori: {
      type: String,
      required: true,
    },
    fasilitas: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const roomModel = mongoose.model("rooms", roomSchema);

module.exports = roomModel;
