import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  state = {
    status: 'off',
    time: 0,
    timer: null,
  } 
  
  show(){
    switch(this.state.status){
      case 'off': 
      return (
        <div>
          <h1>Protect your eyes</h1>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
          <button className="btn btn-close" onClick={this.closeApp}>X</button>
          <button className="btn" value='work' onClick={this.startTimer}>Start</button>
        </div>
      );
      case 'work':
        return (
          <div>
            <img src="./images/work.png" />
            <div className="timer">
              {this.formatTime()}
            </div>
            <button className="btn" value='off' onClick={this.stopTimer}>Stop</button>
            <button className="btn btn-close" onClick={this.closeApp}>X</button>
          </div>
        );
      
      case 'rest':
      return (
        <div>
          <img src="./images/rest.png" />
          <div className="timer">
            {this.formatTime()}
          </div>
          <button className="btn" value='off' onClick={this.stopTimer}>Stop</button>
          <button className="btn btn-close" onClick={this.closeApp}>X</button>
        </div>
      )}
    };
    
    stopTimer = () => {
      clearInterval(this.state.timer)
      this.setState({
        status: 'off',
        timer: null,
      })
    }
    
    step = () => {
      if(this.state.time === 0 && this.state.status === 'work'){
        this.playBell();
        this.setState({
          status: 'rest',
          time: 10,
        })
      }
      else if (this.state.time === 0 && this.state.status === 'rest'){
        this.playBell();
        this.setState({
          status: 'work',
          time: 20,
        })
      }
      
       else {
            this.setState({
            time: this.state.time - 1,
          })
      }
    };
    
    playBell = () => {
      const bell = new Audio('./sounds/bell.wav');
      bell.play();
    };

    startTimer = () => {

      this.setState({
        timer: setInterval(this.step, 1000),
        status: 'work',
        time: 10,
      });

    };
    
    closeApp = () => {
      window.close();
    }
    
    formatTime = () => {
      let minutes = Math.floor(this.state.time / 60);
      let seconds = this.state.time % 60;
      
      if(minutes < 10){
        minutes = `0${minutes}`
      }
      
      if(seconds < 10){
        seconds = `0${seconds}`
      }
      
      return `${minutes}:${seconds}`
    }
    

  render(){ 
    return (
      <div>
        {this.show()}
      </div>
    )}
};

render(<App />, document.querySelector('#app'));
