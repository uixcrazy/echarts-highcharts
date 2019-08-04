import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const Box = ({style = {}, classes, header, children, isCurrent, isMobile}) => (
  <div className={[classes.box,
    isCurrent ? 'isCurrent' : '',
    isMobile ? 'isMobile' : ''
  ].join(' ')} style={style}>
    {header && <div className={classes.boxHeader}>{header}</div>}
    {children}
  </div>
)

const styles = theme => ({
  box: {
    // '&.isCurrent': { },
    '& .boxHeader': {
      textAlign: 'center',
    },
    '& h1': {
      color: 'var(--color-main)',
      fontSize: '1.375rem',
    },
    '& .subTitle': {
      fontSize: '0.875rem',
      marginTop: '0.25rem',
      fontStyle: 'italic',
      '& em': {
        fontWeight: 400,
        color: 'var(--color-secondary-darker)',
      }
    },
    '&.isMobile': {
      // '& .boxHeader': {
      //   textAlign: 'center',
      // },
      '& h1': {
        fontSize: '0.875rem',
      },
      '& .subTitle': {
        fontSize: '0.75rem',
      },
    }
  },
  boxHeader: {
    fontSize: '1.125rem',
    fontWeight: '600',
    borderBottom:  'var(--border-normal)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.25rem',
  },
});

export default withStyles(styles)(Box);
