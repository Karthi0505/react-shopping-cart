import React, { Component } from "react";
import { connect } from "react-redux";
import { filterProducts, sortProducts } from "../actions/productActions";

class Filter extends Component {
    render() {
        return (
            !this.props.filteredProducts ? (
                <div>Loading...</div>
            ) : (
                <div className="filter d-flex justify-content-between">
                    <div className="filter_result">
                        {this.props.filteredProducts.length} Products
                    </div>
                    <div className="filter_sort">
                        Order {" "}
                        <select
                            value={this.props.sort}
                            onChange={(e) =>
                                this.props.sortProducts(
                                    this.props.filteredProducts,
                                    e.target.value
                                )
                            }
                        >
                            <option value="latest">Featured</option>
                            <option value="lowest">Lowest First</option>
                            <option value="highest">Highest First</option>
                        </select>
                    </div>
                    <div className="filter_size">
                        Filter {" "}
                        <select
                            value={this.props.size}
                            onChange={(e) =>
                                this.props.filterProducts(this.props.products, e.target.value)
                            }
                        >
                            <option value="">All</option>
                            <option value="s">S</option>
                            <option value="m">M</option>
                            <option value="l">L</option>
                        </select>
                    </div>
                </div>
            )
        );
    }
}
export default connect(
    (state) => ({
        size: state.products.size,
        sort: state.products.sort,
        products: state.products.items,
        filteredProducts: state.products.filteredItems,
    }),
    {
        filterProducts,
        sortProducts,
    }
)(Filter);