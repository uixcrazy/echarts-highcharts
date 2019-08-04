import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { ChartsTheme } from '../../core/constants';
import isEmpty from 'lodash/isEmpty';

const BarEcharts = ({data, isMobile}) => {

  const tooltipHtml = (params) => {
    return `
<div>
  <span style="color: #999;">${params[0].name}</span>
  <span style="color:#9a7fd1;font-weight:500">${params[0].value}</span>
</div>
`;
  }

  return isEmpty(data) ? null : (
    <ReactEcharts
      option={{
        color: ["#5ab1ef"],
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
            color: '#4a4a4a',
          },
          axisPointer: {
            type: 'shadow', // 'none',
            shadowStyle: {
              color: 'rgba(150,150,150,0.1)',
            }
          },
          formatter: params => tooltipHtml(params),
        },
        grid: { // full chart
          top: 20,
          left: 0,
          right: isMobile ? 0 : '3%',
          bottom: 80,
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: false,
          axisLabel: {
            fontSize: isMobile ? ChartsTheme.fontSize : ChartsTheme.fontSize+1,
            color: ChartsTheme.colorText,
            align: isMobile ? 'right' : 'center',
            showMaxLabel: true,
            formatter: function (value, index) {
              if (isMobile) {
                return (index%5===0) ? value : '';
              }
              return value;
            }
          },
          axisTick: {
            show: !isMobile,
          },
          name: 'Rainfall \n (include drizzle, rain, sleet, snow, graupel and hail) Custom with simple markup',
          nameLocation: 'middle',
          nameGap: 40,
          nameTextStyle: {
            fontFamily: ChartsTheme.fontFamily,
            fontSize: isMobile ? ChartsTheme.fontSize : ChartsTheme.fontSize+1,
          },
          splitNumber: isMobile ? 20 : 5,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ddd',
              type: 'dotted'
            }
          },
        },
        yAxis: {
          type: 'category',
          data: data.category,
          axisTick: {
            show: true,
            lineStyle: {
              color: '#999'
            },
          },
          axisLabel: {
            fontSize: ChartsTheme.fontSize,
            color: ChartsTheme.colorText,
            formatter: function (value, index) {
              if (isMobile) {
                return (value.length <=15) ? value : value.substr(0,13)+"...";
              }
              return (value.length <=30) ? value : value.substr(0,28)+"...";
            }
          },
        },
        series: [
        {
          type: 'bar',
          data: data.series,
          label: {
            show: false,
            position: 'insideRight',
            formatter: (params) => params.seriesName,
            fontSize: ChartsTheme.fontSize-1,
          },
        }
      ],
      }}
      style={{height: data.series.length*35 + 120, width: '100%'}}
    />
  )
}

export default BarEcharts;
