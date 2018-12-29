import React, { Component } from "react";
import base, { firebaseApp } from "./base";
import firebase from "firebase";

import { getAvatar } from "./helpers";

const Context = React.createContext();

export class Provider extends Component {
  state = {
    users: {},
    currentUser: null,
    text: "",
    errors: []
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
      this.setState({ currentUser: localStorageUser });
      console.log("User Loaded from Local Storage");
    }
  }

  sortResults = results => {
    const sorted = results.sort(
      (a, b) => parseFloat(b.votes) - parseFloat(a.votes)
    );
    return sorted;
  };

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
          this.setState(prevState => ({
            errors: [...prevState.errors, err.message]
          }))
        );
    } else if (tab === 1) {
      console.log("Login");
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

  authHandler = name => async authData => {
    const { uid, displayName = "test", email } = authData.user;
    const users = { ...this.state.users };

    if (!users[`${uid}`]) {
      const avatar = await getAvatar(email);
      users[`${uid}`] = {
        name: name || displayName || "test",
        votes: 1,
        avatar: avatar,
        uid: uid
      };
    }

    this.setState({ users, currentUser: uid });

    localStorage.setItem("pizza-love", uid);
  };

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
    await firebase.auth().signOut();
    this.setState({ currentUser: null });
    localStorage.removeItem("pizza-love");
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
      users: null,
      currentUser: null
    });
    console.log(this.state);
    this.setState({
      users: {
        Dummy1: {
          name: "James",
          votes: 3,
          avatar: "/images/barbacoa_del.png"
        },
        Dummy2: {
          name: "Tanya",
          votes: 2,
          avatar: "/images/carbonara_del.png"
        },
        Dummy3: {
          name: "Leia",
          votes: 7,
          avatar: "/images/caribena_del.png"
        },
        Dummy4: {
          name: "Robert",
          votes: 3,
          avatar: "/images/carne_lovers_del.png"
        },
        Dummy5: {
          name: "Caroline",
          votes: 5,
          avatar: "/images/hawaiana_del.png"
        },
        Dummy6: {
          name: "Tansly",
          votes: 2,
          avatar: "/images/kebab_lovers_del.png"
        },
        Dummy7: {
          name: "Chilli",
          votes: 6,
          avatar: "/images/margarita_del.png"
        },
        Dummy8: {
          name: "Victoria",
          votes: 1,
          avatar: "/images/marinera_del.png"
        },
        Dummy9: {
          name: "Jake",
          votes: 3,
          avatar: "/images/peperoni_lovers_del.png"
        },
        Dummy10: {
          name: "Amelia",
          votes: 2,
          avatar: "/images/pollo_parrilla_del.png"
        },
        Dummy11: {
          name: "Mini",
          votes: 2,
          avatar: "/images/queso_de_cabra_del.png"
        }
      }
    });
    console.log("Loaded Sample Users");
  };

  render() {
    const sortedResults = this.sortResults(Object.values(this.state.users));
    return (
      <Context.Provider
        value={{
          sortedResults: sortedResults,
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
