import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { Scale, Animation, EventTracker } from "@devexpress/dx-react-chart";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Tooltip
} from "@devexpress/dx-react-chart-material-ui";

export default class ResChart extends React.PureComponent {
  render() {
    const chartData = this.props.results;

    return (
      <Paper>
        <Chart data={chartData}>
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries valueField="votes" argumentField="name" />
          <Title text="Top 10 Pizza Lovers!" />
          <Animation />
          <Scale />
          <EventTracker />
          <Tooltip />
        </Chart>
      </Paper>
    );
  }
}
