import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

import { fetchDailyData } from "../api";

const AreaChart = ({ country }) => {
  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    const fetchCountryDailyData = async () => {
      const data = await fetchDailyData(country);
      setDailyData(data);
    };
    fetchCountryDailyData();
  }, [country]);
  return (
    <div id="chart">
      <Chart
        options={{
          chart: {
            height: 350,
            type: "area",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            type: "datetime",
            categories: dailyData.map((item) => item.Date),
          },
          tooltip: {
            x: {
              format: "dd/MM/yy",
            },
          },
        }}
        series={[
          {
            name: "Terkonfirmasi",
            data: dailyData.map((item) => item.Confirmed),
          },
          {
            name: "Sembuh",
            data: dailyData.map((item) => item.Recovered),
          },
          {
            name: "Meninggal",
            data: dailyData.map((item) => item.Deaths),
          },
        ]}
        height="350"
      ></Chart>
    </div>
  );
};

export default AreaChart;
