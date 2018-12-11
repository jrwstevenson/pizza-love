import React, { Component } from "react";
import Title from "./components/Title";
import User from "./components/User";
import Results from "./components/Results";

class App extends Component {
  state = {
    results: [
      { user: 0, name: "James", votes: 2 },
      { user: 1, name: "Tanya", votes: 10 },
      { user: 2, name: "Leia", votes: 1 }
    ]
  };

  componentDidMount() {}

  addSomeLove = id => {
    const results = [...this.state.results];
    results[id].votes = results[id].votes + 1 || 1;
    this.setState({ results: results });
  };

  sortPizzaLovers = () => {};

  render() {
    const results = [...this.state.results];
    const sorted = results.sort(
      (a, b) => parseFloat(b.votes) - parseFloat(a.votes)
    );
    return (
      <div className="App">
        <Title />
        <User addSomeLove={this.addSomeLove} />
        <Results results={sorted} topLover={sorted[0].name} />
      </div>
    );
  }
}

export default App;
