import React, { Component } from "react";
import Title from "./components/Title";
import User from "./components/User/User";
import Results from "./components/Results/Results";
import { Provider } from "./context";

class App extends Component {
  render() {
    return (
      <Provider>
        <div className="App">
          <Title />
          <User />
          <Results />
        </div>
      </Provider>
    );
  }
}

export default App;
