import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import LoginRegister from "./LoginRegister";
import { Consumer } from "../../../context";

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
          const { authenticate } = this.props;
          return (
            <React.Fragment>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleOpen}
              >
                <span role="img" aria-label="Pizza">
                  🍕😍
                </span>
                Show You Love For Pizza!{" "}
                <span role="img" aria-label="Pizza">
                  🍕😍
                </span>
              </Button>
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={this.handleClose}
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
