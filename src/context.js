import React, { Component } from "react";
import base, { firebaseApp } from "./base";
import firebase from "firebase";

import { getAvatar } from "./helpers";

const Context = React.createContext();

export class Provider extends Component {
  state = {
    users: {},
    currentUser: null,
    errors: []
  };

  // Get some data to kick things off
  componentWillMount() {
    // Sync the state from Firebase
    base.syncState("users", {
      context: this,
      state: "users"
    });

    // Check if they have logged in before
    const localStorageUser = localStorage.getItem("pizza-love");
    if (localStorageUser) {
      this.setState({ currentUser: localStorageUser });
      console.log("User Loaded from Local Storage");
    }
  }

  // User methods
  // Handle Username and Password form data
  onSubmit = formData => {
    const { tab, email, password, name } = formData;
    if (tab === 0) {
      // Handle Registration
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(this.authHandler(name))
        .catch(err =>
          this.setState(prevState => ({
            errors: [...prevState.errors, err.message]
          }))
        );
    } else if (tab === 1) {
      // Handle Login
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(this.authHandler(null))
        .catch(err =>
          this.setState(prevState => ({
            errors: [...prevState.errors, err.message]
          }))
        );
    }
  };

  // Save Login to State
  authHandler = name => async authData => {
    const { uid, displayName, email } = authData.user;
    const users = { ...this.state.users };
    // Add new users to state
    if (!users[`${uid}`]) {
      // Set new avatar
      const avatar = await getAvatar(email);
      users[`${uid}`] = {
        name: name || displayName || "test",
        votes: 1,
        avatar: avatar,
        uid: uid
      };
    }
    // Save users and current user
    this.setState({ users, currentUser: uid });
    // Keep user ID in browser storage
    localStorage.setItem("pizza-love", uid);
  };

  // Handle Github and Google logins
  authExternal = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler(null))
      .catch(err =>
        this.setState(prevState => ({
          errors: [...prevState.errors, err.message]
        }))
      );
  };

  logOut = async () => {
    // Tell Firebase
    await firebase.auth().signOut();
    // Remove From State
    this.setState({ currentUser: null });
    // Delete from Local Storage
    localStorage.removeItem("pizza-love");
  };

  // Add some voting love
  addSomeLove = () => {
    const { currentUser, users } = this.state;
    users[currentUser].votes = users[currentUser].votes + 1 || 1;
    this.setState({ users });
  };

  // Order users by votes
  sortResults = results => {
    const sorted = results.sort(
      (a, b) => parseFloat(b.votes) - parseFloat(a.votes)
    );
    return sorted;
  };

  render() {
    const sortedResults = this.sortResults(Object.values(this.state.users));
    return (
      <Context.Provider
        value={{
          state: this.state,
          onSubmit: this.onSubmit,
          authExternal: this.authExternal,
          logOut: this.logOut,
          addSomeLove: this.addSomeLove,
          sortedResults: sortedResults
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
