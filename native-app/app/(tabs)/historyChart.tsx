import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { fetchHistoryDataPoints } from './authService';

const LineChartExample: React.FC = () => {
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPointAPIData = await fetchHistoryDataPoints();
        if (dataPointAPIData && Array.isArray(dataPointAPIData)) {
          setDatasets(dataPointAPIData);
        } else {
          console.log('Invalid data format:', dataPointAPIData);
        }
      } catch (error) {
        console.log('Error fetching historical data:', error);
      }
    };

    fetchData();
  }, []); 

  if (!datasets || datasets.length === 0) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Combine all timestamps from all datasets
  const allTimestamps = Array.from(
    new Set(datasets.flatMap(dataset => dataset.labels))
  );

  // Extracting data from historyDataPoints
  const alignedData = {
    labels: allTimestamps,
    datasets: datasets.map(dataset => ({
      data: allTimestamps.map(timestamp =>
        dataset.labels.includes(timestamp)
          ? parseFloat(dataset.data[dataset.labels.indexOf(timestamp)]) || 0
          : null
      ),
      label: dataset.label,
    })),
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
    style: {
      borderRadius: 16,
      strokeWidth: 2, // Adjust the line thickness
     
    },
    propsForDots: {
      r: '3', // Adjust the dot size
      strokeWidth: '2',
      stroke: '#008000', 
    },
  
  };

  return (
    <View style={{ margin: 15 }}>
      <Text> Trends in machine health scores</Text>
      {alignedData && (
        <LineChart
          data={alignedData}
          width={330}
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
      )}
    </View>
  );
};

export default LineChartExample;
