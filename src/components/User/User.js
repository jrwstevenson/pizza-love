import React, { Component } from "react";
import GiveSomeLove from "./GiveSomeLove";
import LoginModal from "./LoginRegister/LoginModal";
import firebase from "firebase";
import { firebaseApp } from "../../base";
import Notify from "../Notify";

export class User extends Component {
  state = {
    email: null,
    name: null,
    errors: null
  };

  componentDidMount() {
    const localStorageUser = localStorage.getItem("pizza-love");
    if (localStorageUser) {
      const user = JSON.parse(localStorageUser);
      console.log(user);
      this.setState({ ...user });
    }
  }

  authHandler = authData => {
    const { email, displayName } = authData.user;

    const newState = {
      email: email,
      name: displayName
    };

    localStorage.setItem("pizza-love", JSON.stringify(newState));
    this.setState(newState);
    console.log(authData);
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler)
      .catch(err =>
        this.setState({
          errors: err.message
        })
      );
  };

  loginForm = (email, password) => {
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(this.authHandler)
      .catch(err =>
        this.setState({
          errors: err.message
        })
      );
  };

  render() {
    let error;
    if (this.state.errors) {
      error = <Notify message={this.state.errors} />;
    }

    const showToUser = this.state.email ? (
      <GiveSomeLove addSomeLove={this.props.addSomeLove} />
    ) : (
      <LoginModal authenticate={this.authenticate} loginForm={this.loginForm} />
    );

    return (
      <React.Fragment>
        {showToUser}
        {error}
      </React.Fragment>
    );
  }
}

export default User;
