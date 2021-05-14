export const CandleChartOptions = {
  options: {
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: 'Daily Chart Trends',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  }
};

export const AreaChartOptions = {
  options: {
    chart: {
      id: 'area-datetime',
      type: 'area',
      height: 350,
      zoom: {
        autoScaleYaxis: true
      }
    },
    annotations: {
      yaxis: [
        {
          y: 30,
          borderColor: '#999',
          label: {
            show: true,
            // text: 'Support',
            style: {
              color: '#fff',
              background: '#00E396'
            }
          }
        }
      ],
      xaxis: [
        {
          x: new Date().getTime() - 86400,
          borderColor: '#999',
          yAxisIndex: 0,
          label: {
            show: true,
            style: {
              color: '#fff',
              background: '#775DD0'
            }
          }
        }
      ]
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
      style: 'hollow'
    },
    xaxis: {
      type: 'datetime',
      min: new Date().getTime() - 86400000,
      tickAmount: 6
    },
    yaxis: {
      decimalsInFloat: 2
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy hh mm ss'
      },
      y: {
        title: {
          formatter: () => 'USD'
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    }
  },
  selection: 'one_year'
};
