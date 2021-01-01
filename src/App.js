import React, { Component } from "react";
import './styles/App.scss';
import FishIcon from './images/fish_icon.png';
import Crab from './images/crab.jpg';
import Vanjaram from './images/vanjaram.jpg';
import Fish2 from './images/yellow-fishes.jpg';
import Fish3 from './images/grill-fishes.jpg';
import Fish4 from './images/cut-fishes.jpg';

import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

import store from "./store";
import { Provider } from "react-redux";

//feature 1
class App extends React.Component {

    constructor(){
        super();
        this.state = {
            cartItems: localStorage.getItem("cartItems")
                ? JSON.parse(localStorage.getItem("cartItems"))
                : [],
                //means there is no item in cart by default
        };
    }
    createOrder = (order) => {
        alert("Need to save order for " + order.name)
    };
    removeFromCart = (product) => {
        const cartItems = this.state.cartItems.slice();
        this.setState({
            cartItems: cartItems.filter(x => x._id !== product._id),
        });
        localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItems.filter(x => x._id !== product._id))
        );
    };
    addToCart = (product) => {
        const cartItems = this.state.cartItems.slice();
        let alreadyInCart = false;
        cartItems.forEach((item) => {
            if (item._id === product._id) {
                item.count++;
                alreadyInCart = true;
            }
        });
        if (!alreadyInCart) {
            cartItems.push({ ...product, count: 1 })
        }
        this.setState({ cartItems });
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    };
   

    render() {  
        
        return ( 
          <Provider store={store}>
            <div className="App grid-container">

                <header className="d-flex align-items-center">
                    <a href="/">
                        <img src={FishIcon} alt="Kadal to Kitchen logo" />
                    </a>
                </header>
                <main>
                    <div className="container">
                        <div className="content row">
                            <div className="main col-md-9 mr-sm-auto col-lg-9 pt-3 px-4">
                                <Filter></Filter>
                                <Products addToCart={this.addToCart}></Products>
                            </div>
                            <aside className="sidebar col-md-3 d-none d-md-block ">

                                <Cart 
                                    cartItems={this.state.cartItems} 
                                    removeFromCart={this.removeFromCart}
                                    createOrder={this.createOrder}
                                />

                            </aside>
                        </div>
                    </div>
                </main>
                
                <footer className="d-flex justify-content-center align-items-center">
                    <p>All right is reserved</p>
                </footer>
            </div>
          </Provider>
        );
    }
}
export default App;