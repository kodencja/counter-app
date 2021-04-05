import React, { useState, useContext, useEffect } from "react";
import { CountContext } from "../App";
import Tippy from "@tippyjs/react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function DevelopInfo() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const counterContext = useContext(CountContext);

  useEffect(() => {
    console.log("DevelopInfo render");
  });

  return (
    <div className="dev-info text-right mt-2">
      <Tippy
        content="Click to see some general information about the page's front-end environment"
        disabled={counterContext.disable}
        placement="top-start"
        delay={100}
      >
        <button
          className="btn btn-light btn-sm m-2"
          onClick={() => setModalIsOpen(true)}
        >
          Developing info
        </button>
      </Tippy>
      <Modal
        className="dialog-box border text-center pt-4 pb-5 px-5"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        shouldCloseOnOverlayClick={true}
        style={{
          overlay: { backgroundColor: "rgba(169, 169, 180, 0.733)" },
          content: {
            color: "snow",
            backgroundColor: "whitesmoke",
            padding: "30px",
          },
        }}
      >
        <div className="btn-close2">
          <button
            className="btn btn-sm btn-basic btn-alert close-btn border-dark font-weight-bold"
            onClick={() => setModalIsOpen(false)}
          >
            X
          </button>
        </div>

        <h4 className="bg-info mb-3 p-1 h5">Webdeveloping basic information</h4>
        <div className="dialog-question text-center mx-auto dev-box">
          This page was built in react.js with functional components based on
          HOOK tools such as useState, useEffect, useContext, useRef, useMemo,
          useCallback and useReducer. There are some additional libraries used
          here such as: @tippyjs/react, react-modal, react-toastify and
          react-countup. All components have been optimized appropriately.
        </div>
      </Modal>
    </div>
  );
}

export default React.memo(DevelopInfo);
