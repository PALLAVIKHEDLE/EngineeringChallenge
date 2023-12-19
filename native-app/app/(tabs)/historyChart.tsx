import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { fetchHistoryDataPoints } from './authService';

const LineChartExample: React.FC = () => {
  const [datasets, setDatasets] = useState([]);
  
  const getRandomColor: string[] = [
    // 'rgb(139, 69, 19)',    // SaddleBrown
    'rgb(128, 128, 0)',    // Olive
    'rgb(139, 0, 0)',      // DarkRed
    'rgb(0, 128, 128)',    // Teal
    'rgb(0, 0, 128)',      // Navy
    'rgb(139, 0, 139)',    // DarkMagenta
    'rgb(128, 0, 0)',      // Maroon
    // 'rgb(165, 42, 42)',    // Brown
    'rgb(0, 139, 139)',    // DarkCyan
    // 'rgb(139, 139, 0)',    // DarkKhaki
  ]
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPointAPIData = await fetchHistoryDataPoints();
        if (dataPointAPIData && Array.isArray(dataPointAPIData)) {
           const finalGraphData= dataPointAPIData.map((item, index) => ({
                data: item.data,
                color: (opacity = 1) => getRandomColor[index], 
                strokeWidth: 2, 
                label: item.label,
                labels:item.labels 
              }));
          setDatasets(finalGraphData);
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
      color:dataset.color,
      strokeWidth:dataset.strokeWidth
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
  
  };

  const legend = datasets.map((dataset, index) => {
    const color = typeof dataset.color === 'function' && dataset.color() 
    return (
    <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: 10, height: 10, backgroundColor:color }} />
      <Text style={{ marginLeft: 5 }}>{dataset.label}</Text>
    </View>
    )
});

  return (
    <View style={{ margin: 15 }}>
      <Text style={{marginBottom:10}}>  Trends in machine health scores</Text>
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
          
         
          decorator={() => {
            return alignedData.labels.map((value, index) => (
              <Text
                key={index}
                style={{
                  position: 'absolute',
                  left: (index * 300) / (alignedData.labels.length - 1) - 16,
                  bottom: 0,
                  fontSize: 8, // Set the font size for data labels
                }}>
                {value}
              </Text>
            ));
          }}
        />
      )}
        <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 10 }}>
        {legend}
      </View>
    </View>
  );
};

export default LineChartExample;
