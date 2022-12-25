import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";
import { Card } from "react-bootstrap";

function TampilanBooking({ match }) {
  const [room, setroom] = useState(true);
  const { roomid } = useParams();
  const { fromdate } = useParams();
  const { todate } = useParams();
  const [totalharga, settotalharga] = useState();
  const [firstImage, setfirstImage] = useState();

  const totalhari = moment(todate, "DD-MM-YYYY").diff(
    moment(fromdate, "DD-MM-YYYY"),
    "days"
  );

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("pelanggan")) {
        window.location.reload = "/login";
      }

      try {
        const data = (
          await axios.post("/api/rooms/getroombyid", {
            roomid,
          })
        ).data;
        settotalharga(data.harga * totalhari);
        setroom(data);
        setfirstImage(data.imageurls[0]);
      } catch (err) {}
    })();
  }, []);

  async function bookRoom() {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("pelanggan"))._id,
      fromdate: fromdate,
      todate: todate,
      totalharga,
      totalhari,
    };

    try {
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
      Swal.fire("Selamat", "Booking Berhasil", "success").then((result) => {
        window.location.href = "/profile";
      });
      console.log(result);
    } catch (error) {
      console.log(error);
      Swal.fire("Gagal", "Kesalahan Terjadi", "error");
    }
  }

  return (
    <div className="row justify-content-around bs m-5">
      <div className="col-4">
        <Card.Title
          style={{
            color: "#366536",
            fontWeight: "bold",
          }}
        >
          {room.name}
        </Card.Title>
        <Card.Img
          variant="top"
          src={firstImage}
          style={{
            borderRadius: "35px 15px 35px 15px",
            margin: "10px 0px 10px 0px",
          }}
        />
        <p>{room.fasilitas} </p>
      </div>
      <div className="col-4">
        <Card.Body
          style={{
            textAlign: "right",
          }}
        >
          <Card.Title
            style={{
              color: "#366536",
              fontWeight: "bold",
              fontSize: "40px",
            }}
          >
            {JSON.parse(localStorage.getItem("pelanggan")).name}
          </Card.Title>
          <br />
          <Card.Text>
            <b> Dari: </b> {fromdate} s / d {todate}
          </Card.Text>
          <Card.Text>
            <b> Lama Menginap: </b>
            {""} {totalhari}
            Hari
          </Card.Text>
          <Card.Text>
            <b> Harga Kamar: </b> Rp. {room.harga}
          </Card.Text>
          <Card.Text>
            <b> Total Harga: </b> Rp. {totalharga}
          </Card.Text>
          <br />
          <button className="btn btn-primary" onClick={bookRoom}>
            Pay Now
          </button>
        </Card.Body>
      </div>
    </div>
  );
}

export default TampilanBooking;
