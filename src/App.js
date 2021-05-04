import React, {
  useState,
  useEffect,
  useRef,
  useReducer,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";

import CountersH from "./componentHook/CountersH";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";

// const AddProd = lazy(() => import("./componentHook/AddProd"));
const Adult = lazy(() => import("./componentHook/Adult"));

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

function App({ children }) {
  const [countObjects, dispatch] = useReducer(reducer, initState);

  // store the previous value of all prices and numbers of all products ("value")
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

  // flag for modal opened or closed
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // flag to check if the client is adult or not
  const [adultCounterClicked, setAdultCounterClicked] = useState({});

  // store the previous value of all prices and numbers of all products ("value")
  useEffect(() => {
    prevTotalPrice.current = countObjects.reduce((prevC, nextC) => {
      return prevC + nextC.price * nextC.value;
    }, 0);
    prevTotalValue.current = countObjects.reduce((prevC, nextC) => {
      return prevC + nextC.value;
    }, 0);
  }, [countObjects]);

  console.log("App render!");

  useEffect(() => {
    console.log(children);
    // console.log(children.type.type.name);
  }, []);

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

  const addProduct = useCallback(
    (productObj) => {
      dispatch({ type: "add", counterNo: productObj });
    },
    [countObjects]
  );

  const valueContextFirst = useMemo(() => {
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

  const loading = <p>Loading...</p>;

  return (
    <div className="App">
      {/* <ErrorBoundary> */}
      <Suspense fallback={loading}>
        <Adult
          onModalIsOpen={modalIsOpen}
          onSetModalIsOpen={setModalIsOpen}
          onCountObjects={countObjects}
          onDispatch={dispatch}
          onAdultCounterClicked={adultCounterClicked}
        />
      </Suspense>
      {/* </ErrorBoundary> */}

      <CountContext.Provider value={valueContextFirst}>
        {/* <NavbarH /> */}
        {React.cloneElement(children[0], { counterContext: valueContextFirst })}
        {/* {children[0].type.type.name === "NavbarH"
          ? React.cloneElement(children, { counterContext: valueContextFirst })
          : ""} */}
        <ModalTipsContext.Provider value={valueContextModal}>
          <CountersH />
        </ModalTipsContext.Provider>
        <Suspense fallback={loading}>
          {/* <AddProd addPro={addProduct} /> */}
          {React.cloneElement(children[2], {
            onDisable: disable,
            addPro: addProduct,
          })}
        </Suspense>
        {/* <Suspense fallback={loading}>
          <DevelopInfo />
        </Suspense> */}
        {/* {children} */}
      </CountContext.Provider>

      {React.cloneElement(children[1], { onDisable: disable })}
      {/* {children.type.type.name === "DevelopInfo"
        ? React.cloneElement(children, { onDisable: disable })
        : ""} */}
      <ToastContainer style={{ textAlign: "justify" }} limit={1} />
      <footer className="text-center mx-auto my-1 footer">
        &copy; 2021 <i>by</i> <strong>codencja</strong>
      </footer>
    </div>
  );
}

export default App;
