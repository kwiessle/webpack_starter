
import React from 'react';
import ReactDOM from 'react-dom';
import MainCSS from './stylesheets/main.scss';
import io from 'socket.io-client';
const Socket = io.connect(window.location.host, {reconnect: true});

Socket.emit('connected', {message: '[SOCKETS] -- socket.io Connected'});



class Hello extends React.Component {
  render () {
    return (
      <div className="hud">
        React Main Component here.
      </div>
    );
  }
}

ReactDOM.render(<Hello />, document.getElementById('main'));
