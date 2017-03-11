import React from 'react';
// import classNames from 'classnames';
import Transition from '../transition/Transition';

class Notify extends React.Component {
  constructor() {
    super();

    this.transitionAnimateMapper = {
      'top-right': 'fadeRight',
      'top-center': 'fadeDown',
      'top-left': 'fadeLeft',
      'bottom-right': 'fadeRight',
      'bottom-center': 'fadeUp',
      'bottom-left': 'fadeLeft',
    };
    this.timer = null;
    this.state = {
      isShow: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.autoClose = this.autoClose.bind(this);
  }
  handleClose() {
    clearTimeout(this.timer);
    this.setState({
      isShow: false,
    });
    setTimeout(this.props.onClose, 300);
  }

  autoClose() {
    this.setState({
      isShow: false,
    });
    setTimeout(this.props.onClose, 300);
  }

  componentDidMount() {
    this.setState({
      isShow: true,
    });
    if (this.props.duration) this.timer = setTimeout(() => this.autoClose(), this.props.duration);
  }

  render() {
    const {
      title,
      type,
      icon,
      content,
      closable,
      animated,
      placement,
      transition,
    } = this.props;

    const typeClass = type ? `is-${type}` : null;
    const faSpin = animated ? 'fa-spin' : null;
    const transitionClassName = transition || this.transitionAnimateMapper[placement];

    let iconClass = icon;
    if (!icon) {
      switch (type) {
        case 'info':
          iconClass = 'info-circle';
          break;
        case 'success':
          iconClass = 'check-circle';
          break;
        case 'warning':
          iconClass = 'exclamation-triangle';
          break;
        case 'danger':
          iconClass = 'times-circle';
          break;
        case 'loading':
          iconClass = 'spinner';
          break;
        default:
          iconClass = '';
      }
    }
    const hasIcon = iconClass ? 'has-icon' : '';

    return (
      <Transition in={this.state.isShow} enteringClassName={transitionClassName} exitingClassName={transitionClassName}>
        <div className={`notification alert ${typeClass} ${hasIcon}`}>
          {closable ? <span className="close" onClick={this.handleClose}>×</span> : null}
          {iconClass ? <div className="wrap-icon"><i className={`fa fa-${iconClass} ${faSpin}`}></i></div> : null}
          {title ? <div className="title is-5">{title}</div> : null}
          <div className="notification-content">{content}</div>
        </div>
      </Transition>
    );
  }
}

Notify.propTypes = {
  type: React.PropTypes.string,
  title: React.PropTypes.string,
  content: React.PropTypes.string,
  closable: React.PropTypes.bool,
  onClose: React.PropTypes.func,
  duration: React.PropTypes.number,
  placement: React.PropTypes.string,
  icon: React.PropTypes.string,
  animated: React.PropTypes.bool,
  transition: React.PropTypes.string,
};

Notify.defaultProps = {
  placement: 'top-right',
  duration: 4500,
  onClose: () => {},
  closable: true,
  type: 'default',
};

export default Notify;
