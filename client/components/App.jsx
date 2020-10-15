import React, { Component } from 'react'
import io from "socket.io-client";
import { CardDeck } from "./CardDeck";
import { ChatBox } from "./ChatBox";

//when deploying io('/')
let socket = io(":3000");


export default class App extends Component {
  state = {
    start: false
  }
  render() {
    return (
      <>
      <h1>Edgars Card Game</h1>
      <div className="Dflex">
        <ChatBox socket={socket} />
        <button
          id="start"
          onClick={() => {
            this.setState({start:true});
            setTimeout(() => {
              socket.emit("get cards");
            }, 1000);
          }}
        >
          START
        </button>
        { this.state.start && <CardDeck socket={socket} />}
      </div>
    </>
    )
  }
}

