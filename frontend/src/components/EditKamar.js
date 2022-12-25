import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function EditKamar() {
  const [name, setname] = useState("");
  const [harga, setharga] = useState();
  const [alamat, setalamat] = useState();
  const [fasilitas, setfasilitas] = useState();
  const [no_telp, setno_telp] = useState();
  const [kategori, setkategori] = useState();
  const [imageurl1, setimageurl1] = useState();
  const [imageurl2, setimageurl2] = useState();
  const [imageurl3, setimageurl3] = useState();

  const { id } = useParams();

  useEffect(() => {
    getroomsbyid();
  }, []);

  const getroomsbyid = async () => {
    const res = await axios.get(`/api/rooms/getroomsbyid/${id}`);
    setname(res.data.name);
    setharga(res.data.harga);
    setalamat(res.data.alamat);
    setfasilitas(res.data.fasilitas);
    setno_telp(res.data.no_telp);
    setkategori(res.data.kategori);
    setimageurl1(res.data.imageurls[0]);
    setimageurl2(res.data.imageurls[1]);
    setimageurl3(res.data.imageurls[2]);

    console.log(getroomsbyid);
  };

  const editkamar = async (e) => {
    await axios.patch(`/api/rooms/editkamar/${id}`, {
      name,
      harga,
      alamat,
      fasilitas,
      no_telp,
      kategori,
      imageurls: [imageurl1, imageurl2, imageurl3],
    });
    Swal.fire("Okay", "Berhasil Edit Kamar", "success").then((result) => {
      window.location.href = "/admin";
    });
  };
  return (
    <div className="m-3 bs">
      <h2 className="text-center">
        <b>Edit Kamar</b>
      </h2>

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
            <button className="btn btn-success mt-2" onClick={editkamar}>
              Edit Kamar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditKamar;
