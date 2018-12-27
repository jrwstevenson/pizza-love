import React, { Component } from "react";
import Title from "./components/Title";
import User from "./components/User/User";
import Results from "./components/Results/Results";
import { Provider } from "./context";
import { Paper } from "@material-ui/core";

class App extends Component {
  render() {
    return (
      <Provider>
        <div className="App">
          <Paper>
            <Title />
            <User />
          </Paper>
          <Results />
        </div>
      </Provider>
    );
  }
}

export default App;
