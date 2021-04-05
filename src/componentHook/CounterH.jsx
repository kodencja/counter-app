import React, { useContext, useMemo } from "react";
import { CountContext, ModalTipsContext } from "../App";
import Tippy from "@tippyjs/react";

const CounterH = React.forwardRef((props, ref) => {
  const counterContext = useContext(CountContext);
  const modalTipContext = useContext(ModalTipsContext);

  console.log("CounterH render!");

  const { singleCounter, modalOpen, counterToDelete } = props;

  const addMinusStyle = {
    fontSize: "1.25rem",
    fontWeight: "bold",
  };

  const getBadgeClasses = useMemo(() => {
    // console.log("getBadgeClasses CounterH");
    let classes = "badge-text col-sm-1 py-3 ml-sm-5 ml-0 ml-md-5 ml-lg-2 ";
    classes += singleCounter.value === 0 ? "bwarning" : "bprimary";
    return classes;
  }, [singleCounter.value]);

  const formatCount = useMemo(() => {
    // console.log("formatCount Fn");
    // object destructuring
    const { value: count } = singleCounter;
    return count === 0 ? "Zero" : count;
  }, [singleCounter.value]);

  // handle change of value i.e. increment or decrement of the product number
  const handleValueChange = (txtType) => {
    // console.log("handleValueChange Fn");
    if (singleCounter.adult === true) {
      if (txtType === "increment") {
        console.log("adult zone!");
        counterContext.setAdultCounterClicked(singleCounter);
        modalTipContext.setModalIsOpen(true);
      } else if (txtType === "decrement") {
        return false;
      }
    } else {
      if (
        singleCounter.value >= 10 &&
        singleCounter.value % 10 === 0 &&
        txtType === "increment"
      ) {
        modalTipContext.toastNotify();
        counterContext.countDispatch({
          type: txtType,
          counterNo: singleCounter,
        });
      } else if (txtType === "increment") {
        counterContext.countDispatch({
          type: txtType,
          counterNo: singleCounter,
        });
      } else if (txtType === "decrement" && singleCounter.value > 0) {
        counterContext.countDispatch({
          type: txtType,
          counterNo: singleCounter,
        });
      } else if (txtType === "decrement" && singleCounter.value <= 0) {
        return false;
      }
    }
  };

  const onDelete = (e) => {
    modalOpen(true);
    counterToDelete(singleCounter);
  };

  return (
    <div className="mt-4 row mx-0 px-0" ref={ref}>
      <div className="sm-caps bgr1 mb-1 text-center mx-auto mx-sm-1 prodW">
        Name:
      </div>
      <div className="mx-sm-1 mr-sm-3 mx-0 fCol1 prodName text-center col-sm-4 col-md-3">
        {singleCounter.name}
      </div>
      <div className="sm-caps bgr1 mb-1 mt-3 mt-sm-0 mx-sm-1 mx-auto">
        Unit:
      </div>
      <div className="mx-sm-1 mr-sm-3 mx-0 fCol1 unit text-center">
        {singleCounter.unit}
      </div>
      <div className="w-100 d-md-none"></div>
      <div className="sm-caps bgr1 text-center mb-1 mx-auto mx-sm-1  mt-3 mt-sm-0">
        Price:
      </div>
      <div className="mr-sm-5 mr-md-2 fCol2 price priceW pt-1 px-1 mb-3 mb-sm-0 col-sm-2 col-lg-1">
        ${singleCounter.price}
      </div>
      <div className="w-100 d-lg-none d-sm-none d-md-block"></div>
      <div className={getBadgeClasses}>
        <span className="badge-no-text">{formatCount}</span>
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
      <Tippy
        content="Click to delete the product from the list"
        disabled={counterContext.disable}
        placement="top-end"
        delay={100}
      >
        <button
          onClick={onDelete}
          className="btn btn-danger btn-sm mb-3 mb-sm-0 col-sm-1"
        >
          Del
        </button>
      </Tippy>
    </div>
  );
});

export default React.memo(CounterH);
