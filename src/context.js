import React, { Component } from "react";
import base, { firebaseApp } from "./base";
import firebase from "firebase";

const Context = React.createContext();

export class Provider extends Component {
  state = {
    users: {},
    currentUser: null,
    text: "",
    errors: null
  };

  // Preload some data to kick things off
  componentWillMount() {
    // Sync the state from Firebase
    base.syncState("users", {
      context: this,
      state: "users"
    });

    // Check if they have logged in before
    const localStorageUser = localStorage.getItem("pizza-love");
    if (localStorageUser) {
      const user = JSON.parse(localStorageUser);
      this.setState({ currentUser: user });
      console.log("User Loaded from Local Storage");
    }
  }

  // User methods

  onSubmit = formData => {
    console.log(formData);
    const { tab, email, password, name } = formData;
    if (tab === 0) {
      console.log("Register");
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(this.authHandler(name))
        .catch(err =>
          this.setState({
            errors: err.message
          })
        );
    } else if (tab === 1) {
      console.log("Login");
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(this.authHandler(null))
        .catch(err =>
          this.setState({
            errors: err.message
          })
        );
    }
  };

  authHandler = name => authData => {
    console.log(name, authData.user.uid);

    const { uid, displayName = "test" } = authData.user;
    const users = { ...this.state.users };

    if (!users[`${uid}`]) {
      users[`${uid}`] = {
        name: name || displayName || "test",
        votes: 1
      };
    }

    this.setState({ users, currentUser: uid });
  };

  authExternal = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler(null))
      .catch(err =>
        this.setState({
          errors: err.message
        })
      );
  };

  authLocal = state => {
    console.log(state);
  };

  logOut = async () => {
    await firebase.auth().signOut();
    this.setState({ currentUser: null });
    console.log("Logged out");
  };

  // Add some love
  addSomeLove = () => {
    const { currentUser, users } = this.state;
    users[currentUser].votes = users[currentUser].votes + 1 || 1;
    this.setState({ users });
  };

  // Dev helpers
  sampleUsers = () => {
    this.setState({
      users: {
        qP7WI0zUQMaMpnXm4zSXRGKOx7y2: {
          name: "James",
          votes: 3
        },
        I4MjgvBP7VfVO8ne3pBCXeEViyU2: {
          name: "Tanya",
          votes: 2
        },
        Ctc4JznO87U5kxUYBY9MH9DYIQl2: {
          name: "Leia",
          votes: 2
        }
      }
    });
    console.log("Loaded Sample Users");
  };

  logThis = msg => {
    console.log(msg);
  };

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          logThis: this.logThis,
          sampleUsers: this.sampleUsers,
          authLocal: this.authLocal,
          onSubmit: this.onSubmit,
          authExternal: this.authExternal,
          addSomeLove: this.addSomeLove,
          logOut: this.logOut
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
