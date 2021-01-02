import React, { Component } from "react"
import Button from "react-bootstrap/Button";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Zoom from "react-reveal/Zoom";
import { removeFromCart } from "../actions/cartActions";
import { createOrder, clearOrder } from "../actions/orderActions";

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckout: false,
        };

        this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.state = {
			show: false,
		};
    }
    
    handleShow = () => {
        this.setState({ show: true });
        
    }
    handleClose = () => {
        this.setState({ show: false });
        this.props.clearOrder();
    }
    

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    createOrder = (e) => {
        e.preventDefault(); //Dont refresh when submiting form
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
            total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
        };
        this.props.createOrder(order);
    };
    render() {
        const {cartItems, order} = this.props;
        return (
            <div className="cart">
                {cartItems.length === 0 ? (
                    <div className="cart cart_header">Cart is empty</div>
                ) : (
                    <div className="cart cart_header">
                        You have {cartItems.length} in the cart{" "}
                    </div>
                )}

                {order && (
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Zoom>
                            <Modal.Header closeButton>
                            <Modal.Title>Modal title</Modal.Title>
                            </Modal.Header>
                        
                            <Modal.Body>
                                <div className="order-details">
                                    <h3 className="text-success">Your order has been placed.</h3>
                                    <h2>Order {order._id}</h2>
                                    <ul>
                                        <li>
                                            <div>Name:</div>
                                            <div>{order.name}</div>
                                        </li>
                                        <li>
                                            <div>Email:</div>
                                            <div>{order.email}</div>
                                        </li>
                                        <li>
                                            <div>Address:</div>
                                            <div>{order.address}</div>
                                        </li>
                                        <li>
                                            <div>Date:</div>
                                            <div>{order.createdAt}</div>
                                        </li>
                                        <li>
                                            <div>Total:</div>
                                            <div>{order.total}</div>
                                        </li>
                                        <li>
                                            <div>Cart Items:</div>
                                            <div>
                                                {order.cartItems.map((x) => (
                                                    <div>
                                                        {x.count} {" x "} {x.title} 
                                                    </div>
                                                ))}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </Modal.Body>
                        
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                            </Modal.Footer>
                        </Zoom>
                    </Modal>
                )}
                <div>
                    <div>
                        <Fade left cascade>
                            <ul className="cart_items">
                                {cartItems.map((item) => (
                                
                                    <li key={item._id}>
                                        <div>
                                            <img src={item.image} alt={item.title} className="img-fluid"></img>
                                        </div>
                                        <div>
                                            <div>{item.title}</div>
                                            <div>
                                                {item.price} x {item.count}
                                                <Button
                                                    variant="danger"
                                                    onClick={() => this.props.removeFromCart(item)}
                                                >
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
                                    onClick={() => {
                                        this.setState({ showCheckout: true });
                                    }}
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
                                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
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
                                                    <button
                                                        type="submit"
                                                        onClick={ ()=> this.handleShow() }
                                                    >Checkout</button>
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
        );
    }
}

export default connect(
    (state) => ({
        order: state.order.order,
        cartItems: state.cart.cartItems,
    }),
    { removeFromCart, createOrder, clearOrder }
)(Cart);