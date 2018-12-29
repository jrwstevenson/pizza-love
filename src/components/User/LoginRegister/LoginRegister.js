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
  InputLabel,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import { Autorenew, Close } from "@material-ui/icons";
import { Consumer } from "../../../context";
import { getPizzaName } from "../../../helpers";
import Notify from "../../Notify";

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
  grow: {
    flexGrow: 1
  },
  or: {
    textAlign: "center"
  },
  form: {
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
      tab: 0,
      email: "",
      password: "",
      name: getPizzaName()
    };
  }

  // Generate new name
  newPizzaName = () => {
    this.setState({
      name: getPizzaName()
    });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = onSubmit => e => {
    e.preventDefault();
    onSubmit(this.state);
  };

  handleTabChange = (event, value) => {
    this.setState({ tab: value });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { classes, handleClose } = this.props;
          const { errors } = value.state;
          return (
            <div className={classes.root}>
              <Card className={classes.card}>
                <AppBar position="static">
                  <Toolbar>
                    <Typography
                      variant="title"
                      color="inherit"
                      className={classes.grow}
                    >
                      Login/Register
                    </Typography>
                    <div>
                      <IconButton onClick={handleClose} color="inherit">
                        <Close />
                      </IconButton>
                    </div>
                  </Toolbar>
                </AppBar>
                {errors
                  ? errors.map((error, idx) => (
                      <Notify message={error} key={idx} />
                    ))
                  : null}

                <Tabs
                  value={this.state.tab}
                  onChange={this.handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                  fullWidth
                >
                  <Tab label="Register" />
                  <Tab label="Login" />
                </Tabs>
                {/* ********** Tab Contents ********* */}
                {this.state.tab === 0 && (
                  <div className={classes.root}>
                    <div className={classes.root}>
                      {/* ********** Start of Register Form ******** */}
                      <form
                        className={classes.form}
                        onSubmit={this.handleSubmit(value.onSubmit)}
                      >
                        <FormControl margin="normal" required fullWidth>
                          <InputLabel htmlFor="name">Display Name</InputLabel>

                          <Input
                            id="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            name="name"
                            autoComplete="name"
                            endAdornment={
                              <InputAdornment position="end">
                                <Autorenew
                                  onClick={this.newPizzaName}
                                  style={{ cursor: "pointer" }}
                                />
                              </InputAdornment>
                            }
                          />
                        </FormControl>
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

                        <div className={classes.actions}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                          >
                            Register
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
                {/* ********** Start Of Login Tab ********* */}
                {this.state.tab === 1 && (
                  <div className={classes.root}>
                    <form
                      className={classes.form}
                      onSubmit={this.handleSubmit(value.onSubmit)}
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
                    {/* ********** End of Login Form ******** */}
                  </div>
                )}
                <div className={classes.or}>or</div>
                <div className={classes.form}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={() => value.authExternal("Github")}
                  >
                    Log in with Github
                  </Button>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={() => value.authExternal("Google")}
                  >
                    Log in with Google
                  </Button>
                </div>
              </Card>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default withStyles(styles)(LoginRegister);
