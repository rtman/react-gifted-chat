import React, { Component } from 'react';
import './App.css';
import { GiftedChat } from './Components/GiftedChat';
import { messages } from './Data/messages';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GiftedChat messages={messages} />
      </div>
    );
  }
}

export default App;
