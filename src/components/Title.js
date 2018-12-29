import React from "react";
import { Typography } from "@material-ui/core";

export default function Title() {
  return (
    <div>
      <Typography
        component="h2"
        variant="display4"
        align="center"
        className="title"
      >
        I
        <img src="/images/pizza-heart.png" alt="Heart" className="heart" />
        Pizza
      </Typography>
    </div>
  );
}
