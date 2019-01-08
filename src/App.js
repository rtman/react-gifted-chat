import React, { Component } from 'react';
import './App.css';
import { GiftedChat } from './Components/GiftedChat';
import { messages } from './Data/messages';

class App extends Component {
  render() {
    const user = { _id: 1, name: 'Developer' };
    return (
      <div className="App">
        <GiftedChat messages={messages} user={user} />
      </div>
    );
  }
}

export default App;
