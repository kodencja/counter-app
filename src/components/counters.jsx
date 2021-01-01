import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  render() {
    // destructuring arguments

    const {
      onReset,
      onDelete,
      onIncrement,
      kounters,
      onMinus,
      onDisabled,
    } = this.props;

    return (
      <div className="">
        <button
          onClick={onReset}
          className="btn btn-info text-center btn-sm m-2"
          disabled={onDisabled}
        >
          Reset
        </button>
        <div className="w-100"></div>
        {kounters.map((counter) => (
          <Counter
            key={counter.id}
            counter={counter}
            product={counter}
            onDelete={onDelete}
            onMinus={onMinus}
            onIncrement={onIncrement}
            onDisable={onDisabled}
          ></Counter>
        ))}
        {this.props.children}
      </div>
    );
  }
}

export default Counters;
