
import React from 'react';
import ReactDOM from 'react-dom';
import MainCSS from './stylesheets/main.scss';
import io from 'socket.io-client';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
const Socket = io.connect(window.location.host, {reconnect: true});

console.log(process.env.NODE_ENV);

Socket.emit('connected', {status: '[SOCKETS] -- socket.io Connected'});


const initialState = [
    {
      id: 0,
      name: 'Product 1',
      quantity: 0
    },
    {
      id: 1,
      name: 'Product 2',
      quantity: 0
    }
];

const productState = (state = initialState, action) => {
    if (action.type == 'ADD_TO_CART') {
        state[action.index].quantity += 1
        return (state);
    }
    return (state);
}

const store = createStore(
    combineReducers({
      productState
  })
)


const Product = (props) => {
    return (
      <div>
      <h2>{props.name}</h2>
      <p>Quantity:  {props.quantity}</p>
      <button onClick={() => store.dispatch({
          type: 'ADD_TO_CART',
          index: props.id
      })}>Click Me</button>
      </div>
    )

}

const Header = () => {
  return (
    <div>Product(s) in Cart :
    {store.getState().productState.reduce((prodA, prodB) => (
      prodA.quantity + prodB.quantity
    ))}
    </div>
  )
}

const App = () => {
    return (
      <div>
        <Header />
        {
          store.getState().productState.map((product) => {
            return (
              <Product
                key={Math.random()}
                name={product.name}
                quantity={product.quantity}
                id={product.id}
              />
            )
          })
        }
      </div>
    )
}

console.log('Hello World');
const Render = () => {
    ReactDOM.render(<App />, document.getElementById('main'));
}
Render();
store.subscribe(() => {
  Render();
})
