import React, { Component } from "react";
import Info from "./Info";
import GiveSomeLove from "./GiveSomeLove";
import LoginModal from "./LoginRegister/LoginModal";
import { Consumer } from "../../context";
import { Paper, Grid, withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 20,
    marginBottom: 20,
    textAlign: "center",
    height: 180,
    width: 450
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

export class User extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Consumer>
        {value => {
          const { addSomeLove, logOut, sortedResults } = value;
          const { currentUser, users } = value.state;
          // Get User from currentUser id
          const thisUser = users[currentUser];
          // Calc user position
          const currentPosition =
            sortedResults
              .map(e => {
                return e.uid;
              })
              .indexOf(currentUser) + 1;

          // Is someone signed in???
          const isLoggedIn = currentUser ? (
            // Yes, let them show the love
            <GiveSomeLove
              addSomeLove={addSomeLove}
              logOut={logOut}
              name={thisUser ? thisUser.name : "..."}
              avatar={thisUser ? thisUser.avatar : null}
            />
          ) : (
            // No, show Login/Register
            <LoginModal
              authenticate={this.authenticate}
              loginForm={this.loginForm}
            />
          );
          return (
            <React.Fragment>
              <Grid container className={classes.root} spacing={16}>
                <Grid item xs={12}>
                  <Grid container justify="center" spacing={16}>
                    <Grid item>
                      <Paper className={classes.paper}>{isLoggedIn}</Paper>
                    </Grid>
                    <Grid item>
                      <Paper className={classes.paper}>
                        <Info
                          position={currentPosition}
                          votes={thisUser ? thisUser.votes : "Please Login"}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default withStyles(styles)(User);
