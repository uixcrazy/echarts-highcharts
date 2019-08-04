import React from 'react';
import ReactEcharts from 'echarts-for-react';
import isEmpty from 'lodash/isEmpty';
import { ChartsTheme } from '../../core/constants';

const LineEcharts = ({ data, isMobile }) => {
  const tooltipHtml = (params) => { // dataIndex
    const _monthYear = params[0].axisValue.split('_');
    const firstTT = params.map(param => {
      return `
<p style="margin-top:0.25rem">
  <span>${param.marker}</span>
  <span>${param.seriesName}:</span>
  <span style="color:#424950;font-weight:500;">${param.value}</span>
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
    <span style="color:#424950;font-weight:500;">++5059%</span>
  </p>

</div>
`;
  }

  console.log('Echart update!!!');

  return isEmpty(data) || isEmpty(data.series) ? null : (
    <ReactEcharts
      option={{
        color: ChartsTheme.color,
        textStyle: {
          fontFamily: ChartsTheme.fontFamily,
          fontSize: ChartsTheme.fontSize,
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#fff',
          padding: 10,
          borderWidth: 1,
          borderColor: '#e5e5e5',
          textStyle: {
            color: ChartsTheme.colorText,
          },
          formatter: params => tooltipHtml(params),
        },
        legend: {
          data: data.series.map(item => item.name),
          bottom: 0,
          // left: 'right',
          textStyle: {
            fontSize: ChartsTheme.fontSize,
            color: ChartsTheme.colorText,
          },
          selectedMode: false,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.category,
          nameTextStyle: {
            fontSize: ChartsTheme.fontSize+1,
            color: ChartsTheme.colorText,
          },
          axisLabel: {
            fontSize: ChartsTheme.fontSize-1,
            color: ChartsTheme.colorText,
            showMinLabel: false,
            showMaxLabel: isMobile ? false : true,
            lineHeight: ChartsTheme.fontSize,
            formatter: function (value, index) {
              const _value = value.split('_');
              const year = _value[0].substr(2, 2);
              const week = _value[1];
              return `${week}-${year}`;
            },
          },
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '20%'],
          axisLabel: {
            fontSize: ChartsTheme.fontSize,
            color: ChartsTheme.colorText,
          },
          name: 'Rainfall \n (include drizzle, rain, sleet, snow, graupel and hail) Custom with simple markup',
          nameLocation: 'middle',
          nameGap: 60,
          nameTextStyle: {
            fontSize: ChartsTheme.fontSize,
            color: ChartsTheme.colorText,
          },
          splitNumber: isMobile ? 3 : 5,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#e5e5e5',
              type: 'dotted'
            }
          },
        },
        grid: { // full chart
          top: 15,
          left: isMobile ? 45 : 55,
          right: 30,
          // bottom: 30,
          containLabel: true
        },
        series: data.series.map(dd => {
          return ({
            type: 'line',
            name: dd.name,
            data: dd.data,
            lineStyle: {
              normal: {
                width: dd.lineWidth,
              },
            },
          })
        })
      }}
      style={{
        height: isMobile ? 360 : 400,
        width: '100%'
      }}
    />
  )
}

export default LineEcharts;
