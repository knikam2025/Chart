import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';




const DemoChart = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: 'basic-bar'
      },
      xaxis: {
        categories: []
      }
    },
    series: [{
      name: 'Number of products',
      data: []
    }]
  });



  useEffect(() => {
    axios.get('https://knikam2025.github.io/API/')
      .then(response => {
        const products = response.data;
        const categories = [...new Set(products.map(product => product.category))];
        const categoriesCount = categories.map(category =>
          products.filter(product => product.category === category).length
        );


        setChartData({
          options: {
            chart: {
              id: 'basic-bar'
            },
            xaxis: {
              categories: categories
            }
          },
          series: [{
            name: 'Number of products',
            data: categoriesCount
          }]
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
            type='bar'
            width="1000"
          />
        </div>
      </div>
    </div>
  );
};

const SetchartData = () => {
  return (
    <div>
      <DemoChart />
    </div>
  );
}

export default SetchartData;
