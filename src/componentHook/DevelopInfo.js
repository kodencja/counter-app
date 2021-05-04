import React, { useState, useEffect } from "react";
import Tippy from "@tippyjs/react";
import Modal from "react-modal";
import("./modalComp.css");

Modal.setAppElement("#root");

function areEqual(prevProps, nextProps) {
  return prevProps.onDisable === nextProps.onDisable;
}

function DevelopInfo({ onDisable }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    console.log("DevelopInfo render");
  });

  return (
    <aside className="down-buttons">
      <a href="https://codencja.herokuapp.com/">
        <button type="link" className="btn-down home-page-link">
          Back to Home Page
        </button>
      </a>
      <Tippy
        content="Click to see some general information about the page's front-end environment"
        disabled={onDisable}
        placement="top-start"
        delay={100}
      >
        <button className="btn btn-down" onClick={() => setModalIsOpen(true)}>
          Code info
        </button>
      </Tippy>
      <Modal
        className="dialog-box border text-center pt-4 pb-5 px-3"
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
        <div className="dialog-question mx-auto dev-box">
          This page was built in <b>REACT.JS</b> with functional components
          based on HOOK tools such as{" "}
          <b> useState, useEffect, useContext, useRef, useMemo, useCallback</b>{" "}
          and <b>useReducer</b>. There are some additional libraries used here
          such as: <b>@tippyjs/react, react-modal, react-toastify</b> and
          <b> react-countup</b>. All components have been optimized using{" "}
          functions such as useMemo, useCallback or <b>React.memo()</b> and{" "}
          <b>Same Element Reference Technique</b>, both enhanced by{" "}
          <b>React.cloneElement()</b> and '<b>areEqual</b>' function that
          compares previous and next values of a component's 'props', as well as{" "}
          <b>lazy</b> and <b>Suspense</b> React's libraries. <br />
          <br />
          <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
            Component's description:
          </p>{" "}
          <b>AddProd.jsx</b> is a component handling adding a new product to the
          list; <b>Danger.jsx</b> is a component handling deleting a product
          from the list; <b>Adult.jsx</b> is a component handling verification
          whether the client is adult or not; <b>NavbarH.jsx</b> - a component
          dealing with nav / menu issues; <b>CounterH.jsx</b> - a component of
          one single product with it's properties such as 'name', 'unit',
          'price' and total price along with control panel (add, minus or
          delete); <b>CountersH.jsx</b> - a component embracing all products
          with their relevant properties; <b>DevelopInfo.js</b> - a component
          with 'Home Page Link' and basic coding information.
        </div>
      </Modal>
    </aside>
  );
}

export default React.memo(DevelopInfo, areEqual);
