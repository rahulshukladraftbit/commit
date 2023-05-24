import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export const SparkLineChart = ({ sparkLine, chartWidth }) => {
  thisData = sparkLine ? sparkLine : [0];

  if (chartWidth === 'full') {
    thisChartWidth = Dimensions.get('window').width - 50;
  } else {
    thisChartWidth = chartWidth;
  }

  const data = {
    labels: Array.from(Array(thisData.length).keys()),
    datasets: [
      {
        data: thisData,
        color: (opacity = 1) => `rgba(0, 32, 52, ${opacity})`, // optional
        strokeWidth: 4, // optional
      },
    ],
  };
  const chartConfig = {
    backgroundColor: '#004252',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 32, 52, ${opacity})`,
    fillShadowGradientFrom: '#71EBB5',
    fillShadowGradientFromOpacity: 0.5,
    fillShadowGradientTo: '#FFFFFF',
    fillShadowGradientToOpacity: 0,
    // labelColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
    // propsForDots: {
    //     r: "6",
    //     strokeWidth: "2",
    //     stroke: "#ffa726"
    // }
  };

  return (
    <View>
      <LineChart
        data={data}
        width={thisChartWidth} // from react-native
        height={220}
        // yAxisLabel="$"
        // yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={chartConfig}
        bezier
        withDots={false}
        withInnerLines={false}
        withOuterLines={false}
        withHorizontalLines={false}
        withVerticalLines={false}
        withHorizontalLabels={false}
        withVerticalLabels={false}
        yLabelsOffset={0}
        xLabelsOffset={0}
        style={{
          paddingRight: 0,
          paddingTop: 10,
          paddingLeft: 5,
        }}
      />
    </View>
  );
};
