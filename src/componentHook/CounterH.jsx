import React, { useContext, useMemo, useCallback } from "react";
import { CountContext, ModalTipsContext } from "../App";
import Tippy from "@tippyjs/react";

// function CounterH(props, ref) {
const CounterH = React.forwardRef((props, ref) => {
  const counterContext = useContext(CountContext);
  const modalTipContext = useContext(ModalTipsContext);

  console.log("CounterH render!");

  const { singleCounter } = props;

  const addMinusStyle = {
    fontSize: "1.25rem",
    fontWeight: "bold",
  };

  const getBadgeClasses = useMemo(() => {
    console.log("getBadgeClasses CounterH");
    let classes = "badge-text col-sm-1 py-3 ";
    classes += singleCounter.value === 0 ? "bwarning" : "bprimary";
    return classes;
  }, [singleCounter.value]);

  const formatCount = useMemo(() => {
    console.log("formatCount Fn");
    // object destructuring
    const { value: count } = singleCounter;
    return count === 0 ? "Zero" : count;
  }, [singleCounter.value]);

  // else if (txtType === "decrement") {
  //   counterContext.countDispatch({
  //     type: txtType,
  //     counterNo: singleCounter,
  //   });
  // }

  const handleValueChange = (txtType) => {
    console.log("handleValueChange Fn");
    if (
      singleCounter.hasOwnProperty("adult") &&
      singleCounter.adult === false
    ) {
      if (txtType === "increment") {
        console.log("adult zone!");
        modalTipContext.setModalIsOpen(true);
      } else if (txtType === "decrement") {
        return false;
      }
    } else {
      if (singleCounter.value < 10 && txtType === "increment") {
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
        modalTipContext.toastNotify();
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
      <div className={getBadgeClasses}>
        <span className="badge-no-text p-1">{formatCount}</span>
      </div>
      <Tippy
        content="Click to increment the number of the product to buy"
        disabled={counterContext.disable}
        placement="top-end"
        delay={100}
      >
        <button
          onClick={() => handleValueChange("increment")}
          className="btn btn-success btn-sm mt-2 my-sm-0 ml-sm-3 col-sm-1 plus"
        >
          <span style={addMinusStyle}>+</span>
        </button>
      </Tippy>
      <Tippy
        content="Click to decrement the number of the product to buy"
        disabled={counterContext.disable}
        placement="top-end"
        delay={100}
      >
        <button
          onClick={() => handleValueChange("decrement")}
          className="btn btn-dark btn-sm my-1 mx-sm-1 col-sm-1 minus"
        >
          <span style={addMinusStyle}>-</span>
        </button>
      </Tippy>
    </div>
  );
});

export default React.memo(CounterH);
