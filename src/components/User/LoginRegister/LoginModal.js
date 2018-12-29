import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import LoginRegister from "./LoginRegister";
import { Consumer } from "../../../context";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  modal: {
    top: "10%"
  }
});

class LoginModal extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {}

  onSubmit = e => {
    e.preventDefault();
    const { loginForm } = this.props;
    const { email, password } = this.state;
    loginForm(email, password);
    this.setState({ open: false });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Consumer>
        {value => {
          const { authenticate, classes } = this.props;
          return (
            <React.Fragment>
              <Typography variant="title" gutterBottom>
                <span role="img" aria-label="Pizza">
                  🍕😍
                </span>
                Show Your Love For Pizza!{" "}
                <span role="img" aria-label="Pizza">
                  🍕😍
                </span>
              </Typography>
              <br />
              <Typography variant="subheading" gutterBottom>
                Login to show the world how much you love pizza
              </Typography>
              <br />
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleOpen}
                fullWidth={true}
              >
                Login
              </Button>
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={this.handleClose}
                className={classes.modal}
              >
                <LoginRegister
                  authenticate={authenticate}
                  handleClose={this.handleClose}
                />
              </Modal>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default withStyles(styles)(LoginModal);
