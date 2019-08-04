import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import NavDesktop from './NavDesktop';

const Header = ({
  classes,
  fixed=false,
  isMobile=false,
  boxActive,
  navList,
  updateBoxActive
}) => (
  <header className={[
    classes.header,
    fixed ? 'fixed' : '',
    isMobile ? 'isMobile' : '',
  ].join(' ')}>
    <div className={`${classes.headerCt} container`}>
      <div className={classes.headerCtLeft}>
        <span className={classes.logo}>Echarts - Highcharts</span>
      </div>
      <div className={classes.headerCtRight}>
        {!isMobile &&
          <React.Fragment>
            <NavDesktop
              boxActive={boxActive}
              navList={navList}
              updateBoxActive={updateBoxActive}
            />
          </React.Fragment>
        }
      </div>
    </div>
  </header>
)

const styles = theme => ({
  header: {
    fontSize: '0.875rem',
    '&.fixed': {
      position: 'fixed',
      top: 0,
      left: '0',
      right: '0',
      zIndex: '100',
    },
    '&.isMobile $headerCt': {
      height: 'var(--height-header-mobile)',
    },
    background: '#fff',
    height: 'var(--height-header)',
    boxShadow: '1px 2px 7px rgba(0, 0, 0, 0.1)',
  },
  headerCt: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
  },
  headerCtLeft: {},
  headerCtRight: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.75rem',
    fontWeight: '500',
    whiteSpace: 'nowrap',
  },
});

export default withStyles(styles)(Header);
