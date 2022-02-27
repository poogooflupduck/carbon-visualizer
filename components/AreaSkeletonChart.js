import { AreaChart } from "@carbon/charts-react";

const AreaSkeletonChart = () => {
  return (
    <AreaChart
      data={[
        {
          group: "Dataset 1",
          date: "2019-01-01T00:00:00.000Z",
          value: 47263,
          min: 40000,
          max: 50000,
        },
        {
          group: "Dataset 1",
          date: "2019-01-05T00:00:00.000Z",
          value: 14178,
          min: 10000,
          max: 20000,
        },
        {
          group: "Dataset 1",
          date: "2019-01-08T00:00:00.000Z",
          value: 23094,
          min: 10000,
          max: 25000,
        },
        {
          group: "Dataset 1",
          date: "2019-01-13T00:00:00.000Z",
          value: 45281,
          min: 42000,
          max: 50000,
        },
        {
          group: "Dataset 1",
          date: "2019-01-19T00:00:00.000Z",
          value: -63954,
          min: -70000,
          max: -10000,
        },
      ]}
      options={{
        title: "Loading...",
        bounds: {
          upperBoundMapsTo: "max",
          lowerBoundMapsTo: "min",
        },
        axes: {
          bottom: {
            title: "2019 Annual Sales Figures",
            mapsTo: "date",
            scaleType: "time",
          },
          left: {
            mapsTo: "value",
            scaleType: "linear",
          },
        },
        curve: "curveNatural",
        data: {
          loading: true,
        },
        height: "90vh",
      }}
    ></AreaChart>
  );
};

export default AreaSkeletonChart;
