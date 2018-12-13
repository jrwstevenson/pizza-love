import React, { Component } from "react";
import {
  withStyles,
  Button,
  AppBar,
  Card,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  FormControl,
  Input,
  InputLabel
} from "@material-ui/core";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    "& > * + *": {
      marginTop: theme.spacing.unit * 2
    }
  },
  card: {
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      flexBasis: "25rem",
      flexGrow: 0
    }
  },
  or: {
    textAlign: "center"
  },
  form: {
    // display: "flex",
    margin: "20px",
    flexDirection: "column"
  },
  field: {
    marginTop: theme.spacing.unit
  },
  actions: {
    marginTop: theme.spacing.unit * 2
  },
  button: {
    margin: "5px"
  }
});

class LoginRegister extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 0
    };
  }

  render() {
    const { classes, authenticate } = this.props;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" align="center" color="inherit">
                Login/Register
              </Typography>
            </Toolbar>
          </AppBar>
          <Tabs
            value={this.state.tab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          {this.state.tab === 0 && (
            <div className={classes.root}>
              <form className={classes.form} onSubmit={this.onSubmit}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input
                    id="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </FormControl>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign in
                </Button>
              </form>
            </div>
          )}
          {this.state.tab === 1 && (
            <div className={classes.root}>
              <div className={classes.root}>
                <form
                  className={classes.form}
                  onValid={this.enableSubmit}
                  onInvalid={this.disableSubmit}
                  onValidSubmit={this.submit}
                >
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input
                      id="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                  </FormControl>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="name">User Name</InputLabel>
                    <Input
                      id="name"
                      value={this.state.name}
                      onChange={this.onChange}
                      name="name"
                      autoComplete="name"
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      name="password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </FormControl>

                  <div className={classes.actions}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="raised"
                      color="primary"
                    >
                      Register
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div className={classes.or}>or</div>
          <div className={classes.form}>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={() => authenticate("Github")}
            >
              Log in with Github
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={() => authenticate("Google")}
            >
              Log in with Google
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  handleTabChange = (event, value) => {
    this.setState({ tab: value });
  };
}

export default withStyles(styles)(LoginRegister);
