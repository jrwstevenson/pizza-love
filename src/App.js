import React, { Component } from "react";
import Title from "./components/Title";
import User from "./components/User";
import Results from "./components/Results";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Title />
        <User />
        <Results />
      </div>
    );
  }
}

export default App;
