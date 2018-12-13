import React, { Component } from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

export class Notify extends Component {
  state = {
    open: true
  };

  handleClick = state => () => {
    this.setState({ open: true, ...state });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { message } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={this.state.open}
        onClose={this.handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    );
  }
}

export default Notify;
