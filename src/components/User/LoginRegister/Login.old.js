import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

const styles = theme => ({
  modal: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
});

class Login extends React.Component {
  state = {
    open: false,
    email: "state@login.js",
    password: "123456",
    name: "Testie"
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onSubmit = e => {
    e.preventDefault();
    const { loginForm } = this.props;
    const { email, password } = this.state;
    loginForm(email, password);
    this.setState({ open: false });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => this.props.authenticate("Github")}
        >
          Log in with Github
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => this.props.authenticate("Google")}
        >
          Log in with Google
        </Button>
        <Button variant="contained" color="secondary" onClick={this.handleOpen}>
          Use Email
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.modal}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
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
        </Modal>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Login);
