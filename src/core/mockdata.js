
export const LineData =  {
  category: [
    '2017_Jan',
    '2017_Feb',
    '2017_Mar',
    '2017_Apr',
    '2017_May',
    '2017_Jun',
    '2017_Jul',
    '2017_Aug',
    '2017_Sep',
    '2017_Oct',
    '2017_Nov',
    '2017_Dec',

    '2018_Jan',
    '2018_Feb',
    '2018_Mar',
    '2018_Apr',
    '2018_May',
    '2018_Jun',
    '2018_Jul',
  ],
  // Other possible values are "circle", "square", "diamond", "triangle" and "triangle-down".
  series: [
    {
      name: 'Tokyo',
      data:[120, 132, 101, null, 90, 230, 210],
      color: '#2ec7c9',
      lineWidth: 1,
      markerSymbol: "diamond",
    },
    {
      name: 'London',
      data:[220, 182, 191, 234, 290, 330, 310],
      color: '#b6a2de',
      lineWidth: 1,
      markerSymbol: "circle",
    },
    {
      name: 'Hong Kong',
      data:[320, 332, 301, 334, 390, 330, 320],
      color: '#5ab1ef',
      lineWidth: 1,
      markerSymbol: "diamond",
    },
    {
      name: 'Hồ Chí Minh',
      data:[150, 232, 201, 154, 190, 330, 410],
      color: '#ffb980',
      lineWidth: 2,
      markerSymbol: "circle",
    },
    {
      name: 'Kyoto',
      data:[820, null, 901, 934, 1290, 1330, 1320],
      color: '#d87a80',
      lineWidth: 1,
      markerSymbol: "triangle",
    },
  ]
};

// export const BarData =  {
//   category: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//   data: [10, 52, 200, 334, 390, 330, 220],
// }

export const BarData =  {
  title: 'the top 10 JavaScript errors',
  category: [
    'Uncaught TypeError: Cannot read property',
    'TypeError: ‘undefined’ is not an object (evaluating',
    'TypeError: null is not an object (evaluating',
    '(unknown): Script error',
    'TypeError: Object doesn’t support property',
    'TypeError: ‘undefined’ is not a function',
    'Uncaught RangeError',
    'TypeError: Cannot read property ‘length’',
    'Uncaught TypeError: Cannot set property',
    'ReferenceError: event is not defined',
  ],
  // Other possible values are "circle", "square", "diamond", "triangle" and "triangle-down".
  series: [10, 52, 200, 334, 1200, 500, 390, 330, 220, 310]
};