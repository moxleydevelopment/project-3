import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import DanceStudios from './components/DanceStudios'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={DanceStudios}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
