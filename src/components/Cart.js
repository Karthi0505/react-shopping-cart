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
            /*name: "",
            email: "",
            address: "",*/
            showCheckout: false,
        };

        this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.state = {
			show: false,
		};
    }
    
    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    createOrder = (e) => {
        e.preventDefault(); /*Dont refresh when submiting form*/
        
        const order = {
            /*name: this.state.name,
            email: this.state.email,
            address: this.state.address,*/
            cartItems: this.props.cartItems,
            total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0), /* accumulator */
        };
        this.props.createOrder(order);

    };
        
    handleShow = () => {
        this.setState({ show: true });
    };
    handleClose = () => {
        this.setState({ show: false });
        this.props.clearOrder();
    };
    
    render() {
        const {cartItems, order} = this.props;
        return (
            <div className="cart pt-3">
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
                                        {/*<li>
                                            <span className="font-italic text-muted">Name: </span> 
                                            <span className="user-select-all">{order.name}</span>
                                        </li>
                                        <li>
                                            <span className="font-italic text-muted">Email: </span> 
                                            <span className="user-select-all">{order.email}</span>
                                        </li>
                                        <li>
                                            <span className="font-italic text-muted">Address: </span> 
                                            <span className="user-select-all">{order.address}</span>
                                        </li>*/}
                                        <li>
                                            <span className="font-italic text-muted">Date: </span> 
                                            <span className="user-select-all">{order.createdAt}</span>
                                        </li>
                                        <li>
                                            <span className="font-italic text-muted">Total: </span> 
                                            <span className="user-select-all">{order.total}</span>
                                        </li>
                                        <li>
                                            <span className="font-italic text-muted">Cart Items: </span> 
                                            <span className="user-select-all">
                                                {order.cartItems.map((x) => (
                                                    <div>
                                                        {x.count} {" x "} {x.title} 
                                                    </div>
                                                ))}
                                            </span>
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
                                
                                    <li key={item._id} className="mt-3">
                                        <div>
                                            <img src={item.image} alt={item.title} className="img-fluid"></img>
                                        </div>
                                        <div>
                                            <div className="pl-2 pr-2">{item.title}</div>
                                            <div>
                                                <span className="pl-2 pr-2">{item.price} x {item.count}</span>
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
                            <div className="total mb-4">
                                <div className="mb-2">
                                    Total:{" "}
                                    {cartItems.reduce((a, c) => a + c.price * c.count, 0)}
                                </div>

                                {/*<button onClick={this.createOrder}>Checkout</button>*/}

                                <Button
                                    onClick={() => {
                                        this.setState({ showCheckout: true });
                                    }}
                                    variant="success" 
                                    block
                                >
                                    Proceed
                                </Button>
                            </div>
                            
                            {this.state.showCheckout && (
                                <Fade right cascade>
                                    <div>
                                        <h4 className="h5">Enter Details</h4>
                                        <Button
                                            variant="success"
                                            size="lg"
                                            block 
                                            onClick={ this.createOrder }
                                        >
                                            Checkouttt
                                        </Button>
                                    {/*
                                        <form onSubmit={this.createOrder}>
                                            <ul className="form-container list-unstyled">
                                                <li className="form-group">
                                                    <label className="font-weight-bold">Email</label>
                                                    <input
                                                        className="form-control"
                                                        name="email"
                                                        type="email"
                                                        required
                                                        onChange={this.handleInput}
                                                        aria-describedby="emailHelp"
                                                        placeholder="Enter email"
                                                    ></input>
                                                </li>
                                                <li className="form-group">
                                                    <label className="font-weight-bold">Name</label>
                                                    <input
                                                        className="form-control"
                                                        name="name"
                                                        type="text"
                                                        required
                                                        onChange={this.handleInput}
                                                    ></input>
                                                </li>
                                                <li className="form-group">
                                                    <label className="font-weight-bold">Address</label>
                                                    <input
                                                        className="form-control"
                                                        name="address"
                                                        type="text"
                                                        required
                                                        onChange={this.handleInput}
                                                    ></input>
                                                </li>
                                                <li>
                                                    <Button
                                                        variant="success"
                                                        size="lg"
                                                        block
                                                        type="submit"
                                                        onClick={ ()=> this.handleShow() }
                                                    >
                                                        Checkout
                                                    </Button>
                                                </li>
                                            </ul>
                                        </form>*/}
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