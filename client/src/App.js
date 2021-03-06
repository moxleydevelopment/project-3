import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import DanceStudios from './components/DanceStudios'
import DanceStudio from './components/DanceStudio'
import DanceClass from './components/DanceClass'
import NavBar from './components/NavBar'
import './App.css';


function App() {

  

  return (
    <div className="App">
      <NavBar/>
      <div className='wapper-container'> 
        <Router>
        <Switch>

          <Route exact path="/" component={DanceStudios}/>
          <Route path='/dancestudio/:studioId/danceclass/:classId' component={DanceClass}/>
          <Route path='/dancestudio/:studioId' component={DanceStudio}/>
          
        </Switch>
      </Router>
      </div>
      
    </div>
  );
}

export default App;
