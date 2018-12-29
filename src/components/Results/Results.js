import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import ResChart from "./Chart";
import { Consumer } from "../../context";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 20,
    margin: "auto",
    maxWidth: 958
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

export class Results extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Consumer>
        {value => {
          const { sortedResults } = value;
          return (
            <Paper className={classes.paper}>
              <ResChart results={sortedResults.slice(0, 10)} />
            </Paper>
          );
        }}
      </Consumer>
    );
  }
}

export default withStyles(styles)(Results);
