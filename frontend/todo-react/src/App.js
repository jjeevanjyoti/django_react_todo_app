import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';

import { BrowserRouter as Router, Route} from 'react-router-dom'
import TodoList from './components/TodoList';
import  User from './components/User';
function App() {
  return (
    <div className="App">

        <Header />
        <Router>
        <div className="container-fluid">
            <div className="row TOP">
              <div className="col-sm-3"></div>
              <div className="col-sm-6">
              <Route exact path="/" component={User} />
              </div>
              <div className="col-sm-3"></div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row TOP">
              <div className="col-sm-3"></div>
              <div className="col-sm-6">
              <Route exact path="/todolist" component={TodoList} />
              </div>
              <div className="col-sm-3"></div>
            </div>
          </div>

      </Router>
        
        {/* <div className="container-fluid">
            <div className="row TOP">
              <div className="col-sm-3"></div>
              <div className="col-sm-6">
                <TodoList />
              </div>
              <div className="col-sm-3"></div>
            </div>
          </div> */}
    </div>
  );
}

export default App;
