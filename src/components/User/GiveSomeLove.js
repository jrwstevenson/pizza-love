import React, { Component } from "react";
import {
  Button,
  Typography,
  Divider,
  Grid,
  Avatar,
  ListItem,
  ListItemText
} from "@material-ui/core";
import PropTypes from "prop-types";

class GiveSomeLove extends Component {
  render() {
    const { addSomeLove, logOut, name, avatar } = this.props;
    return (
      <React.Fragment>
        <Typography variant="title" gutterBottom>
          Smash that button
        </Typography>
        <br />
        <Button
          variant="contained"
          color="primary"
          fullWidth={true}
          onClick={addSomeLove}
        >
          I love it
        </Button>
        <Divider variant="middle" style={{ margin: 10 }} />
        <Grid
          justify="space-between"
          container
          spacing={24}
          alignItems="center"
        >
          <Grid item>
            <ListItem>
              <Avatar src={avatar} />
              <ListItemText primary={`Hi ${name}`} />
            </ListItem>
          </Grid>

          <Grid item>
            <div>
              <Button variant="outlined" color="secondary" onClick={logOut}>
                Log Out
              </Button>
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

GiveSomeLove.propTypes = {
  addSomeLove: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string
};

export default GiveSomeLove;
