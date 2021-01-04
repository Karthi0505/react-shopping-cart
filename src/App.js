import React, { Component } from "react";
import './styles/App.scss';
import FishIcon from './images/fish_icon.png';
import Crab from './images/crab.jpg';
import Vanjaram from './images/vanjaram.jpg';
import Fish2 from './images/yellow-fishes.jpg';
import Fish3 from './images/grill-fishes.jpg';
import Fish4 from './images/cut-fishes.jpg';

import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AdminScreen from "./screens/AdminScreen";

//feature 1
class App extends React.Component {
    render() {        
        return ( 
            <Provider store={store}>
              <BrowserRouter>
                  <div className="App grid-container">

                     <header>
                       <div className="container d-flex align-items-center justify-content-between"> 
                           <Link to="/">
                              <img src={FishIcon} alt="Kadal to Kitchen logo" />
                           </Link>                       
                           <Link to="/admin" className="text-light">Admin</Link>
                        </div>
                     </header>
                     <main>
                        <Route path="/admin" component={AdminScreen} />
                        <Route path="/" component={HomeScreen} exact />
                     </main>
                     
                     <footer className="d-flex justify-content-center align-items-center">
                           <p>All right is reserved</p>
                     </footer>
                  </div>
              </BrowserRouter>
          </Provider>
        );
    }
}
export default App;