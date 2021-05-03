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
    let classes =
      "badge-text mt-2 mt-md-0 mx-3 mx-sm-1 mx-md-1 mx-lg-0 mx-xl-2 ";
    classes += singleCounter.value === 0 ? "bwarning" : "bprimary";
    return classes;
  }, [singleCounter.value]);

  const formatCount = useMemo(() => {
    // console.log("formatCount Fn");
    // object destructuring
    const { value: count } = singleCounter;
    return count === 0 ? "Zero" : count;
  }, [singleCounter]);

  // handle change of value i.e. increment or decrement of the product number
  const handleValueChange = (txtType) => {
    // console.log("handleValueChange Fn");
    if (singleCounter.adult === true) {
      if (txtType === "increment") {
        // console.log("adult zone!");
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
      <div className="col-sm-4 col-lg-3 name-col text-center">
        <div className="sm-caps bgr1 mx-2 mb-1">Name:</div>
        <div className="fCol1 prodName">{singleCounter.name}</div>
      </div>

      {/* <div className="w-100 d-md-none"></div> */}
      <div className="mt-sm-0 mt-3 col-md-2 col-sm-3 col-lg-2 text-center">
        <div className="sm-caps bgr1 mx-2 mb-1">Unit:</div>
        <div className="fCol1 unitQ mb-sm-0">{singleCounter.unit}</div>
      </div>

      {/* <div className="w-100 d-md-none"></div> */}
      <div className="mt-sm-0 mt-3 col-md-2 col-sm-3 col-lg-2 text-center">
        <div className="sm-caps bgr1 mx-2 mb-1">Price:</div>
        <div className="fCol2 price mb-sm-0">${singleCounter.price}</div>
      </div>

      <div className="w-50 d-none d-sm-block d-md-none"></div>
      <div className="col-lg-2 col-md-3 col-sm-4 mt-sm-0 mt-2 mb-2 mb-sm-0 text-center px-3 pr-sm-2">
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
            className="btn btn-success btn-sm my-1 plus"
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
            className="btn btn-dark btn-sm my-1 mx-1 minus"
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
          <button onClick={onDelete} className="btn btn-danger btn-sm">
            Del
          </button>
        </Tippy>
      </div>
    </div>
  );
});

export default React.memo(CounterH);
