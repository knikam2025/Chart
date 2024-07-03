import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../utils/productSlice';
import Chart from 'react-apexcharts';

const ProductChart = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [],
      },
    },
    series: [{
      name: 'Number of Products',
      data: [],
    }],
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    } else if (status === 'succeeded') {
      const categories = [...new Set(products.map(product => product.category))];
      const categoriesCount = categories.map(category =>
        products.filter(product => product.category === category).length
      );

      setChartData({
        options: {
          chart: {
            id: 'basic-bar',
          },
          xaxis: {
            categories: categories,
          },
        },
        series: [{
          name: 'Number of Products',
          data: categoriesCount,
        }],
      });
    }
  }, [status, dispatch, products]);

  const calculateAveragePrice = (category) => {
    const productsInCategory = products.filter(product => product.category === category);
    const totalSum = productsInCategory.reduce((acc, product) => acc + product.price, 0);
    return (totalSum / productsInCategory.length).toFixed(2);
  };

  const getPriceData = () => {
    return chartData.options.xaxis.categories.map(category => ({
      name: category,
      data: [calculateAveragePrice(category)],
    }));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <div className="row">
        
        <div className="price-chart">
          <Chart
            options={{
              chart: {
                id: 'price-bar',
              },
              xaxis: {
                categories: chartData.options.xaxis.categories,
              },
            }}
            series={getPriceData()}
            type='bar'
            width="1000"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductChart;
