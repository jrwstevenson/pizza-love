import React, { Component } from "react";
import { Typography, Paper } from "@material-ui/core";
import ResChart from "./Chart";
import { Consumer } from "../../context";

export class Results extends Component {
  sortResults = results => {
    const sorted = results.sort(
      (a, b) => parseFloat(b.votes) - parseFloat(a.votes)
    );
    return sorted;
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { users } = value.state;
          const sortedResults = this.sortResults(Object.values(users));
          const topLover = sortedResults[0];
          return (
            <Paper>
              <Typography variant="h4" align="center" gutterBottom>
                Nobody loves pizza more than {topLover ? topLover.name : "..."}
              </Typography>
              <ResChart results={sortedResults.slice(0, 10)} />
            </Paper>
          );
        }}
      </Consumer>
    );
  }
}

export default Results;
