import axios from "axios";
import React, { useEffect, useState } from "react";

import KamarHotel from "../components/KamarHotel";
import { DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

function TampilanHome() {
  const [rooms, setrooms] = useState([]);
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [dupliacterooms, setdupliacterooms] = useState([]);
  const [searchkey, setsearchkey] = useState();
  const [kategori, setkategori] = useState("all");

  useEffect(() => {
    (async () => {
      try {
        const data = (await axios.get("/api/rooms/getallrooms")).data;

        setrooms(data);
        setdupliacterooms(data);
      } catch (err) {
        console.log("error");
      }
    })();
  }, []);

  function filterBySearch() {
    const temprooms = dupliacterooms.filter((room) =>
      room.name.toLowerCase().includes(searchkey.toLowerCase())
    );

    setrooms(temprooms);
  }

  function filterByType(e) {
    setkategori(e);

    if (e !== "all") {
      const temprooms = dupliacterooms.filter(
        (room) => room.kategori.toLowerCase() === e.toLowerCase()
      );
      setrooms(temprooms);
    } else {
      setrooms(dupliacterooms);
    }
  }

  function filterByDate(dates) {
    console.log(dates);
    setfromdate(dates[0].format("DD-MM-YYYY"));
    settodate(dates[1].format("DD-MM-YYYY"));

    let temprooms = [];
    let availability = false;
    for (const room of dupliacterooms) {
      if (room.pelanggan.length > 0) {
        for (const booking of room.pelanggan) {
          if (
            !moment(dates[0].format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            ) &&
            !moment(dates[1].format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            )
          ) {
            if (
              dates[0].format("DD-MM-YYYY") !== booking.fromdate &&
              dates[1].format("DD-MM-YYYY") !== booking.todate &&
              dates[0].format("DD-MM-YYYY") !== booking.fromdate &&
              dates[1].format("DD-MM-YYYY") !== booking.todate
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability === true || room.pelanggan.length === 0) {
        temprooms.push(room);
      }

      setrooms(temprooms);
    }
  }

  return (
    <div className="container">
      <div className="rangepics">
        <RangePicker
          style={{
            margin: "-50px",
            width: "150px",
          }}
          format="DD-MM-YYYY"
          onChange={filterByDate}
        />
      </div>
      <div className="row">
        <h1 className="judul">Abeka Hotel's</h1>

        <div className="col-sm">
          <input
            type="text"
            className="form-control"
            placeholder="cari kamar"
            value={searchkey}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-sm">
          {" "}
          <select
            className="form-control custom-select"
            value={kategori}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="deluxe">Deluxe</option>
            <option value="family">Family</option>
            <option value="non-deluxe">Non-Deluxe</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {rooms.length > 0
          ? rooms.map((room) => {
              return (
                <div className="col-md-9 mt-3">
                  <KamarHotel room={room} fromdate={fromdate} todate={todate} />
                </div>
              );
            })
          : console.log("err")}
      </div>
    </div>
  );
}

export default TampilanHome;
