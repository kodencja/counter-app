import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <div className="mx-1 mt-2 row pr-2">
        <div className="sm-caps bgr1 mr-1 prodW mb-2 mb-sm-0 mx-auto mx-sm-1">
          Product:
        </div>
        <div className="mx-1 mr-3 fCol1 prodName text-center col-sm-3 col-md-3">
          {" "}
          {this.props.counter.name}
        </div>
        <div className="sm-caps bgr1 text-center mr-1 mt-3 mb-2 mt-sm-0 mb-sm-0">
          Price:
        </div>
        <div className="mr-3 fCol2 price priceW pt-1 px-1 mt-3 mb-2 mt-sm-0 mb-sm-0">
          ${this.props.counter.price}
        </div>
        <div className={this.getBadgeClasses()}>
          <span className="badg-no-text p-1">{this.formatCount()}</span>
        </div>
        <button
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="btn btn-success btn-sm mt-2 my-sm-0 ml-sm-3 col-sm-1"
        >
          <span className="plus">+</span>
        </button>
        <button
          onClick={() => this.props.onMinus(this.props.counter)}
          className="btn btn-dark btn-sm my-1 mx-sm-1 col-sm-1"
        >
          <span className="minus">-</span>
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger btn-sm ml-md-3 my-1 mb-3 mb-sm-0 col-sm-2 col-md-1"
        >
          Del
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge-text col-sm-1 ";
    classes += this.props.counter.value === 0 ? "bwarning" : "bprimary";
    return classes;
  }

  formatCount() {
    // object destructuring
    const { value: count } = this.props.counter;
    return count === 0 ? "Zero" : count;
  }
}

export default Counter;
