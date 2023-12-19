import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const LineChartExample: React.FC = () => {
  const datasets = [
    {
      data: [20,45, 80, 99 ,66, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      strokeWidth: 2,
      label: 'Dataset 1',
      labels: ['Jan', 'Feb', 'Mar', 'May', 'Jun','Jul'],
    },
    {
      data: [50, 20, 30, 40, 60, 30],
      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      strokeWidth: 2,
      label: 'Dataset 2',
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    // Add more datasets as needed
  ];

  // Find the common set of labels
  const commonLabels = datasets.reduce((acc, dataset) => {
    return [...acc, ...dataset.labels];
  }, []);

  // Deduplicate labels
  const uniqueLabels = [...new Set(commonLabels)];

  // Create a new data object with aligned labels
  const alignedData = {
    labels: uniqueLabels,
    datasets: datasets.map(dataset => ({
      data: dataset.labels.map(label => dataset.data[dataset.labels.indexOf(label)] || null),
      color: dataset.color,
      strokeWidth: dataset.strokeWidth,
      label: dataset.label,
    })),
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View>
      <Text>Multi-Line Chart Example</Text>
      <LineChart
        data={alignedData}
        width={300}
        height={200}
        yAxisLabel="Score"
        yAxisSuffix=""
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default LineChartExample;