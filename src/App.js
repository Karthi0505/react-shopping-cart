import React, { Component } from "react";
import './styles/App.scss';
import FishIcon from './images/fish_icon.png';

import Button from 'react-bootstrap/Button';

class App extends Component {
    render() {
  
        return( 
            <div className="App grid-container">

                <header className="d-flex align-items-center">
                    <a href="/">
                        <img src={FishIcon} alt="Kadal to Kitchen logo" />
                    </a>
                </header>

                <h1 className="text-primary"> Hello, World! </h1>
                
                <footer className="d-flex justify-content-center align-items-center">
                    <p>All right is reserved</p>
                </footer>
            </div>
        );
    }
}
export default App;