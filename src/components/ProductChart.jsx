import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../utils/productSlice';
import Chart from 'react-apexcharts';

const ProductChart = () => {
  const dispatch = useDispatch();
  const { products, status, error, chartData, categorySums } = useSelector((state) => state.products);
  const [priceChartData, setPriceChartData] = useState({
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

      setPriceChartData({
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
    return chartData.categories.map(category => ({
      name: category,
      data: [calculateAveragePrice(category)],
    }));
  };

  const getTitlePriceData = () => {
    const titles = products.map(product => product.title);
    const prices = products.map(product => product.price);

    return {
      options: {
        chart: {
          id: 'title-price-bar',
        },
        xaxis: {
          categories: titles,
        },
      },
      series: [{
        name: 'Price',
        data: prices,
      }],
    };
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
       
      </div>
      <div className="sums">
        <h2>Category Sums</h2>
        <p>Jewelry: ${categorySums.jewelry.toFixed(2)}</p>
        <p>Clothing: ${categorySums.clothing.toFixed(2)}</p>
        <p>Electronics: ${categorySums.electronics.toFixed(2)}</p>
      </div>
      <div className="title-price-chart">
        <h2>Title vs Price</h2>
        <Chart
          options={getTitlePriceData().options}
          series={getTitlePriceData().series}
          type='bar'
          width="1000"
        />
      </div>
    </div>
  );
};

export default ProductChart;
