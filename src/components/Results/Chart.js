import * as React from "react";
import { Scale, Animation } from "@devexpress/dx-react-chart";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title
} from "@devexpress/dx-react-chart-material-ui";

const imageSize = 50;
const labelOffset = 10;

const getPath = (x, width, y, y1) => `M ${x} ${y1}
   L ${width + x} ${y1}
   L ${width + x} ${y + 5}
   L ${x + width / 2} ${y}
   L ${x} ${y + 5}
   Z`;

const BarWithLabel = props => {
  const { x, width, y, y1, color, value, style } = props;

  return (
    <React.Fragment>
      <path d={getPath(x, width, y, y1)} fill={color} style={style} />
      <Chart.Label
        x={x + width / 2}
        y={(y + y1) / 2}
        dominantBaseline="middle"
        textAnchor="middle"
        style={{ fill: "#BBDEFB", fontSize: "18" }}
      >
        {value}
      </Chart.Label>
    </React.Fragment>
  );
};

export default class ResChart extends React.PureComponent {
  customLabels = props => {
    const { text, x, y } = props;
    const { results } = this.props;
    const user = results.find(({ name }) => name === text);
    return (
      <React.Fragment>
        <image
          href={user.avatar}
          width={imageSize}
          height={imageSize}
          transform={`translate(${x - imageSize / 2} ${y - labelOffset})`}
        />
        <ArgumentAxis.Label {...props} y={y + imageSize} />
      </React.Fragment>
    );
  };

  render() {
    const chartData = this.props.results;

    return (
      <React.Fragment>
        {chartData ? (
          <Chart data={chartData}>
            <ArgumentAxis
              type="band"
              labelComponent={this.customLabels}
              showTick={false}
            />
            <ValueAxis />

            <BarSeries
              valueField="votes"
              argumentField="name"
              pointComponent={BarWithLabel}
            />
            <Title text="Top 10 Pizza Lovers!" />
            <Animation />
            <Scale />
          </Chart>
        ) : (
          <h1>No data</h1>
        )}
      </React.Fragment>
    );
  }
}
