import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import ResChart from "./Chart";

export class Results extends Component {
  render() {
    const { results } = this.props;
    const { topLover } = this.props;
    return (
      <div>
        <Typography variant="h4" align="center" gutterBottom>
          Nobody loves pizza more than {topLover}
        </Typography>
        <ResChart results={results} />
      </div>
    );
  }
}

export default Results;
