import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';

export default class Cart extends Component {
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
                    </div>

                    {cartItems.length !== 0 && (
                        <div>
                            <div className="total">
                                <div>
                                    Total:{" "}
                                    {cartItems.reduce((a, c) => a + c.price * c.count, 0)}
                                </div>
                                <Button variant="success">Proceed</Button>
                            </div>
                        </div>
                    )}
                    
                </div>
                
            </div>
        )
    }
}
