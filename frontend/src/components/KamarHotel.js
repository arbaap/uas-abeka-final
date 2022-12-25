import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";

function KamarHotel({ room, fromdate, todate }) {
  return (
    <div className="row datahotel">
      <div className="col-sm">
        <Card style={{ width: "18rem", marginLeft: "20px", marginTop: "20px" }}>
          <Card.Img
            variant="top"
            src={room.imageurls[0]}
            style={{ padding: "10px" }}
          />
          <Card.Body>
            <Card.Title
              style={{
                color: "#366536",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              {room.name}
            </Card.Title>
            <Card.Text>{room.alamat}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Harga : Rp. {room.harga}</ListGroup.Item>
            <ListGroup.Item>Phone Number : {room.no_telp}</ListGroup.Item>
            <ListGroup.Item>Kategori : {room.kategori}</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
              <button className="btn btn-primary">Book Now</button>
            </Link>
          </Card.Body>
        </Card>
      </div>
      <div className="col-sm">
        <h1 className="desk">Gallery</h1>
        <Carousel>
          {room.imageurls.map((url) => {
            return (
              <Carousel.Item>
                <img className="d-block w-100 bigimg" src={url} alt="" />
              </Carousel.Item>
            );
          })}
        </Carousel>
        <Card.Text style={{ marginTop: "30px" }}>{room.fasilitas}</Card.Text>
      </div>
    </div>
  );
}

export default KamarHotel;