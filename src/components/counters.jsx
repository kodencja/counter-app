import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  render() {
    // destructuring arguments

    const { onReset, onDelete, onIncrement, kounters, onMinus } = this.props;

    return (
      <div className="">
        <button
          onClick={onReset}
          className="btn btn-info text-center btn-sm m-2"
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
          ></Counter>
        ))}
      </div>
    );
  }
}

export default Counters;
