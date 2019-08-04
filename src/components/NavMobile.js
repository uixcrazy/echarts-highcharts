/**
 * https://github.com/uixcrazy/storybook/blob/master/packages/hammerjs/src/NavigationHammer.js
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hammerjs from 'hammerjs';
import { withStyles } from '@material-ui/core/styles';

class NavMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      slideCount: 0,
      translateX: 0,
      hasScroll: false,
      widthTabs: null,
      widthSwiper: null,
      widthEachSlide: [],
      posEachSlidePrev: [],
      posEachSlideNext: [],
      maxTx: null,
    };
    this.changeTab = this.changeTab.bind(this);
    this.getWidthTabs = this.getWidthTabs.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.updateUI();
    }, 500);
    window.addEventListener('resize', () => {
      this.updateUI();
    });
  }

  // componentDidUpdate() {
  //   this.updateUI(); // not resize on Browser
  // }

  componentWillUnmount() {
    window.removeEventListener('resize', () => {
      this.updateUI();
    });
  }

  updateUI() {
    const widthTabs = this.getWidthTabs();
    const widthSwiper = this.swiper && this.swiper.clientWidth;
    const { paddingHorizontal } = this.props;
    if (this.state.widthTabs !== widthTabs || this.state.widthSwiper !== widthSwiper) {
      if (widthSwiper < widthTabs) {
        const {
          slideCount,
          widthEachSlide,
          posEachSlideNext,
        } = this.getWidthEachSlide();
        const maxTx = -(widthTabs - (widthSwiper - paddingHorizontal)); // paddingRight
        const posEachSlidePrev = this.getPosEachSlidePrev(widthEachSlide, posEachSlideNext, maxTx);
        this.createSlider();
        this.setState({
          activeSlide: 0,
          slideCount,
          widthEachSlide,
          posEachSlidePrev,
          posEachSlideNext,
          translateX: paddingHorizontal,
          hasScroll: true,
          widthTabs,
          widthSwiper,
          maxTx,
        });
      } else {
        this.setState({
          slideCount: 0,
          widthEachSlide: [],
          hasScroll: false,
          widthTabs,
          widthSwiper,
        });
      }
    }
  }

  getWidthTabs() {
    const listChildNodes = this.tabs && this.tabs.childNodes;
    let widthTabs = 0;
    if (listChildNodes && listChildNodes.length > 0) {
      const nodesArray = [].slice.call(listChildNodes);
      widthTabs = nodesArray.reduce((accumulator, currentNode) => (
        accumulator + currentNode.offsetWidth
      ), 0);
    }
    return widthTabs;
  }

  getPosEachSlidePrev(widthEachSlide, posEachSlideNext, maxTx) {
    const posEachSlidePrev = [];
    let i = 1;
    [].concat(posEachSlideNext).reduceRight((accumulator, currentValue, currentIndex) => {
      let pos = maxTx;
      if (currentValue >= maxTx) {
        pos = accumulator + widthEachSlide[widthEachSlide.length - i];
        i += 1;
      }
      const j = currentIndex - 1;
      if (j >= 0) posEachSlidePrev[j] = pos;
      return pos;
    }, maxTx);
    return posEachSlidePrev;
  }

  getWidthEachSlide() {
    const { paddingHorizontal } = this.props;
    const listChildNodes = this.tabs && this.tabs.childNodes;
    let widthTabs = 0;
    const posEachSlideNext = [];
    const widthEachSlide = [];
    let slideCount = 0;
    if (listChildNodes && listChildNodes.length > 0) {
      slideCount = listChildNodes.length;
      const nodesArray = [].slice.call(listChildNodes);
      widthTabs = nodesArray.reduce((accumulator, currentNode, currentIndex) => {
        const pos = (currentIndex === 0) ? paddingHorizontal : -(accumulator - paddingHorizontal);
        posEachSlideNext.push(pos);
        widthEachSlide.push(currentNode.offsetWidth);
        return accumulator + currentNode.offsetWidth;
      }, 0);
    }
    return {
      widthTabs,
      slideCount,
      widthEachSlide,
      posEachSlideNext,
    };
  }

  createSlider() {
    const options = {
      // direction: Hammerjs.DIRECTION_ALL, // swipeup swipedown
      // threshold: 1,
      // velocity: 0.1,
      preventDefault: true,
    };
    if (!this.state.mc) {
      const mc = new Hammerjs(this.swiper, options);
      this.setState({ mc });
      mc.on('swipeleft swiperight', (ev) => {
        ev.preventDefault();
        if (ev.type === 'swipeleft') {
          this.nextSlide();
        } else if (ev.type === 'swiperight') {
          this.prevSlide();
        }
      });
    }
  }

  getActiveSlide(number) {
    const { slideCount } = this.state;
    let activeSlide = null;
    if (number < 0) {
      activeSlide = 0;
    } else if (number > slideCount - 1) {
      activeSlide = slideCount - 1;
    } else {
      activeSlide = number;
    }
    return activeSlide;
  }

  prevSlide() {
    const { paddingHorizontal } = this.props;
    const {
      translateX,
      activeSlide,
      posEachSlidePrev,
    } = this.state;
    if (translateX < paddingHorizontal) {
      let crrActiveSlide = this.getActiveSlide(activeSlide - 1);
      if (posEachSlidePrev[crrActiveSlide] === translateX && crrActiveSlide > 0) {
        crrActiveSlide = this.getActiveSlide(crrActiveSlide - 1);
      }
      const newTranslateX = (posEachSlidePrev[crrActiveSlide] < paddingHorizontal) && (activeSlide !== 0)
        ? posEachSlidePrev[crrActiveSlide] : paddingHorizontal;
      // if (newTranslateX < translateX) {
      //   console.log('OMB');
      // }
      this.setState({
        activeSlide: crrActiveSlide,
        translateX: newTranslateX,
      });
    }
  }

  nextSlide() {
    const {
      translateX,
      activeSlide,
      posEachSlideNext,
      maxTx,
    } = this.state;
    if (maxTx < translateX) {
      const crrActiveSlide = this.getActiveSlide(activeSlide + 1);
      this.setState({
        activeSlide: crrActiveSlide,
        translateX: (posEachSlideNext[crrActiveSlide] > maxTx)
          ? posEachSlideNext[crrActiveSlide] : maxTx,
      });
    }
  }

  goToSlide(number) {
    this.setState({
      activeSlide: number,
      translateX: this.state.posEachSlideNext[number],
    });
  }

  checkActiveTabHidden(index) {
    const { paddingHorizontal } = this.props;
    const {
      widthSwiper,
      translateX,
      posEachSlideNext,
      widthEachSlide,
    } = this.state;

    const realWidthSlider = widthSwiper - (2*paddingHorizontal);
    const opencastNext = realWidthSlider + (posEachSlideNext[index] - translateX);
    // realWidthSlider
    // + ((posEachSlideNext[index] - (translateX - paddingHorizontal))
    // - paddingHorizontal);
    const opencastPrev = -(
      (posEachSlideNext[index] - paddingHorizontal)
      - (widthEachSlide[index] + (translateX - paddingHorizontal)));

    if (widthEachSlide[index] > opencastNext) {
      // console.log('%c Overlap at Right -- phải tính lại', 'background: #222; color: #bada55');
      // console.log(opencastNext);
      this.nextSlide();
    }

    if (widthEachSlide[index] > opencastPrev) {
      // console.log('%c overlap at Left', 'background: #222; color: #bada55');
      // console.log(opencastPrev, index);
      // this.prevSlide();
      this.goToSlide(index);
    }
  }

  changeTab(id, name, index) {
    const { items, updateBoxActive, idSelected } = this.props;
    const isActive = items && items[index] && idSelected === items[index].id;
    if (!isActive) {
      this.checkActiveTabHidden(index);
      updateBoxActive(id);
    }
  }

  render() {
    const {
      classes,
      paddingHorizontal,
      items,
      idSelected,
    } = this.props;
    const {
      translateX,
      widthTabs,
      hasScroll,
      maxTx,
    } = this.state;

    const disabledLeft = (translateX === paddingHorizontal);
    const disabledRight = (maxTx >= translateX);
    const finalWidthTabs = hasScroll ? widthTabs : '100%';
    const hammerClass = [classes.hammer];
    if (!hasScroll) hammerClass.push('noScroll');
    return (
      <div className={classes.navSlider}>
        <div ref={(DOM) => {
          this.swiper = DOM;
        }}
        className={hammerClass.join(' ')}
        >
          <ul className={classes.tabs}
            ref={(DOM) => { this.tabs = DOM; }}
            style={{
              width: finalWidthTabs || 'auto',
              transform: `translateX(${hasScroll ? translateX : 0}px)`,
              display: 'flex', // style={{ flex: '1 0 auto' }}
            }}>
            {items.map((tab, index) => {
              const isActive = items && items[index]
                && idSelected === items[index].id ? 'active' : '';
              const tabClass = [classes.item, isActive].join(' ');
              return (
                <li
                  key={tab.id}
                  onClick={() => {
                    this.changeTab(tab.id, tab.name, index);
                  }}
                  style={{ flexShrink: 0 }}
                  className={tabClass}>
                  {tab.name}
                </li>
              );
            })}
          </ul>
          {paddingHorizontal ?
            <React.Fragment>
              <button
                disabled={disabledLeft}
                className={classes.btnPrev}
                style={{ width: paddingHorizontal }}
                onClick={this.prevSlide.bind(this)}>
                ⇠
              </button>
              <button
                disabled={disabledRight}
                className={classes.btnNext}
                style={{ width: paddingHorizontal }}
                onClick={this.nextSlide.bind(this)}>
                ⇢
              </button>
            </React.Fragment>
            : null
          }
        </div>
      </div>
    );
  }
}

NavMobile.defaultProps = {
  paddingHorizontal: 0,
  idSelected: 'teuvolume',
  updateBoxActive: () => {console.log("click to sidebar!!!")},
};

NavMobile.propTypes = {
  paddingHorizontal: PropTypes.number,
  items: PropTypes.array,
  idSelected: PropTypes.string,
  updateBoxActive: PropTypes.func,
};

const styles = ({heightArrowBottom = '0.5rem'}) => ({
  navSlider: {
    width: '100%',
    overflowX: 'hidden',
    height: 'var(--height-nav-mobile)',
    background: '#fff',
  },
  tabs: {
    display: 'flex',
    height: '100%',
    listStyle: 'none',
    transition: 'transform 400ms cubic-bezier(0.5, 0, 0.5, 1)',
    paddingBottom: heightArrowBottom,
  },
  item: {
    flexShrink: '0',
    cursor: 'pointer',
    color: 'var(--color-text)',
    position: 'relative',
    fontWeight: '300',
    fontSize: '0.875rem',
    padding: '0 1rem',
    borderTop: '1px solid #e6e9ed',
    borderRight: '1px solid #e6e9ed',
    borderBottom: '1px solid #e6e9ed',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&.active': {
      borderBottom: '2px solid var(--color-secondary)',
      color: 'var(--color-secondary)',
      '&:after': {
        content: '""',
        position: 'absolute',
        top: '100%',
        left: '50%',
        borderTop: `${heightArrowBottom} solid var(--color-secondary)`,
        borderLeft: `${heightArrowBottom} solid transparent`,
        borderRight: `${heightArrowBottom} solid transparent`,
        marginLeft: `-${heightArrowBottom}`,
      }
    },
  },
  btn: {
    cursor: 'pointer',
    display: 'flex',
    position: 'absolute',
    top: '0',
    left: '0',
    height: `calc(100% - ${heightArrowBottom})`,
    fontSize: '18px',
    color: '#fff',
    background: '#4abdac',
    zIndex: '1',
    border: '0',
    alignContent: 'center',
    justifyContent: 'center',
    '&:disabled': {
      opacity: '0.5',
      cursor: 'default',
    }
  },
  btnPrev: {
    composes: '$btn',
  },
  btnNext: {
    composes: '$btn',
    left: 'auto',
    right: '0',
  },
  hammer: {
    position: 'relative',
    height: '100%',
    '&.noScroll': {
      '& $item': {
        flexGrow: '1',
      },
      '& $btn': {
        display: 'none',
      }
    },
  },
});

export default withStyles(styles)(NavMobile);
