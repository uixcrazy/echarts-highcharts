import React from 'react';
import isEmpty from 'lodash/isEmpty';
// import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts'
import ReactHighcharts from'highcharts-react-official';
import { ChartsTheme } from '../../core/constants';
import { buildZones } from '../../core/utils';

const LineHighcharts = ({ data, isMobile }) => {
  const tooltipHtml = (points) => {
    const _key = points[0].key;
    const _monthYear = _key.split('_');
    const names = {};
    data.series.forEach(item => {
      names[item.color] = item.name;
    })
    const firstTT = points.map(point => {
      return `
    <p style="margin-top:0.25rem;">
      <span style="color:${point.color}">\u25CF</span>
      <span>${names[point.color]}: </span>
      <span style="color:#424950;font-weight:500;">${point.y}</span>
    </p>`
    });

    return `
<span
  style="
    margin:5px 0;
    display:inline-block;
    color: #999;
    border-bottom: 3px double #ccc;"
  >${_monthYear[1]}, ${_monthYear[0]}</span>
<div style="font-size:80%">
  ${firstTT.join('')}
  <p style="margin-top:0.25rem">
    <span>%%% data so long ### lables so long *** </span>
    <span>%%% data so long ### lables so long *** </span>
    <span style="color:#424950;font-weight:500;">++5059%</span>
  </p>

</div>
`;
  }

  console.log('Highcharts update!!!');

  return isEmpty(data) ? null : (
    <ReactHighcharts
      highcharts={Highcharts}
      options={{
        chart: {
          backgroundColor: 'rgba(255, 255, 255, 0.0)',
          style: {
            fontFamily: ChartsTheme.fontFamily,
            fontSize: ChartsTheme.fontSize,
          },
        },
        title: {
          text: null,
        },
        legend: {
          enabled: true,
          itemStyle: {
            fontSize: ChartsTheme.fontSize,
            color: ChartsTheme.colorText,
            "cursor": "pointer",
            "fontWeight": "400",
            "textOverflow": "ellipsis",
          },
        },
        xAxis: {
          categories: data.category,
          lineColor: '#999',
          tickColor: '#999',
          tickLength: 5,
          tickWidth: 1,
          tickmarkPlacement: 'on',
          crosshair: {
            width: 2,
            zIndex: 3
          },
          labels: {
            style: {
              fontSize: ChartsTheme.fontSize,
            },
            formatter: function () {
              const _value = this.value.split('_');
              const year = _value[0].substr(2, 2);
              const week = _value[1];
              return `${week}-${year}`;
            },
          }
        },
        yAxis: {
          title: {
            text: 'Rainfall <br /> (include drizzle, rain, sleet, snow, graupel and hail) Custom with <b>simple</b> <i>markup</i>',
            // useHTML: true,
            style: {
              padding: '0 0 10px',
              textAlign: 'center',
            },
          },
          gridLineDashStyle: 'dot',
          gridLineColor: '#ccc',
          labels: {
            style: {
              fontSize: ChartsTheme.fontSize,
            },
          }
        },
        tooltip: {
          formatter: function () {
            return tooltipHtml(this.points);
          },
          shared: true,
          useHTML: true,
          backgroundColor: '#fff',
          padding: 10,
          borderWidth: 1,
          borderColor: '#e5e5e5',
          shadow: false,
          style: {
            color: '#666c72',
            fontSize: ChartsTheme.fontSize,
          }
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: true
            },
            events: {
              legendItemClick: function() {
                return false;
              }
            }
          },
        },
        series: data.series.map(dd => {
          return ({
            // type: 'line',
            name: dd.name,
            data: dd.data,
            zones: buildZones(dd.data),
            zoneAxis: 'x',
            connectNulls: true,
            color: dd.color,
            lineWidth: dd.lineWidth,
            marker: {
              symbol: dd.markerSymbol,
            },
          })
        }),
        credits: {
          enabled: false
        },
      }}
    />
  )
}

export default LineHighcharts;
