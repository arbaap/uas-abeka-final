const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    room: {
      type: String,
      required: true,
    },
    roomid: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
    },
    fromdate: {
      type: String,
      required: true,
    },
    todate: {
      type: String,
      required: true,
    },
    totalhari: {
      type: Number,
      required: true,
    },
    totalharga: {
      type: Number,
      required: true,
    },
    transactionid: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      rqeuired: true,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const bookingModel = mongoose.model("bookings", bookingSchema);

module.exports = bookingModel;
