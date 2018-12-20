import React, { Component } from "react";
import GiveSomeLove from "./GiveSomeLove";
import LoginModal from "./LoginRegister/LoginModal";
import { Consumer } from "../../context";

export class User extends Component {
  state = {
    email: null,
    name: null,
    errors: null
  };

  render() {
    return (
      <Consumer>
        {value => {
          // Is someone signed in???
          const showToUser = value.state.currentUser ? (
            // Yes, let them show the love
            <GiveSomeLove addSomeLove={value.addSomeLove} />
          ) : (
            // No, show Login/Register
            <LoginModal
              authenticate={this.authenticate}
              loginForm={this.loginForm}
            />
          );
          return (
            <React.Fragment>
              {showToUser}
              <button onClick={value.sampleUsers}>Reset Users</button>
              <button onClick={value.logOut}>Log Out</button>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default User;
