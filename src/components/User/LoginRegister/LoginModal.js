import React from "react";
import LoginRegister from "./LoginRegister";
import { Typography, withStyles, Modal, Button } from "@material-ui/core";

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

  render() {
    const { classes } = this.props;
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
          <LoginRegister handleClose={this.handleClose} />
        </Modal>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(LoginModal);
