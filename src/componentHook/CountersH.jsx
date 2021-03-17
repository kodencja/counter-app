import React, { useState, useRef, useCallback, useContext } from "react";
import Tippy from "@tippyjs/react";
import CounterH from "./CounterH";
import { CountContext } from "../App";

function CountersH({ counterObj }) {
  const [state, setstate] = useState(0);

  const counterRef = useRef([]);
  const counterContext = useContext(CountContext);

  console.log("COUNTERSH render!");

  const addToRef = useCallback((el) => {
    if (el && !counterRef.current.includes(el)) {
      counterRef.current.push(el);
    }
    console.log(counterRef.current);
  }, []);

  // const handleIncremenet = () => {};

  const handleTextOffer = () => {
    // if (counterContext.totalPrice() <= 500) {
    //   return (
    //     <span>
    //       * If you buy for more than{" "}
    //       <span style={{ color: "royalblue" }}>$500</span> you will get{" "}
    //       <span style={{ color: "royalblue" }}>10%</span> discount! *
    //     </span>
    //   );
    // } else {
    //   return (
    //     <span style={{ fontWeight: "bold", color: "royalblue" }}>
    //       * You've got <span style={{ color: "mediumvioletred" }}>10%</span>{" "}
    //       DISCOUNT! *
    //     </span>
    //   );
    // }
    // return counterContext.totalPrice() <= 500 ? (
    return counterContext.totalPrice() <= 500 ? (
      <span>
        * If you buy for more than{" "}
        <span style={{ color: "royalblue" }}>$500</span> you will get{" "}
        <span style={{ color: "royalblue" }}>10%</span> discount! *
      </span>
    ) : (
      <span style={{ fontWeight: "bold", color: "royalblue" }}>
        * You've got <span style={{ color: "mediumvioletred" }}>10%</span>{" "}
        DISCOUNT! *
      </span>
    );
  };

  // const callTextOffer = () => {
  //   let text;
  //   setTimeout(() => {
  //     text = handleTextOffer();
  //     console.log(text);
  //     return text;
  //   }, 2000);
  //   console.log(text);
  //   // return text;
  // };

  const handleOfferTitle = () => {
    return counterContext.totalPrice() <= 500
      ? "Today's special offer!"
      : "Congratulations!!!";
  };

  const tipStyle = {
    // color: "cornsilk",
    color: "rgb(200, 200, 133)",
    textAlign: "center",
  };

  const getBtnTipsClass = () => {
    let classes = "btn text-center btn-sm ml-2 ";
    classes += counterContext.disable === false ? "btn-info" : "btn-warning";
    return classes;
  };

  return (
    <main className="main m-0 p-sm-2 row">
      <div className="offer pt-2 px-1 px-md-2 col-12 col-md-10">
        <div className="h5 todayOffer">{handleOfferTitle()}</div>
        <div className="h5 specialOffer">{handleTextOffer()}</div>
      </div>
      <div className="w-100"></div>
      {/* <div className="reset"> */}
      <Tippy
        content={
          <>
            <div>Click to reset number of selected products to zero</div>
            {/* <div style={tipStyle}>All tips will appear only three times</div> */}
          </>
        }
        placement="top-start"
        disabled={counterContext.disable}
      >
        <button
          onClick={() =>
            counterContext.countDispatch({
              type: "reset",
              // counterNo: null,
            })
          }
          className="btn text-center btn-sm mx-2 my-3 reset"
          // disabled={5}
        >
          Reset
        </button>
      </Tippy>

      {/* </div> */}

      <Tippy
        content={
          <>
            <div>Click to turn off / on tips</div>
            {/* <div style={tipStyle}>All tips will appear only three times</div> */}
          </>
        }
        placement="left-end"
        disabled={counterContext.disable}
      >
        <button
          onClick={() => counterContext.setDisable(!counterContext.disable)}
          className={getBtnTipsClass()}
          // disabled={5}
        >
          Turn on/off tips
        </button>
      </Tippy>

      <div className="w-100"></div>
      {counterContext.countState.map((counter) => (
        // <CounterH singleCounter={counterObj} key={counter.id} onIncrement={handleIncremenet} />
        <CounterH key={counter.id} singleCounter={counter} ref={addToRef} />
      ))}
    </main>
  );
}

export default React.memo(CountersH);
