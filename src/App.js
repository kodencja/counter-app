import React, {
  useState,
  useEffect,
  useRef,
  useReducer,
  useMemo,
  useCallback,
} from "react";
import "./App.css";
import CountersH from "./componentHook/CountersH";
import NavbarH from "./componentHook/NavbarH";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import Modal from "react-modal";
import AddProd from "./componentHook/AddProd";
import DevelopInfo from "./componentHook/DevelopInfo";

Modal.setAppElement("#root");

export const CountContext = React.createContext();
export const ModalTipsContext = React.createContext();

const initState = [
  {
    id: 0,
    value: 0,
    name: "Coffe machine DeLonghi S 22.110.B",
    unit: "piece",
    price: 200,
    adult: false,
  },
  {
    id: 1,
    value: 0,
    name: "Earl Grey Tea, 100 Tea Bags",
    unit: "box",
    price: 10,
    adult: false,
  },
  {
    id: 2,
    value: 0,
    name: "Every Day Tea, 100 Tea Bags",
    unit: "box",
    price: 12,
    adult: false,
  },
  {
    id: 3,
    value: 0,
    name: "Bordeaux 2018",
    unit: "bottle",
    price: 20,
    adult: true,
  },
  { id: 4, value: 0, name: "Beer Tuborg", unit: "can", price: 5, adult: true },
];

const reducer = (state, action) => {
  let stateCopy = [...state];
  let index;
  if (action.type !== "add" && action.type !== "delete") {
    index = state.indexOf(action.counterNo);
    stateCopy[index] = { ...action.counterNo };
  } else if (action.type === "add") {
    index = state.length;
    stateCopy[index] = { id: index, value: 0, ...action.counterNo };
  } else if (action.type === "delete") {
    // this loop is necessary to avoid working on original state internal objects
    for (let i = 0; i < stateCopy.length; i++) {
      stateCopy[i] = { ...state[i] };
    }
    stateCopy = stateCopy.filter((obj) => obj.id !== action.counterNo.id);
    for (let i = 0; i < stateCopy.length; i++) {
      stateCopy[i].id = i;
    }
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
      stateCopy[index].adult = false;
      if (stateCopy[index].id === action.adultCounter.id) {
        stateCopy[index].value++;
      }
      return stateCopy;
    case "add":
      return stateCopy;
    case "delete":
      return stateCopy;
    case "reset":
      return initState;
    default:
      return state;
  }
};

// time for setTimeout in promises
const durationTime = 1.6;

function App() {
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

  // variable for tipps to be "abled" or "disabled"
  const [disable, setDisable] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [adultCounterClicked, setAdultCounterClicked] = useState({});

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
    // console.log("totalPrice Fn");
    return countObjects.reduce((c1, c2) => {
      return c1 + c2.price * c2.value;
    }, 0);
  }, [countObjects]);

  const handleModalAnswer = (e) => {
    setModalIsOpen(false);
    if (e.target.id === "yes") {
      countObjects.forEach((counter) => {
        if (counter.adult === true) {
          dispatch({
            type: "yesAdult",
            counterNo: counter,
            adultCounter: adultCounterClicked,
          });
        }
      });
    } else return false;
  };

  const addProduct = useCallback(
    (productObj) => {
      dispatch({ type: "add", counterNo: productObj });
    },
    [countObjects]
  );

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
      setAdultCounterClicked,
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
        <div className="btn-close">
          <button
            className="btn btn-sm btn-basic btn-alert border-dark font-weight-bold close-btn mx-2"
            onClick={() => setModalIsOpen(false)}
          >
            X
          </button>
        </div>
        <h4 className="bg-warning mb-3 p-1 h5">Adult Zone!</h4>
        <h5 className="mb-4 confirm-age h6">Confirm your age!</h5>
        <h4 className="dialog-question h5">Are you over 18?</h4>
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
      <CountContext.Provider value={valueContextFrist}>
        <NavbarH />
        <ModalTipsContext.Provider value={valueContextModal}>
          <CountersH />
        </ModalTipsContext.Provider>
        <AddProd addPro={addProduct} />
        <DevelopInfo />
      </CountContext.Provider>
      <ToastContainer style={{ textAlign: "justify" }} limit={1} />
      <footer className="text-center mx-auto my-1 footer">
        &copy; 2021 <i>by</i> codencja
      </footer>
    </div>
  );
}

export default App;
