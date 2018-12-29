import React, { Component } from "react";
import {
  Typography,
  ListItem,
  ListItemText,
  Grid,
  Divider
} from "@material-ui/core";
import { Consumer } from "../../context";

const getOrdinal = n => {
  var s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export class Results extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { sortedResults, state } = value;
          const { position, votes } = this.props;
          const topLover = sortedResults[0];

          return (
            <React.Fragment>
              <Typography variant="title" align="center" gutterBottom>
                Pizza Lover Stats
              </Typography>
              <Grid container spacing={8}>
                <Grid item sm={6}>
                  <ListItem>
                    <ListItemText
                      primary={topLover ? topLover.name : "..."}
                      secondary={"Top Pizza Lover"}
                    />
                  </ListItem>
                </Grid>
                <Grid item sm={6}>
                  <ListItem>
                    <ListItemText
                      primary={
                        state.users !== 0
                          ? Object.keys(state.users).length
                          : "..."
                      }
                      secondary={"Total Pizza Lovers"}
                    />
                  </ListItem>
                </Grid>
              </Grid>
              <Divider variant="middle" style={{ marginBottom: 10 }} />
              <Grid container spacing={8}>
                <Grid item sm={6}>
                  <ListItem>
                    <ListItemText
                      primary={position ? getOrdinal(position) : "Please Login"}
                      secondary={"My Position"}
                    />
                  </ListItem>
                </Grid>
                <Grid item sm={6}>
                  <ListItem>
                    <ListItemText
                      primary={votes ? votes : "Please Login"}
                      secondary={"My Votes"}
                    />
                  </ListItem>
                </Grid>
              </Grid>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Results;
