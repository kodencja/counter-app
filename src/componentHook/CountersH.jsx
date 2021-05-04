import React, {
  useState,
  useRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import Tippy from "@tippyjs/react";
import CounterH from "./CounterH";
import { CountContext } from "../App";
import Danger from "./Danger";

function CountersH() {
  const [textOffer, setTextOffer] = useState(
    <div className="h5">
      <div className="todayOffer mb-2">Today's special offer!</div>
      <div className="mb-3">
        <span>
          * If you buy for more than{" "}
          <span style={{ color: "royalblue" }}>$500</span> you will get{" "}
          <span style={{ color: "royalblue" }}>10%</span> discount! *
        </span>
      </div>
    </div>
  );

  const counterRef = useRef([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [counterToBeDeleted, setCounterToBeDeleted] = useState({});
  const counterContext = useContext(CountContext);
  const priceContext = counterContext.totalPrice;
  const prevTotalPrice = counterContext.prevWholePrice;

  console.log("COUNTERSH render!");

  useEffect(() => {
    if (
      (priceContext <= 500 && prevTotalPrice > 500) ||
      (priceContext > 500 && prevTotalPrice <= 500)
    ) {
      callTextOffer();
      // console.log("CountersH callTextOffer render!");
    }
  }, [priceContext]);

  // async function callTextOffer() {
  const callTextOffer = useCallback(async () => {
    const txt = await handleTextOffer;
    setTextOffer(txt);
  }, [priceContext]);

  const addToRef = useCallback((el) => {
    if (el && !counterRef.current.includes(el)) {
      counterRef.current.push(el);
    }
  }, []);

  const handleTextOffer = useMemo(() => {
    return new Promise((resolve, reject) => {
      if (priceContext === undefined)
        reject(new Error("Error to get total price!"));
      else {
        let txt;
        setTimeout(() => {
          if (priceContext <= 500) {
            txt = (
              <div className="h5">
                <div className="todayOffer mb-2">Today's special offer!</div>
                <div className="mb-3">
                  <span>
                    * If you buy for more than{" "}
                    <span style={{ color: "royalblue" }}>$500</span> you will
                    get <span style={{ color: "royalblue" }}>10%</span>{" "}
                    discount! *
                  </span>
                </div>
              </div>
            );
          } else {
            txt = (
              <div className="h5">
                <div className="todayOffer mb-2">Congratulations!!!</div>
                <div className="mb-3">
                  <span style={{ fontWeight: "bold", color: "royalblue" }}>
                    * You've got{" "}
                    <span style={{ color: "mediumvioletred" }}>10%</span>{" "}
                    DISCOUNT! *
                  </span>
                </div>
              </div>
            );
          }
          resolve(txt);
        }, counterContext.durationTime * 550);
      }
    });
  }, [priceContext, counterContext.durationTime]);

  const callSetModal = (bool) => {
    setModalIsOpen(bool);
  };

  const getBtnTipsClass = useMemo(() => {
    // console.log("getBtnTipsClass Fn");
    let classes = "btn text-center btn-sm ml-2 ";
    classes += counterContext.disable === false ? "btn-light" : "btn-info";
    return classes;
  }, [counterContext.disable]);

  const counterArray = useMemo(() => {
    // console.log("counterArray");
    return counterContext.countState.map((counter) => {
      return (
        <CounterH
          key={counter.id}
          singleCounter={counter}
          ref={addToRef}
          // modalOpen={setModalIsOpen}
          modalOpen={callSetModal}
          counterToDelete={setCounterToBeDeleted}
        />
      );
    });
  }, [counterContext.countState]);

  const handleModalDelete = (e) => {
    // console.log("handleModalDelete");
    setModalIsOpen(false);
    if (e.target.id === "yes") {
      counterContext.countDispatch({
        type: "delete",
        counterNo: counterToBeDeleted,
      });
    } else return false;
  };

  return (
    <main className="main m-0 p-sm-2 row">
      <Danger
        onCounterToBeDeleted={counterToBeDeleted}
        onModalIsOpen={modalIsOpen}
        onSetModalIsOpen={setModalIsOpen}
        onHandleModalDelete={handleModalDelete}
      />

      <div className="offer pt-2 px-1 px-md-2 col-12 col-md-10">
        <div className="h5 specialOffer">{textOffer} </div>
      </div>
      <div className="w-100"></div>
      <div className="h5 ml-2 mt-3 mainTitle">
        List of products in our shop:
      </div>
      <div className="w-100"></div>
      <Tippy
        content="Click to reset number of selected products to zero"
        placement="top-start"
        disabled={counterContext.disable}
      >
        <button
          onClick={() =>
            counterContext.countDispatch({
              type: "reset",
            })
          }
          className="btn text-center btn-sm mx-2 my-3 reset"
        >
          Reset
        </button>
      </Tippy>

      <Tippy
        content={
          <>
            <div>Click to turn off / on tips</div>
          </>
        }
        placement="left-end"
        disabled={counterContext.disable}
      >
        <button
          onClick={() => counterContext.setDisable(!counterContext.disable)}
          className={getBtnTipsClass}
        >
          {counterContext.disable === false ? "Turn off tips" : "Turn on tips"}
        </button>
      </Tippy>

      <div className="w-100"></div>
      <div className="container mx-1 counters">{counterArray}</div>
    </main>
  );
}

export default React.memo(CountersH);
