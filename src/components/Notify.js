import React from "react";
import PropTypes from "prop-types";
import { withStyles, Snackbar, IconButton } from "@material-ui/core/";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

class SimpleSnackbar extends React.Component {
  state = {
    open: true
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes, message } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={this.state.open}
          autoHideDuration={10000}
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
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSnackbar);
