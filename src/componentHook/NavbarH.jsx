import React, { useContext, useMemo } from "react";
// import { useContext } from "react/cjs/react.development";
import { CountContext } from "../App";
import CountUp, { useCountUp } from "react-countup";

const NavbarH = (props) => {
  const counterContext = useContext(CountContext);

  console.log("Navbar render!");
  // console.log(counterContext.prevWholePrice);

  const handleSumupValues = () => {
    return counterContext.countState.reduce((countPrev, countNext) => {
      return countPrev + countNext.value;
    }, 0);
  };

  // const handleTotalPrice = () => {
  //   return counterContext.countState.reduce((c1, c2) => {
  //     return c1 + c2.price * c2.value;
  //   }, 0);
  // };

  const getBadgeClasses = () => {
    let classes = "badge badge-pill  ml-1 ";
    classes += handleSumupValues() === 0 ? "badge-warning" : "badge-primary";
    return classes;
  };

  // const handleTotalPrice = () => {
  //   console.log("handleTotalPrice");
  //   return new Promise((resolve, reject) => {
  //     if (reject.length > 1) reject(new Error("Error to get total price!"));
  //     else {
  //       const totalPrice = counterContext.countState.reduce((c1, c2) => {
  //         return c1 + c2.price * c2.value;
  //       }, 0);
  //       console.log(totalPrice);
  //       resolve(totalPrice);
  //     }
  //   });
  // };

  // const totalPriceAsync = async () => {
  //   console.log("totalPriceAsync Fn!");
  //   const totalPrice = await handleTotalPrice();
  //   console.log(totalPrice);
  //   return totalPrice;
  // };

  return (
    <nav className="navbar navbar-light bg-light">
      {/* <button onClick={totalPriceAsync}>totalPriceAsync</button> */}
      {/* <a className="navbar-brand" href="#"> */}
      <a className="navbar-brand" href="#">
        Number of
        <span className="font-weight-bold n1"> grades </span>to buy:{" "}
        <span className="badge badge-pill badge-secondary ml-1 mr-3">
          {
            counterContext.countState.filter((counter) => counter.value > 0)
              .length
          }
        </span>
        <div className="w-100 my-1"></div>Number of
        <span className="font-weight-bold n2">{"  "} products </span>
        to buy: {/* <span className="badge badge-pill badge-primary ml-1"> */}
        <span className={getBadgeClasses()}>
          {/* {handleSumupValues()} */}
          <CountUp
            // end={handleSumupValues() > 0 ? handleSumupValues() : 0}
            // start={handleSumupValues() > 1 ? handleSumupValues() : 0}
            start={counterContext.prevWholeValue}
            end={handleSumupValues()}
            // duration={2}
            duration={
              counterContext.prevWholeValue - handleSumupValues() <= 0 ? 0.5 : 2
            }
          >
            {({ countUpRef }) => (
              <div>
                <span ref={countUpRef}></span>
              </div>
            )}
          </CountUp>
        </span>
        <div className="w-100 my-1"></div>
        <span className="font-weight-bold total-price n3">Total price: </span>
        <span className="badge badge-pill badge-success ml-1 py-2">
          {/* ${handleTotalPrice()} */}
          <CountUp
            // end={handleSumupValues() > 0 ? handleSumupValues() : 0}
            // start={counterContext.prevWholePrice}
            start={counterContext.prevWholePrice}
            // end={totalPriceAsync}
            // end={async () => await handleTotalPrice()}
            // end={handleTotalPrice()}
            end={
              counterContext.totalPrice() <= 500
                ? counterContext.totalPrice()
                : counterContext.totalPrice() * 0.9
            }
            // onUpdate={()=> )}
            // redraw={false}
            duration={2}
            prefix="$"
            separator=","
          >
            {({ countUpRef }) => (
              <div>
                <span ref={countUpRef}></span>
              </div>
            )}
          </CountUp>
        </span>
      </a>
    </nav>
  );
};

export default NavbarH;
