import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const DemoChart = () => {
  const [chartData, setChartData] = useState({
    options: {
      labels: []
    },
    series: []
  });

  useEffect(() => {
    axios.get('https://knikam2025.github.io/API')
      .then(response => {
        const products = response.data;
        const categories = [...new Set(products.map(product => product.category))];
        const categoriesCount = categories.map(category =>
          products.filter(product => product.category === category).length
        );

        setChartData({
          options: {
            labels: categories,
          },
          series: categoriesCount
        });
      })
      .catch(error => console.log('error fetching data', error));
  }, []);

  return (
    <div className="App">
      <div className="row">
        <div className="mixed-chart">
         
          <Chart
            options={chartData.options}
            series={chartData.series}
            type='donut'
            width="1000"
          />
          
        </div>
      </div>
    </div>
  );
}

export default DemoChart;
