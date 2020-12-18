import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Fade from 'react-reveal/Fade';

export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckout: false,
        }
    }
    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    createOrder = (e) => {
        e.preventDefault(); //Dont refresh when submiting form
        const order = {
            email: this.state.email,
            name: this.state.name,
            address: this.state.address,
            cartItems: this.props.cartItems,
        };
        this.props.createOrder(order);
    };
    render() {
        const {cartItems} = this.props;
        return (
            <div className="cart">
                {cartItems.length === 0? (
                    <div className="cart cart_header">Cart is empty</div>
                ) : (
                    <div className="cart cart_header">You have {cartItems.length} in the cart{" "}</div>
                )}

                <div>
                    <div>
                        <Fade left cascade>
                            <ul className="cart_items">
                                {cartItems.map((item) => (
                                
                                    <li key={item._id}>
                                        <div>
                                            //<img src={item.img} alt={item.title}></img>
                                        </div>
                                        <div>
                                            <div>{item.title}</div>
                                            <div>
                                                {item.price} x {item.count}
                                                <Button variant="danger" onClick={() => this.props.removeFromCart(item)}>
                                                    Remove
                                                </Button>
                                            </div>
                                            
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Fade>
                    </div>

                    {cartItems.length !== 0 && (
                        <div>
                            <div className="total">
                                <div>
                                    Total:{" "}
                                    {cartItems.reduce((a, c) => a + c.price * c.count, 0)}
                                </div>
                                <Button 
                                    onClick={()=>{this.setState({showCheckout: true})}} 
                                    variant="success">
                                    Proceed
                                </Button>
                            </div>
                            
                            {this.state.showCheckout && (
                                <Fade right cascade>
                                    <div>
                                        <form onSubmit={this.createOrder}>
                                            <ul className="form-container list-unstyled">
                                                <li className="form-group">
                                                    <label>Email</label>
                                                    <input 
                                                        className="form-control"
                                                        name="email"
                                                        type="email" 
                                                        required 
                                                        onChange={this.handleInput}
                                                        aria-describedby="emailHelp"
                                                        placeholder="Enter email"
                                                    ></input>
                                                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                                </li>
                                                <li className="form-group">
                                                    <label>Name</label>
                                                    <input
                                                        className="form-control"
                                                        name="name"
                                                        type="text"
                                                        required
                                                        onChange={this.handleInput}
                                                    ></input>
                                                </li>
                                                <li className="form-group">
                                                    <label>Address</label>
                                                    <input
                                                        className="form-control"
                                                        name="address"
                                                        type="text"
                                                        required
                                                        onChange={this.handleInput}
                                                    ></input>
                                                </li>
                                                <li>
                                                    <button type="submit">Checkout</button>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </Fade>
                            )}
                        </div>
                    )}
                    
                </div>
                
            </div>
        )
    }
}
