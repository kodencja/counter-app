import React, { useState, useRef, useEffect, useCallback } from "react";
import Tippy from "@tippyjs/react";

const initProduct = { name: "", unit: "piece", price: 0, adult: false };

function areEqual(prevProps, nextProps) {
  return prevProps.onDisable === nextProps.onDisable;
}

function Add({ onDisable, addPro }) {
  const [product, setProduct] = useState(initProduct);
  const [checkAnswer, setCheckAnswer] = useState();
  const [addVisibility, setAddVisibility] = useState(false);
  const formRef = React.createRef();
  const inputRef = useRef([]);

  const addToInputRef = useCallback((el) => {
    if (el && !inputRef.current.includes(el)) {
      inputRef.current.push(el);
    }
  }, []);

  useEffect(() => {
    if (addVisibility === true) {
      setTimeout(() => {
        inputRef.current[0].focus();
      }, 1300);
    }
  }, [addVisibility]);

  console.log("AddProd render!");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(e.target);
    addPro(product);
    setProduct(initProduct);
  };

  // handle focus on input fields while using the Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      switch (e.target.name) {
        case "name":
          e.preventDefault();
          inputRef.current[1].focus();
          break;
        case "unit":
          e.preventDefault();
          inputRef.current[2].focus();
          break;
        case "price":
          e.preventDefault();
          inputRef.current[3].focus();
          break;
        case "adult":
          e.preventDefault();
          inputRef.current[4].focus();
          break;
        case "submit":
          inputRef.current[0].focus();
          break;
        default:
          e.preventDefault();
          inputRef.current[0].focus();
          break;
      }
    }
  };

  const handleOnChange = (e) => {
    let propValue = e.target.value;
    if (e.target.name === "adult") {
      if (e.target.checked === true) {
        propValue = true;
      } else {
        propValue = false;
      }
    } else if (e.target.name === "price") {
      if (propValue[0] <= 0) {
        setCheckAnswer("The price cannot start with 0 number.");
        return;
      } else if (propValue[0] !== 0) {
        setCheckAnswer("");
      }
    }
    setProduct({ ...product, [e.target.name]: propValue });
  };

  const formStyle = addVisibility
    ? "formAdd row visible-form"
    : " formAdd row hidden-form";

  return (
    <div className="text-left bg-light">
      <Tippy
        content="Click to open add form. Use enter, tab key or mouse to jump between input fields"
        disabled={onDisable}
        placement="top-start"
        delay={100}
      >
        <button
          className="btn btn-info add-btn mt-3 mb-2 ml-2"
          onClick={() => setAddVisibility(!addVisibility)}
        >
          Add a new product
        </button>
      </Tippy>

      <div className="container formWrapp">
        <form onSubmit={handleSubmit} className={formStyle} ref={formRef}>
          <div className="row mx-0">
            <div className="form-group col-md-4">
              <label htmlFor="name" className="label ml-md-3 mr-1">
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                value={product.name}
                required
                maxLength="75"
                placeholder="Product name"
                onChange={handleOnChange}
                ref={addToInputRef}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="unit" className="label ml-md-3 mr-1">
                Unit:
              </label>
              <select
                className="form-control form-control-sm"
                id="unit"
                name="unit"
                required
                onChange={handleOnChange}
                ref={addToInputRef}
                onKeyDown={handleKeyDown}
              >
                <option>piece</option>
                <option>kg</option>
                <option>box</option>
                <option>can</option>
                <option>bottle</option>
                <option>litre</option>
              </select>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="price" className="mr-1">
                Price ($):
              </label>
              <input
                type="number"
                step="any"
                name="price"
                id="price"
                value={product.price}
                className="form-control"
                min="1"
                max="10000"
                required
                placeholder="Price"
                onChange={handleOnChange}
                ref={addToInputRef}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="form-group mt-4 col-md-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="adultsCheck"
                  name="adult"
                  checked={product.adult}
                  onChange={handleOnChange}
                  ref={addToInputRef}
                  onKeyDown={handleKeyDown}
                />
                <label className="form-check-label" htmlFor="adultsCheck">
                  Only for adults
                </label>
              </div>
            </div>
          </div>
          <div className="checkAnswer">{checkAnswer}</div>
          <div className="w-100"></div>
          <button
            name="submit"
            className="btn btn-success ml-3 add-submit my-1"
            ref={addToInputRef}
            onKeyDown={handleKeyDown}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default React.memo(Add, areEqual);
