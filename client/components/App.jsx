import React, { useState } from "react";
import io from "socket.io-client";
import { CardDeck } from "./CardDeck";
import { ChatBox } from "./ChatBox";

//when deploying io('/')
let socket = io(":3000");

const App = () => {
  const [start, setStart] = useState(false);

  return (
    <>
      <h1>Edgars Card Game</h1>
      <div className="Dflex">
        <ChatBox socket={socket} />
        <button
          id="start"
          onClick={() => {
            setStart(true);
            setTimeout(() => {
              socket.emit("get cards");
            }, 1000);
          }}
        >
          START
        </button>
        { start && <CardDeck socket={socket} />}
      </div>
    </>
  );
};

export default App;
