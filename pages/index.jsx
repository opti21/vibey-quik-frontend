import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

export default function Home() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const pusher = new Pusher("94254303a6a5048bf191", {
      cluster: "us2",
    });

    const addRequest = (newRequest) =>
      setRequests((prevReqs) => [newRequest, ...prevReqs]);

    const channel = pusher.subscribe("requests");
    channel.bind("new-request", function (data) {
      addRequest(data);
      console.log(data);
    });
  }, []);

  return (
    <>
      <Container>
        <h1>Janky Vibey</h1>
        <div id="request-container">
          {requests.map((request, index) => {
            return (
              <Card key={index} style={{ margin: "30px" }}>
                <Card.Header style={{ fontWeight: "bold" }}>
                  {request.message}
                </Card.Header>
                <div id="card-text" style={{ padding: "10px" }}>
                  {request.requester}
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </>
  );
}
