import React from 'react';
import { browserHistory as history, Router } from 'react-router';
import routes from './routes';
import './scss/main.scss';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Router history={history} routes={routes} />
      </div>
    );
  }
}

export default App;
