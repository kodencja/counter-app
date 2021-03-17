import React, { Component } from "react";

class Response extends Component {
  getClasses() {
    let clses = "mt-3 respMsg mx-0 px-2 py-1 ";
    if (this.props.onWholesale > 0) clses += "respBgrWhSal";
    else if (this.props.onZero <= 0) clses += "respBgr0";

    return clses;
  }

  render() {
    console.log("Response render");
    return (
      <div className={this.getClasses()}>{this.props.onTooMuchFormat}</div>
    );
  }
}

export default Response;
