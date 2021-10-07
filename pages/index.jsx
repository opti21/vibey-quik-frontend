import { useState, useEffect } from "react";
import Pusher from "pusher-js";

export default function Home() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher("94254303a6a5048bf191", {
      cluster: "us2",
    });

    const channel = pusher.subscribe("requests");
    channel.bind("new-request", function (data) {
      setRequests([data]);
    });
  });

  return (
    <>
      <h1>Janky Vibey</h1>
      <div id="request-container">
        {requests.map((request) => {
          return (
            <div>
              {request.requester} requested {request.message}
            </div>
          );
        })}
      </div>
    </>
  );
}
