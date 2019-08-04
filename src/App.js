import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import { Element, scroller } from 'react-scroll';
import _debounce from "lodash.debounce";
import MobileDetect from 'mobile-detect';

import LineEcharts from './components/chart/Echarts__Line';
import LineHighcharts from './components/chart/Highcharts__Line';
import BarEcharts from './components/chart/Echarts__Bar';

import Header from './components/Header';
import Box from './components/Box';
import NavMobile from './components/NavMobile';
import { LineData, BarData } from './core/mockdata.js';

const md = new MobileDetect();
const isMobile = md.mobile() || window.innerWidth < 500;

const dataNavigation = [
  {
    scrollName: "lineecharts",
    name: "Echarts --- Line",
  },
  {
    scrollName: "linehighcharts",
    name: "Highcharts --- Line",
  },
  {
    scrollName: "barecharts",
    name: "Echarts --- Bar",
  },
];
const listCps = [LineEcharts, LineHighcharts, BarEcharts ];
const dataCps = [LineData, LineData, BarData];

const data = dataNavigation.map((item, index) => {
  return ({
    id: item.scrollName,
    name: item.name,
    component: listCps[index],
    data: dataCps[index],
  })
})

class EchartsHighcharts extends React.Component {
  router = {};

  state = {
    boxActive: 'lineecharts',
  }

  componentDidMount() {
    this.main.addEventListener("scroll", _debounce(() => {
      this.scrollToActive();
    }, 100) // ms 300
    );
  }

  componentWillUnmount() {
    this.main.removeEventListener('scroll', this.scrollToActive);
  }

  scrollToActive = () => {
    const offset = 150;
    const headerHeight = isMobile ? 95 : 72;

    Object.keys(this.router).forEach(boxActive => {
      const crrElmnt = this.router[boxActive];
      if (crrElmnt) {
        const elmnt = ReactDOM.findDOMNode(crrElmnt);
        const currentTop = elmnt && elmnt.getBoundingClientRect().top;
        const heightElmnt = elmnt && elmnt.offsetHeight; // border
        if (currentTop > headerHeight+offset-heightElmnt && currentTop < headerHeight+offset) {
          this.setState({boxActive});
        }
      }
    })
  }

  updateBoxActive = (boxActive) => {
    scroller.scrollTo(boxActive, {
      duration: 500,
      delay: 0,
      smooth: 'easeOutQuad',
      containerId: 'scroll-container',
      // offset: -5,
    })
    this.setState({boxActive});
  }

  render() {
    const {
      classes,
    } = this.props;
    const { boxActive } = this.state;

    return (
      <React.Fragment>
        {isMobile
          ?
          <div className={classes.headerMobile}>
            <Header isMobile={isMobile}/>
            <NavMobile
              idSelected={boxActive}
              items={
                dataNavigation.map(item => ({id: item.scrollName, name: item.name}))
              }
              updateBoxActive={this.updateBoxActive}
            />
          </div>
          :
          <Header
            isMobile={isMobile}
            fixed
            boxActive={boxActive}
            navList={dataNavigation}
            updateBoxActive={this.updateBoxActive}
          />
        }
        <main
          id="scroll-container"
          ref={DOM => this.main = DOM}
          className={classes.main}>
          {
            data.map(box => {
              const BoxContent = box.component;
              return (
                <Element
                  name={box.id}
                  key={box.id}
                  ref={DOM => this.router[box.id] = DOM}>
                  <div className="container">
                    <Box isCurrent={box.id === boxActive} isMobile={isMobile}>
                      <BoxContent data={box.data} isMobile={isMobile}/>
                    </Box>
                  </div>
                </Element>
              )
            })
          }
        </main>
      </React.Fragment>
    )
  }
}

const styles = theme => ({
  main: {
    height: '100%',
    marginTop: 'var(--height-header)',
    overflowY: 'auto',
    overflowX: 'hidden',

    position: 'relative',
    zIndex: '1',
    '&.isMobile': {
      paddingLeft: 'var(--padding-horizontal-lg) 0',
    },
    '& > div': {
      borderBottom: '50px solid #f9fafb',
    },
    '& .container': {
      padding: 'var(--padding-horizontal-xl) 0',
    },
  },
  headerMobile: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: 90,
    background: '#fff',
    zIndex: 100,
    '& ~ main': {
      marginTop: 90,
    }
  },
  [`@media (max-width: ${theme.breakpointLg})`]: {
    main: {
      '& .container': {
        margin: '0 auto',
        padding: 'var(--padding-horizontal-xl) var(--padding-horizontal-lg) var(--padding-horizontal-lg)',
      },
    }
  },
});

export default withStyles(styles)(EchartsHighcharts);
