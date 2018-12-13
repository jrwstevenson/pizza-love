import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import ResChart from "./Chart";

export class Results extends Component {
  render() {
    const { results } = this.props;
    const sorted = results.sort(
      (a, b) => parseFloat(b.votes) - parseFloat(a.votes)
    );
    const topLover = sorted[0].name;
    return (
      <div>
        <Typography variant="h4" align="center" gutterBottom>
          Nobody loves pizza more than {topLover}
        </Typography>
        <ResChart results={sorted} />
      </div>
    );
  }
}

export default Results;
