import React, { Component } from "react";

// Input: liked: booleean
// Output: onClick

class Like extends Component {
  state = {};

  renderClass() {
    let className = "fa fa-heart";

    if (!this.props.liked) {
      className += "-o";
    }

    return className;
  }

  render() {
    return (
      <i
        style={{ cursor: "pointer" }}
        className={this.renderClass()}
        aria-hidden="true"
        onClick={this.props.onClick}
      ></i>
    );
  }
}

export default Like;
