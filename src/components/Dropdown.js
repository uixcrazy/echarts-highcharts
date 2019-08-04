
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

class Dropdown extends React.Component {
  state = {
    focused: false,
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  handleClickOutside = (event) => {
    if (this.state.focused && this.dropdownRef && !this.dropdownRef.contains(event.target)) {
      this.setState({ focused: false });
      this.props.onHide();
    }
  }

  handleChange = () => {
    const { focused } = this.state;
    if (focused === false) {
      this.setState({ focused: true });
      this.props.onShow();
    } else {
      this.setState({ focused: false });
      this.props.onHide();
    }
  }

  toggle(show = true){
    this.setState({focused: show});
  }

  render() {
    const {
      classes,
      className,
      classNameSelect,
      classNameDropbox,
      style,
      label,
    } = this.props;
    const { focused } = this.state;

    const wrapperClass = [classes.wrapper];
    if (className) wrapperClass.push(className);

    const dropdownSelectClass = [classes.dropdownSelect];
    if (focused) dropdownSelectClass.push("focused");
    if (classNameSelect) dropdownSelectClass.push(classNameSelect);

    const dropdownCtClass = [classes.dropdownCt];
    if (classNameDropbox) dropdownCtClass.push(classNameDropbox);

    return (
      <div
        className={wrapperClass.join(" ")}
        style={style}
        ref={(node) => { this.dropdownRef = node; }}
      >
        <div
          className={dropdownSelectClass.join(" ")}
          onClick={this.handleChange}
        >
          {label} <i className={classes.iconAngleDown} />
        </div>
        { focused &&
          <div className={dropdownCtClass.join(" ")}>
            {this.props.children}
          </div>
        }
      </div>
    );
  }
}

const style = {
  wrapper: {
    position: 'relative',
  },
  dropdownSelect: {
    cursor: 'pointer',
    userSelect: 'none',
    height: '36px',
    lineHeight: '36px',
    borderRadius: '2px',
    border: 'var(--border-normal)',
    paddingLeft: '0.5rem',
    position: 'relative',
    transition: '100ms linear all',
    background: '#fff',
    '&.focused': {
      '& $iconAngleDown': {
        transform: 'rotate(-180deg)',
      },
    },
  },
  iconAngleDown: {
    content: '""',
    width: '0',
    height: '0',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: '5px solid #999',
    position: 'absolute',
    top: 'calc(50% - 2px)',
    right: '8px',
    transition: '200ms linear all',
  },
  dropdownCt: {
    position: 'absolute',
    width: '100%',
    zIndex: 99,
    borderRadius: '2px',
    border: 'var(--border-normal)',
    backgroundColor: '#fff',
    marginTop: '1px',
    boxShadow: '0 1px 5px #eee',
    // for ul
    '& ul': {
      '& li':{
        borderBottom: 'var(--border-normal)',
        padding: '0.5rem',
        width: '100%',
        textAlign: 'left',
        cursor: 'pointer',
        '&.active': {
          color: '#bbb',
          cursor: 'default',
        },
        '&:last-child': {
          borderBottom: 0,
        }
      }
    },
  },
};

Dropdown.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
  label: PropTypes.string,
  className: PropTypes.string,
  classNameContainer: PropTypes.string,
  classNameSelect: PropTypes.string,
  onShow: PropTypes.func,
  onHide: PropTypes.func,
};

Dropdown.defaultProps = {
  onHide: () => {},
  onShow: () => {},
}

export default withStyles(style)(Dropdown);


/**
 onChange(type) {
    this.props.getData({
      ...params
    });
    this.dropdownRef.toggle(false);
  }

<Dropdown
  innerRef={com => {
    this.dropdownRef = com;
  }}
  label={labeling.name}
>
  <div className="content">
    <ul>
          <li
            key={index}
            onClick={this.onChange.bind(this, k)}
          >
            {allLabels[k].name}
          </li>
    </ul>
  </div>
</Dropdown>
 */