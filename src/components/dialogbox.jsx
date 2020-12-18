import React, { Component } from "react";

class DialogBox extends Component {
  render() {
    return (
      <div
        className={
          "dialog-box border border-warning text-center py-4 px-5 " +
          this.props.onShowOrHideClass()
        }
      >
        <button
          className="btn btn-sm btn-basic btn-alert border-dark btn-close font-weight-bold"
          onClick={this.props.onCloseBox}
        >
          X
        </button>
        <h4 className="bg-warning mb-3">Adult Zone!</h4>
        <h6 className="mb-4 confirm-age">Confirm your age!</h6>
        <h4 className="dialog-msg">
          Are you <span className="over18">over 18</span>?
        </h4>
        <button
          className="btn btn-primary btn-alert mr-5 mt-3"
          id="yes"
          onClick={this.props.onBoxAnswer}
        >
          YES
        </button>
        <button
          className="btn btn-danger btn-alert mt-3"
          id="no"
          onClick={this.props.onBoxAnswer}
        >
          NO
        </button>
      </div>
    );
  }
}

export default DialogBox;
