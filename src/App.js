import React, { Component } from "react";
import Title from "./components/Title";
import User from "./components/User/User";
import Results from "./components/Results/Results";
import base from "./base";

class App extends Component {
  state = {
    results: [
      { user: 0, name: "James", votes: 2 },
      { user: 1, name: "Tanya", votes: 10 },
      { user: 2, name: "Leia", votes: 1 }
    ],
    users: {
      user0: { name: "James", votes: 2 },
      user1: { name: "Tanya", votes: 10 },
      user2: { name: "Leia", votes: 1 }
    }
  };

  componentDidMount() {
    // base.syncState("pizza-love/results", {
    //   context: this,
    //   state: "fishes"
    // });
    this.ref = base.syncState(`James-Store/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  addSomeLove = id => {
    const results = [...this.state.results];
    results[id].votes = results[id].votes + 1 || 1;
    this.setState({ results: results });
  };

  sortPizzaLovers = () => {};

  render() {
    const results = [...this.state.results];
    return (
      <div className="App">
        <Title />
        <User addSomeLove={this.addSomeLove} />
        <Results results={results} />
      </div>
    );
  }
}

export default App;
