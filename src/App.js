import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';

class App extends Component {
  constructor(){
    super();
    this.state = {};
  }

  onClickButton(){

    fetch('http://localhost:5000/api/speech-to-text/token')
    .then((response) =>{
      console.log('respsone.text is',response.text());
        return response.text();
    }).then((token) => {

      console.log('token is',token)

    var stream = recognizeMic(Object.assign(token, {
      objectMode: true, // send objects instead of text
      format: false // optional - performs basic formatting on the results such as capitals an periods
  }));

      /**
       * Prints the users speech to the console
       * and assigns the text to the state.
       */
      stream.on('data',(data) => {
        console.log('data is',data);
        this.setState({
          text: data.alternatives[0].transcript
        })

        // console.log(data.alternatives[0].transcript)
      });
      stream.on('error', function(err) {
          console.log(err);
      });
      document.querySelector('#stop').onclick = stream.stop.bind(stream);
    }).catch(function(error) {
        console.log('failed to connect to watson',error);
    });
  };
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <button id="button" onClick={this.onClickButton.bind(this)}>Listen To Microphone</button>
        <div className="App-Text">{this.state.text}</div> 
        </div>
      );
    }
}

export default App;
