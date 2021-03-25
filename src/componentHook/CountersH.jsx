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

// CountersH renderuje się gdy zmieni się setModalIsOpen, nawet jeśli ta wartość tu nie jest używana, ponieważ ten komponent pobiera wartości z contextu poprzez użycie poniżej "useContext"
function CountersH() {
  const [textOffer, setTextOffer] = useState(
    <span>
      * If you buy for more than{" "}
      <span style={{ color: "royalblue" }}>$500</span> you will get{" "}
      <span style={{ color: "royalblue" }}>10%</span> discount! *
    </span>
  );

  const [titleOffer, seTtitleOffer] = useState("Today's special offer!");

  const counterRef = useRef([]);
  const counterContext = useContext(CountContext);
  const priceContext = counterContext.totalPrice;

  useEffect(() => {
    callTextOffer();
  }, [priceContext]);

  console.log("COUNTERSH render!");

  const addToRef = useCallback((el) => {
    console.log("addToRef Fn");
    if (el && !counterRef.current.includes(el)) {
      counterRef.current.push(el);
    }
    console.log(counterRef.current);
  }, []);

  const handleTextOffer = useMemo(() => {
    console.log("handleTextOffer Fn");
    return new Promise((resolve, reject) => {
      if (reject.length > 1) reject(new Error("Error to get total price!"));
      else {
        let txt;
        setTimeout(() => {
          if (priceContext <= 500) {
            txt = (
              <span>
                * If you buy for more than{" "}
                <span style={{ color: "royalblue" }}>$500</span> you will get{" "}
                <span style={{ color: "royalblue" }}>10%</span> discount! *
              </span>
            );
          } else {
            txt = (
              <span style={{ fontWeight: "bold", color: "royalblue" }}>
                * You've got{" "}
                <span style={{ color: "mediumvioletred" }}>10%</span> DISCOUNT!
                *
              </span>
            );
          }
          resolve(txt);
        }, counterContext.durationTime * 550);
      }
    });
  }, [priceContext]);

  // async function callTextOffer() {
  const callTextOffer = useCallback(async () => {
    console.log("callTextOffer Fn");
    const txt = await handleTextOffer;
    setTextOffer(txt);
    if (priceContext <= 500) {
      seTtitleOffer("Today's special offer!");
    } else {
      seTtitleOffer("Congratulations!!!");
    }
  }, [priceContext]);

  const getBtnTipsClass = useMemo(() => {
    console.log("getBtnTipsClass Fn");
    let classes = "btn text-center btn-sm ml-2 ";
    classes += counterContext.disable === false ? "btn-info" : "btn-warning";
    return classes;
  }, [counterContext.disable]);

  const counterArray = useMemo(() => {
    console.log("counterArray");
    return counterContext.countState.map((counter) => {
      return (
        <CounterH key={counter.id} singleCounter={counter} ref={addToRef} />
      );
    });
  }, [counterContext.countState]);

  return (
    <main className="main m-0 p-sm-2 row">
      <div className="offer pt-2 px-1 px-md-2 col-12 col-md-10">
        <div className="h5 todayOffer">{titleOffer}</div>
        <div className="h5 specialOffer">{textOffer} </div>
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
          Turn on/off tips
        </button>
      </Tippy>

      <div className="w-100"></div>
      {counterArray}
    </main>
  );
}

export default React.memo(CountersH);
