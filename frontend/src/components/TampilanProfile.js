import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { Tag } from "antd";

function TampilanProfile() {
  const user = JSON.parse(localStorage.getItem("pelanggan"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    } else {
    }
  }, []);

  return (
    <div className="m-3 bs">
      <Tab.Container id="left-tabs-example" defaultActiveKey="history">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="profile">My Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="history">History</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="profile">
                {" "}
                <h1>Name : {user.name}</h1>
                <h1>Email : {user.email}</h1>
                <h1>isAdmin : {user.isAdmin ? "Yes" : "No"}</h1>
              </Tab.Pane>
              <Tab.Pane eventKey="history">
                <MyBookings />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      {/* <Tabs defaultActiveKey="2">
        <TabPane tab="Profile" key="1">
          <h1>My Profile</h1>
          <br />
          <h1>Name : {user.name}</h1>
          <h1>Email : {user.email}</h1>
          <h1>isAdmin : {user.isAdmin ? "Yes" : "No"}</h1>
        </TabPane>
        <TabPane tab="History" key="2">
          <h1>History Bookings</h1>
          <MyBookings />
        </TabPane>
      </Tabs> */}
    </div>
  );
}

export default TampilanProfile;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("pelanggan"));
  const [bookings, setbookings] = useState();

  useEffect(() => {
    (async () => {
      try {
        const data = await (
          await axios.post("/api/bookings/getbookingsbyuserid", {
            userid: user._id,
          })
        ).data;
        console.log(data);
        setbookings(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className="bs">
                  <h1 className="hist-jdl">{booking.room}</h1>
                  <br />
                  <p>
                    <b>BookingId : </b> {booking._id}
                  </p>
                  <p>
                    <b>CheckIn : </b> {booking.fromdate}
                  </p>
                  <p>
                    <b>CheckOut : </b> {booking.todate}
                  </p>
                  <p>
                    <b>Total Harga : </b> {booking.totalharga}
                  </p>
                  <p>
                    <b>Status</b> :{" "}
                    {booking.status === "Pending" ? (
                      <Tag color="purple">Pending</Tag>
                    ) : (
                      <Tag color="green">Sudah Bayar</Tag>
                    )}
                  </p>

                  <button
                    className="btn btn-warning btn-sm"
                    style={{ float: "right" }}
                  >
                    Upload Pembayaran
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
