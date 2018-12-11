import React, { Component } from "react";
import GiveSomeLove from "./GiveSomeLove";

export class User extends Component {
  render() {
    return (
      <div>
        <GiveSomeLove addSomeLove={this.props.addSomeLove} />
      </div>
    );
  }
}

export default User;
