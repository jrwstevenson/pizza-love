import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class GiveSomeLove extends Component {
  render() {
    const { addSomeLove } = this.props;
    return (
      <div style={{ display: "flex" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ justifyContent: "center" }}
          fullWidth={true}
          onClick={addSomeLove.bind(this, 0)}
        >
          Give Some Love
        </Button>
      </div>
    );
  }
}

export default GiveSomeLove;
