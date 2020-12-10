import React, { Component } from 'react'
import '../styles/App.scss';
import Button from 'react-bootstrap/Button';

export default class Products extends Component {
    render() {
        return (
            <div >
                <ul className="products row">
                    {/*get a list of products as a props from parent component. So use 'this'*/}
                    {this.props.products.map(product => (
                        <li key={product._id} className="col-md-4">
                            <div className="product card mb-4 shadow">
                                <a href={"#" + product._id}>
                                    <img src={product.image} alt={product.title}></img>
                                </a>
                                <div className="card-body">
                                    <p className="product_title">
                                        {product.title}
                                    </p>
                                    <div className="product_price">
                                        <div>₹ {product.price}</div>
                                        <Button variant="primary" className="product_addToCart">Primary</Button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
