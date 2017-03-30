import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

class Menus extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      isActive: false,
    };

    this.handleToggleOpen = this.handleToggleOpen.bind(this);
  }

  handleToggleOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  componentWillMount() {
    this.arrowClass = this.props.type === 'float' ? 'fa-caret-right' : 'fa-caret-down';
  }

  componentDidMount() {
    if (this.props.isSub && this.props.type === 'float') {
      const node = ReactDOM.findDOMNode(this);
      node.addEventListener('mouseenter', this.handleToggleOpen);
      node.addEventListener('mouseleave', this.handleToggleOpen);
    }
  }

  componentWillUnmount() {
    if (this.props.isSub && this.props.type === 'float') {
      const node = ReactDOM.findDOMNode(this);
      node.removeEventListener('mouseenter', this.handleToggleOpen);
      node.removeEventListener('mouseleave', this.handleToggleOpen);
    }
  }

  render() {
    const { label, children, isSub, icon, type } = this.props;
    if (!isSub && label) {
      return (
        <div>
          <p className="menu-label">{label}</p>
          <ul className="menu-list">
            {children}
          </ul>
        </div>
      );
    } else if (isSub && label) {
      const style = this.state.isOpen ? null : { display: 'none' };
      return (
        <li>
          <a className={classNames('has-children', { 'is-active': this.state.isActive, 'is-open': this.state.isOpen })}
             onClick={this.handleToggleOpen}
          >
            {icon ? <i className={`fa fa-${icon}`}></i> : null}
            {label}
            <span className="nav-right"><i className={classNames('fa', this.arrowClass)}></i></span>
          </a>
          <ul style={style} className={classNames('menu-list', type)}>{children}</ul>
        </li>
      );
    }
  }
}

Menus.propTypes = {
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  isSub: React.PropTypes.bool,
  icon: React.PropTypes.string,
};

export default Menus;
