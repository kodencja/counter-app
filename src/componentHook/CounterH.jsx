import React, { useContext } from "react";
import { CountContext } from "../App";

// function CounterH(props, ref) {
const CounterH = React.forwardRef((props, ref) => {
  const counterContext = useContext(CountContext);

  console.log("CounterH render!");

  const { singleCounter } = props;

  const addMinusStyle = {
    fontSize: "1.25rem",
    fontWeight: "bold",
  };

  const getBadgeClasses = () => {
    let classes = "badge-text col-sm-1 py-3 ";
    classes += singleCounter.value === 0 ? "bwarning" : "bprimary";
    return classes;
  };

  const formatCount = () => {
    // object destructuring
    const { value: count } = singleCounter;
    return count === 0 ? "Zero" : count;
  };

  const handleValueChange = (txtType) => {
    console.log("handleValueChange");
    if (
      txtType === "increment" &&
      singleCounter.hasOwnProperty("adult") &&
      singleCounter.adult === false
    ) {
      // console.log("adult zone!");
      console.log(singleCounter.id);
      // counterContext.setAdultProductId(singleCounter.id);
      counterContext.setModalIsOpen(true);
    } else {
      if (singleCounter.value < 5 && txtType === "increment") {
        counterContext.countDispatch({
          type: txtType,
          counterNo: singleCounter,
        });
      } else if (txtType === "decrement") {
        counterContext.countDispatch({
          type: txtType,
          counterNo: singleCounter,
        });
      } else {
        counterContext.toastNotify();
      }
    }
  };

  return (
    <div className="mx-1 mt-2 row pr-2" ref={ref}>
      <div className="sm-caps bgr1 mr-1 prodW mb-2 mb-sm-0 mx-auto mx-sm-1">
        Product:
      </div>
      <div className="mx-1 mr-3 fCol1 prodName text-center col-sm-3 col-md-3">
        {" "}
        {singleCounter.name}
      </div>
      <div className="sm-caps bgr1 text-center mr-1 mt-3 mb-2 mt-sm-0 mb-sm-0">
        Price:
      </div>
      <div className="mr-3 fCol2 price priceW pt-1 px-1 mt-3 mb-2 mt-sm-0 mb-sm-0">
        ${singleCounter.price}
      </div>
      <div className={getBadgeClasses()}>
        <span className="badge-no-text p-1">{formatCount()}</span>
      </div>
      <button
        onClick={() => handleValueChange("increment")}
        // onClick={() =>
        //   counterContext.countDispatch({
        //     type: "increment",
        //     counterNo: singleCounter,
        //   })
        // }
        className="btn btn-success btn-sm mt-2 my-sm-0 ml-sm-3 col-sm-1 plus"
        // disabled={onDisable}
      >
        <span style={addMinusStyle}>+</span>
        {/* <h5>+</h5> */}
      </button>
      <button
        onClick={() => handleValueChange("decrement")}
        // onClick={() =>
        //   counterContext.countDispatch({
        //     type: "decrement",
        //     counterNo: singleCounter,
        //   })
        // }
        className="btn btn-dark btn-sm my-1 mx-sm-1 col-sm-1 minus"
        // disabled={onDisable}
      >
        <span style={addMinusStyle}>-</span>
      </button>
      {/* <button
        onClick={() => this.props.onDelete(id)}
        className="btn btn-danger btn-sm ml-md-3 my-1 mb-3 mb-sm-0 col-sm-2 col-md-1"
        // disabled={onDisable}
      >
        Del
      </button> */}
    </div>
  );
});

export default React.memo(CounterH);
