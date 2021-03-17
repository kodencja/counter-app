import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useReducer,
} from "react";
import "./App.css";
import CountersH from "./componentHook/CountersH";
import NavbarH from "./componentHook/NavbarH";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

export const CountContext = React.createContext();
const initState = [
  { id: 1, value: 0, name: "Coffe machine DeLonghi S 22.110.B", price: 200 },
  { id: 2, value: 0, name: "Earl Grey Tea, 100 Tea Bags", price: 10 },
  { id: 3, value: 0, name: "Every Day Tea, 100 Tea Bags", price: 12 },
  { id: 4, value: 0, name: "Bordeaux 2018", price: 20, adult: false },
];

const reducer = (state, action) => {
  const stateCopy = [...state];
  let index, initStateCopy;
  // console.log(typeof action.counterNo);
  // if (typeof action.counterNo !== "undefined") {
  if (typeof action.counterNo === "object") {
    // console.log("not undefined");
    index = state.indexOf(action.counterNo);

    // robimy dodatkową kopię obiektu, którego 'value' chcemy zmienić, aby ten obiekt zyskał nową referencję a nie był zmieniany bezpośrednio z pominięciem funkcji 'dispatch', bo tego robić nie wolno
    stateCopy[index] = { ...action.counterNo };
    // if(action.type === )
  }
  // else {
  //   if (action.counterNo === "adult") {
  //   }
  // if(typeof action.counterNo === "undefined") {
  // console.log("undefined");
  // console.log(initState);
  // if(action.type)
  // initStateCopy = [...initState];
  // initStateCopy.map((counter) => {
  //   counter.value = 0;
  //   if (counter.hasOwnProperty("adult")) counter.adult = false;
  //   return counter;
  // });
  // }
  // else if(typeof action.counterNo === "string"){
  // prevPrice = stateCopy.reduce((prevC, nextC)=>{
  //   return prevC + nextC.price * nextC.value
  // },0)
  // }

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
    case "noAdult":
      return state;
    case "reset":
      return initState;
    default:
      return state;
  }
};

function App() {
  const [countObjects, dispatch] = useReducer(reducer, initState);
  // const [adultProductId, setAdultProductId] = useState(1);
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

  //   const [countObjects, setCountObjects] = useState([
  //     { id: 1, value: 0, name: "Coffe machine DeLonghi S 22.110.B", price: 200 },
  //     { id: 2, value: 1, name: "Earl Grey Tea, 100 Tea Bags", price: 10 },
  //     { id: 3, value: 0, name: "Every Day Tea, 100 Tea Bags", price: 12 },
  //     { id: 4, value: 0, name: "Bordeaux 2018", price: 20, adult: false },
  //   ]);

  useEffect(() => {
    // console.log(countObjects);
    // console.log(prevTotalPrice.current);
    // setPrevTotalPrice(
    //   countObjects.reduce((prevC, nextC) => {
    //     return prevC + nextC.price * nextC.value;
    //   }, 0)
    // );
    prevTotalPrice.current = countObjects.reduce((prevC, nextC) => {
      return prevC + nextC.price * nextC.value;
    }, 0);
    prevTotalValue.current = countObjects.reduce((prevC, nextC) => {
      return prevC + nextC.value;
    }, 0);
    // console.log(prevTotalPrice);
    // console.log(prevTotalValue.current);
  }, [countObjects]);

  // const handleReducer=()=>{

  // }

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

    // toast.error("Error! Check it once again!", {
    //   position: toast.POSITION.TOP_CENTER,
    //   autoClose: 4000,
    // });
  };

  const totalPrice = () => {
    // console.log("totalPrice");
    return countObjects.reduce((c1, c2) => {
      return c1 + c2.price * c2.value;
    }, 0);
  };

  // const handleAdultAnswer =(counter, el)=>{
  //   const counters = [...countObjects];
  //   const index = counters.indexOf(counter);
  //   counters[index] = {...counter};
  // }

  const handleModalAnswer = (e) => {
    setModalIsOpen(false);
    return countObjects.forEach((counter) => {
      if (counter.hasOwnProperty("adult")) {
        if (e.target.id === "yes") {
          dispatch({ type: "yesAdult", counterNo: counter });
        } else if (e.target.id === "no") {
          dispatch({ type: "noAdult", counterNo: counter });
        }
        // this.handleAdultAnswer(counter, e);
      }
    });

    // if(answer === 'yes'){

    //   set
    // }
  };

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
            backgroundColor: "#ecf7f8",
            padding: "50px",
            // transform: "translate(-50%, -50%)",
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
          // onClick={() => handleModalAnswer("yes")}
          onClick={handleModalAnswer}
        >
          YES
        </button>
        <button
          className="btn btn-danger btn-alert mt-3"
          id="no"
          // onClick={() => handleModalAnswer("no")}
          onClick={handleModalAnswer}
        >
          NO
        </button>
        {/* <button onClick={() => setModalIsOpen(false)}>Close modal</button> */}
      </Modal>
      <CountContext.Provider
        value={{
          countState: countObjects,
          countDispatch: dispatch,
          prevWholePrice: prevTotalPrice.current,
          prevWholeValue: prevTotalValue.current,
          toastNotify: notify,
          totalPrice,
          disable,
          setDisable,
          setModalIsOpen,
        }}
      >
        <NavbarH />
        {/* <CountersH counterObj={countObjects} /> */}
        <CountersH />
        {/* <CountersH /> */}
        <ToastContainer style={{ textAlign: "justify" }} limit={1} />
      </CountContext.Provider>
    </div>
  );
}

export default App;
