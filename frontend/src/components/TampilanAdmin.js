import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function Adminscreen() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("pelanggan")).isAdmin) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className="m-3 bs">
      <h2 className="text-center">
        <b>Admin Panel</b>
      </h2>
      <Tabs
        defaultActiveKey="adminbooking"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="adminbooking" title="Data Booking">
          <Bookings />
        </Tab>
        <Tab eventKey="adminroom" title="Data Kamar">
          <Rooms />
        </Tab>
        <Tab eventKey="admintambahkamar" title="Tambah Kamar">
          <Addroom />
        </Tab>
        <Tab eventKey="adminuser" title="Data Pengguna">
          <Users />
        </Tab>
      </Tabs>
      {/* <Tabs defaultActiveKey="1" className="mb-3" fill>
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add Rooms" key="3">
          <Addroom />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs> */}
    </div>
  );
}

export default Adminscreen;

// Admin Boooking

export function Bookings() {
  const [bookings, setbookings] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await (
          await axios.get("/api/bookings/getallbookings")
        ).data;
        setbookings(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  async function approve(bookingid, roomid) {
    try {
      const result = await (
        await axios.post("/api/bookings/approvepembayaran", {
          bookingid,
          roomid,
        })
      ).data;
      console.log(result);
      Swal.fire("Okay", "Pembayaran Diterima", "success").then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      Swal.fire("oops", "something went wrong", "error");
    }
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Bookings</h1>
        <table className="table table-bordered ">
          <thead className="">
            <tr>
              <th>No</th>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
              <th>Bukti Transaksi</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length &&
              bookings.map((booking, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromdate}</td>
                    <td>{booking.todate}</td>
                    <td>{booking.status}</td>

                    <td className="col-1">
                      {booking.status !== "pending" && (
                        <button
                          className="appr btn-success"
                          onClick={() => {
                            approve(booking._id, booking.roomid);
                          }}
                        >
                          Approve Pembayaran
                        </button>
                      )}
                      <button className="appr btn-info">
                        Lihat Bukti Pembayaran
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ADMIN LIST KAMAR

export function Rooms() {
  const [rooms, setrooms] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await (await axios.get("/api/rooms/getallrooms")).data;
        setrooms(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const hapusKamar = (id) => {
    axios.delete(`/api/rooms/hapuskamar/${id}`).then((res) => {
      console.log(res);
      Swal.fire("Okay", "Delete Kamar Berhasil", "success").then((result) => {
        window.location.reload();
      });
    });
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Rooms</h1>

        <table className="table table-bordered ">
          <thead className="">
            <tr>
              <th>No</th>
              <th>Room Id</th>
              <th>Nama Hotel</th>
              <th>Kategori</th>
              <th>Alamat</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {rooms.length &&
              rooms.map((room, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td className="col-2">{room.kategori}</td>
                    <td>{room.alamat}</td>
                    <td className="col-2">Rp. {room.harga}</td>
                    <td>
                      <button
                        className="crud btn-danger"
                        onClick={() => hapusKamar(room._id)}
                      >
                        Hapus
                      </button>
                      <Link to={`editkamar/${room._id}`}>
                        <button className="crud btn-success">Edit</button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Users list Components

export function Users() {
  const [users, setusers] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await (await axios.get("/api/users/getallusers")).data;
        setusers(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users</h1>
        <table className="table table-bordered ">
          <thead className="">
            <tr>
              <th>No</th>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>is Admin</th>
            </tr>
          </thead>

          <tbody>
            {users &&
              users.map((user, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "Admin" : "Pengguna"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Add Room Component

export function Addroom() {
  const [name, setname] = useState("");
  const [harga, setharga] = useState();
  const [alamat, setalamat] = useState();
  const [fasilitas, setfasilitas] = useState();
  const [no_telp, setno_telp] = useState();
  const [kategori, setkategori] = useState();
  const [imageurl1, setimageurl1] = useState();
  const [imageurl2, setimageurl2] = useState();
  const [imageurl3, setimageurl3] = useState();

  async function addRoom() {
    const newroom = {
      name,
      harga,
      alamat,
      fasilitas,
      no_telp,
      kategori,
      imageurls: [imageurl1, imageurl2, imageurl3],
    };

    console.log(newroom);

    try {
      const result = await (
        await axios.post("/api/rooms/addroom", newroom)
      ).data;
      console.log(result);
      Swal.fire("Okay", "Berhasil Tambah Kamar", "success").then((result) => {
        window.location.href = "/admin";
      });
    } catch (error) {
      console.log(error);
      Swal.fire("oops", "something went wrong", "error");
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <label className="labelform">Nama Kamar</label>
        <input
          type="text"
          className="form-control"
          placeholder="Masukkan Nama Kamar"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
        <label className="labelform">Harga</label>
        <input
          type="text"
          className="form-control"
          placeholder="Masukkan Harga Kamar"
          value={harga}
          onChange={(e) => {
            setharga(e.target.value);
          }}
        />
        <label className="labelform">Alamat</label>
        <input
          type="text"
          className="form-control"
          placeholder="Masukkan Alamat"
          value={alamat}
          onChange={(e) => {
            setalamat(e.target.value);
          }}
        />
        <label className="labelform">Fasilitas</label>
        <input
          type="text"
          className="form-control"
          placeholder="Masukkan Fasilitas"
          value={fasilitas}
          onChange={(e) => {
            setfasilitas(e.target.value);
          }}
        />
        <label className="labelform">Nomor Telepon</label>
        <input
          type="text"
          className="form-control"
          placeholder="Masukkan Nomor Telepon"
          value={no_telp}
          onChange={(e) => {
            setno_telp(e.target.value);
          }}
        />
      </div>
      <div className="col-md-5">
        <label className="labelform">Kategori</label>
        <select
          id="inputState"
          className="form-control custom-select"
          value={kategori}
          onChange={(e) => {
            setkategori(e.target.value);
          }}
        >
          <option>Deluxe</option>
          <option>Family</option>
          <option>Non-Deluxe</option>
        </select>
        <label className="labelform">Gambar 1</label>
        <input
          type="text"
          className="form-control"
          placeholder="Masukkan Gambar 1"
          value={imageurl1}
          onChange={(e) => {
            setimageurl1(e.target.value);
          }}
        />
        <label className="labelform">Gambar 2</label>
        <input
          type="text"
          className="form-control"
          placeholder="Masukkan Gambar 2"
          value={imageurl2}
          onChange={(e) => {
            setimageurl2(e.target.value);
          }}
        />
        <label className="labelform">Gambar 3</label>
        <input
          type="text"
          className="form-control"
          placeholder="Masukkan Gambar 3"
          value={imageurl3}
          onChange={(e) => {
            setimageurl3(e.target.value);
          }}
        />

        <div className="text-right">
          <button className="btn btn-primary mt-2" onClick={addRoom}>
            Tambah Kamar
          </button>
        </div>
      </div>
    </div>
  );
}
