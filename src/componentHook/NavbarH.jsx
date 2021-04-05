import React, {
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { CountContext } from "../App";
import CountUp from "react-countup";

const NavbarH = () => {
  const counterContext = useContext(CountContext);
  const [badgeClasses, setBadgeClasses] = useState(
    "badge badge-pill  ml-1 badge-warning"
  );

  const priceContext = counterContext.totalPrice;

  useEffect(() => {
    getBadgeCl();
  }, [priceContext]);

  console.log("Navbar render!");

  const handleSumupValues = useMemo(() => {
    // console.log("handleSumupValues Fn");
    return counterContext.countState.reduce((countPrev, countNext) => {
      return countPrev + countNext.value;
    }, 0);
  }, [counterContext.countState]);

  const getBadgeCl = useCallback(() => {
    // console.log("getBadgeCl NavbarH");
    let classes = "badge badge-pill  ml-1 ";
    classes += handleSumupValues === 0 ? "badge-warning" : "badge-primary";
    if (counterContext.prevWholeValue - handleSumupValues <= 0) {
      setBadgeClasses(classes);
    } else {
      return new Promise((resolve, reject) => {
        if (reject.length > 1) reject(new Error("Error to get total price!"));
        else {
          setTimeout(() => {
            setBadgeClasses(classes);
            resolve(classes);
          }, counterContext.durationTime * 550);
        }
      });
    }
  }, [counterContext.countState]);

  return (
    <nav className="navbar navbar-light bg-light ml-2">
      <a className="navbar-brand" href="##">
        <div className="row mb-2">
          <div>Number of&nbsp;</div>
          <span className="font-weight-bold n1">grades&nbsp;</span>to buy:{" "}
          <span className="badge badge-pill badge-secondary ml-1 mr-0">
            {
              counterContext.countState.filter((counter) => counter.value > 0)
                .length
            }
          </span>
        </div>
        {/* <div className="w-100 my-1"></div> */}
        <div className="row mb-2">
          <span>Number of&nbsp;</span>
          <span className="font-weight-bold n2">products&nbsp;</span>
          to buy:
          <span className={badgeClasses}>
            <CountUp
              start={counterContext.prevWholeValue}
              end={handleSumupValues}
              duration={
                counterContext.prevWholeValue - handleSumupValues <= 0
                  ? 0.3
                  : counterContext.durationTime
              }
            >
              {({ countUpRef }) => (
                <div>
                  <span ref={countUpRef}></span>
                </div>
              )}
            </CountUp>
          </span>
        </div>

        {/* <div className="w-100 my-1"></div> */}
        <div className="row">
          <span className="font-weight-bold n3">Total price: </span>
          <span className="badge badge-pill badge-success ml-1 py-2">
            <CountUp
              start={counterContext.prevWholePrice}
              end={
                counterContext.totalPrice <= 500
                  ? counterContext.totalPrice
                  : counterContext.totalPrice * 0.9
              }
              duration={counterContext.durationTime}
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
        </div>
      </a>
    </nav>
  );
};

export default React.memo(NavbarH);
