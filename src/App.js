import React, { useState, useEffect, useRef, useReducer, useMemo } from "react";
import "./App.css";
import CountersH from "./componentHook/CountersH";
import NavbarH from "./componentHook/NavbarH";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

export const CountContext = React.createContext();
export const ModalTipsContext = React.createContext();

const initState = [
  { id: 1, value: 0, name: "Coffe machine DeLonghi S 22.110.B", price: 200 },
  { id: 2, value: 0, name: "Earl Grey Tea, 100 Tea Bags", price: 10 },
  { id: 3, value: 0, name: "Every Day Tea, 100 Tea Bags", price: 12 },
  { id: 4, value: 0, name: "Bordeaux 2018", price: 20, adult: false },
];

const reducer = (state, action) => {
  const stateCopy = [...state];
  let index;

  if (typeof action.counterNo === "object") {
    index = state.indexOf(action.counterNo);
    stateCopy[index] = { ...action.counterNo };
  }

  switch (action.type) {
    case "increment":
      stateCopy[index].value++;
      return stateCopy;
    case "decrement":
      if (stateCopy[index].value <= 0) {
        return stateCopy;
      } else {
        stateCopy[index].value--;
        return stateCopy;
      }
    case "yesAdult":
      stateCopy[index].adult = true;
      stateCopy[index].value++;
      return stateCopy;
    case "reset":
      return initState;
    default:
      return state;
  }
};

const durationTime = 1.6;

function App() {
  const [check, setCheck] = useState(0);
  const [countObjects, dispatch] = useReducer(reducer, initState);
  const prevTotalPrice = useRef(
    countObjects.reduce((prevC, nextC) => {
      return prevC + nextC.price * nextC.value;
    }, 0)
  );
  const prevTotalValue = useRef(
    countObjects.reduce((prevC, nextC) => {
      return prevC + nextC.value;
    }, 0)
  );

  const [disable, setDisable] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // store the previous value of all prices and nubers of all products ("value")
  useEffect(() => {
    prevTotalPrice.current = countObjects.reduce((prevC, nextC) => {
      return prevC + nextC.price * nextC.value;
    }, 0);
    prevTotalValue.current = countObjects.reduce((prevC, nextC) => {
      return prevC + nextC.value;
    }, 0);
  }, [countObjects]);

  console.log("App render!");

  const notify = () => {
    console.log("notify");
    toast.info(
      "To get wholesales prices of our products you are more than welcome to contact with our office.",
      {
        position: "top-right",
        autoClose: 8000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      }
    );
  };

  const totalPrice = useMemo(() => {
    console.log("totalPrice Fn");
    return countObjects.reduce((c1, c2) => {
      return c1 + c2.price * c2.value;
    }, 0);
  }, [countObjects]);

  const handleModalAnswer = (e) => {
    console.log("handleModalAnswer Fn");
    setModalIsOpen(false);
    if (e.target.id === "yes") {
      return countObjects.forEach((counter) => {
        if (counter.hasOwnProperty("adult")) {
          dispatch({ type: "yesAdult", counterNo: counter });
        }
      });
    } else return false;
  };

  const valueContextFrist = useMemo(() => {
    return {
      countState: countObjects,
      countDispatch: dispatch,
      prevWholePrice: prevTotalPrice.current,
      prevWholeValue: prevTotalValue.current,
      totalPrice,
      durationTime,
      disable,
      setDisable,
    };
  }, [countObjects, disable]);

  const valueContextModal = useMemo(() => {
    return { toastNotify: notify, setModalIsOpen };
  }, [countObjects]);

  return (
    <div className="App">
      <Modal
        className="dialog-box border border-warning text-center py-4 px-5"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        shouldCloseOnOverlayClick={false}
        style={{
          overlay: { backgroundColor: "rgba(169, 169, 180, 0.733)" },
          content: {
            color: "crimson",
            backgroundColor: "whitesmoke",
            padding: "50px",
          },
        }}
      >
        <button
          className="btn btn-sm btn-basic btn-alert border-dark btn-close font-weight-bold"
          onClick={() => setModalIsOpen(false)}
        >
          X
        </button>
        <h4 className="bg-warning mb-3">Adult Zone!</h4>
        <h5 className="mb-4 confirm-age">Confirm your age!</h5>
        <h4 className="dialog-question">Are you over 18?</h4>
        <button
          className="btn btn-primary btn-alert mr-5 mt-3"
          id="yes"
          onClick={handleModalAnswer}
        >
          YES
        </button>
        <button
          className="btn btn-danger btn-alert mt-3"
          id="no"
          onClick={handleModalAnswer}
        >
          NO
        </button>
      </Modal>
      <div>{check}</div>
      <button onClick={() => setCheck((prev) => prev + 1)}>set check no</button>
      <CountContext.Provider value={valueContextFrist}>
        <NavbarH />
        <ModalTipsContext.Provider value={valueContextModal}>
          <CountersH />
        </ModalTipsContext.Provider>
      </CountContext.Provider>
      <ToastContainer style={{ textAlign: "justify" }} limit={1} />
    </div>
  );
}

export default App;
