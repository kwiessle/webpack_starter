import React from 'react';
import ReactDOM from 'react-dom';
let zdp = "ZDP ZDP";
import MainCSS from './stylesheets/main.scss';

console.log('Hello World');
console.log('Webpack ' + zdp);

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
