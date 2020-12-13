import React, { Component } from "react";
import './styles/App.scss';
import FishIcon from './images/fish_icon.png';

import  data from './data.json5';
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

//feature 1
class App extends Component {

    constructor(){
        super();
        this.state = {
            products: data.products,
            cartItems: [], //means there is no item in cart by default
            size:"",
            sort:""
        }
    }
    removeFromCart = (product) => {
        const cartItems = this.state.cartItems.slice();
        this.setState({
            cartItems: cartItems.filter(x=> x._id !== product._id),
        })
        
    }
    addToCart = (product) => {
        const cartItems = this.state.cartItems.slice();
        let alreadyInCart = false;
        cartItems.forEach((item) => {
            if(item._id === product._id) {
                item.count++;
                alreadyInCart = true;
            }
        });
        if(!alreadyInCart){
            cartItems.push({...product, count:1})
        }
        this.setState({cartItems})
    }
    sortProducts = (event) => {
        console.log(event.target.value);

        const sort = event.target.value;
        this.setState( (state)=>({
            sort: sort,
            products: this.state.products.slice().sort((a,b)=>(
                sort === "lowest" ? //if sort value is equal to 'lowest'
                    ( (a.price > b.price) ?  1:-1 ) //if a greater than b, return 1, else -1
                : sort === "highest" ?
                    ( (a.price < b.price) ?  1:-1 )
                : a._id < b._id ?  1 : -1
            )),
        }) )
    }
    filterProducts = (event) => { 
        console.log(event.target.value);

        if(event.target.value === "") {
            this.setState({size: event.target.value, products:data.products});
        } else {
            this.setState({
                size: event.target.value,
                products: data.products.filter(
                    (product) => product.availableSizes.indexOf(event.target.value) >= 0
                ),
            });
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
                            <div className="main col-md-9 mr-sm-auto col-lg-9 pt-3 px-4">
                                <Filter count={this.state.products.length}
                                    size={this.state.size}
                                    sort={this.state.sort}
                                    filterProducts={this.filterProducts}
                                    sortProducts={this.sortProducts}
                                ></Filter>
                                <Products 
                                    products={this.state.products}
                                    addToCart={this.addToCart}
                                ></Products>
                            </div>
                            <aside className="sidebar col-md-3 d-none d-md-block ">

                                <Cart 
                                    cartItems={this.state.cartItems} 
                                    removeFromCart={this.removeFromCart}
                                />

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