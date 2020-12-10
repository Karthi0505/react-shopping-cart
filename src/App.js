import React, { Component } from "react";
import './styles/App.scss';
import FishIcon from './images/fish_icon.png';

import  data from './data.json5';
import Products from "./components/Products";

//feature 1
class App extends Component {

    constructor(){
        super();
        this.state = {
            products: data.products,
            size:"",
            sort:""
        }
    }

    render() {  
        
        return( 
            <div className="App grid-container">

                <header className="d-flex align-items-center">
                    <a href="/">
                        <img src={FishIcon} alt="Kadal to Kitchen logo" />
                    </a>
                </header>
                <main>
                    <div className="container">
                        <div className="content row">
                            <div className="main col-md-9 mr-sm-auto col-lg-10 pt-3 px-4">
                                <Products products={this.state.products} />
                            </div>
                            <aside className="sidebar col-md-2 d-none d-md-block ">

                            </aside>
                        </div>
                    </div>
                </main>
                <h1 className="text-primary"> Hello, World! </h1>
                
                <footer className="d-flex justify-content-center align-items-center">
                    <p>All right is reserved</p>
                </footer>
            </div>
        );
    }
}
export default App;