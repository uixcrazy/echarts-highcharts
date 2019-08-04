
/**
 * support Highcharts
 */
export const buildZones = (data) => {
  var zones = [],
      i = -1, len = data.length, current, previous, dashStyle, value;

  while (data[++i] === null);
  zones.push({
    value: i
  });

  while (++i < len) {
    previous = data[i - 1];
    current = data[i];
    dashStyle = '';

    if (previous !== null && current === null) {
      dashStyle = 'solid';
      value = i - 1;
    } else if (previous === null && current !== null) {
      dashStyle = 'dot';
      value = i;
    }

    if (dashStyle) {
      zones.push({
        dashStyle: dashStyle,
        value: value
      });
    }
  }

  return zones;
}
