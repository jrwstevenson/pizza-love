import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class GiveSomeLove extends Component {
  render() {
    return (
      <div style={{ display: "flex" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ justifyContent: "center" }}
          fullWidth={true}
        >
          Give Some Love
        </Button>
      </div>
    );
  }
}

export default GiveSomeLove;
