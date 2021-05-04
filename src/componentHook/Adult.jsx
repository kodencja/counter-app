import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function areEqual(prevProps, nextProps) {
  return prevProps.onModalIsOpen === nextProps.onModalIsOpen;
}

function Adult(props) {
  console.log("Adult Fn");

  const {
    onModalIsOpen,
    onSetModalIsOpen,
    onCountObjects,
    onDispatch,
    onAdultCounterClicked,
  } = props;

  const handleModalAnswer = (e) => {
    onSetModalIsOpen(false);
    if (e.target.id === "yes") {
      onCountObjects.forEach((counter) => {
        if (counter.adult === true) {
          onDispatch({
            type: "yesAdult",
            counterNo: counter,
            adultCounter: onAdultCounterClicked,
          });
        }
      });
    } else return false;
  };

  return (
    <Modal
      className="dialog-box border border-warning text-center py-4 px-5"
      isOpen={onModalIsOpen}
      onRequestClose={() => onSetModalIsOpen(false)}
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
          onClick={() => onSetModalIsOpen(false)}
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
  );
}

export default React.memo(Adult, areEqual);
