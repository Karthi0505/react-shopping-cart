import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        return (
            <div className="filter d-flex justify-content-between">
                <div className="filter_result">{this.props.count} Products</div>
                <div className="filter_sort">
                    Order {" "}
                    <select value={this.props.sort} onChange={this.props.sortProducts}>
                        <option>Featured</option>
                        <option value="lowest">Lowest</option>
                        <option value="highest">Highest</option>
                    </select>
                </div>
                <div className="filter_size">
                    Filter {" "}
                    <select value={this.props.size} onChange={this.props.filterProducts}>
                        <option value="">All</option>
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                    </select>
                </div>
            </div>
        )
    }
}
