import React from 'react';
import Transition from '../transition';

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closed: false,
      doClosed: false,
    };
  }

  handleClose() {
    this.setState({
      closed: true,
    }, this.props.onClose);
  }

  render() {
    const { type, title, closable, icon, animated, children } = this.props;

    let iconClass = icon;
    if (!iconClass) {
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

    let faSpin = null;
    if (type === 'loading' || animated) faSpin = 'fa-spin';

    let typeClass = '';
    if (type === 'loading') {
      typeClass = 'is-info';
    } else {
      typeClass = type ? `is-${type}` : '';
    }

    return (
      <Transition
        in={!this.state.closed}
        enteringClassName="fade"
        exitingClassName="fade"
        unmountOnExit={true}
        timeout={300}
      >
        <div className={`notification alert ${typeClass} ${hasIcon}`}>
          {closable ? <button className="delete" onClick={this.handleClose.bind(this)}></button> : null}
          {title ? <div className="title">{title}</div> : null}
          {iconClass ? <div className="wrap-icon"><i className={`fa fa-${iconClass} ${faSpin}`}></i></div> : null}
          <div className="notification-content">{children}</div>
        </div>
      </Transition>
    );
  }
}

Alert.propTypes = {
  type: React.PropTypes.string,
  title: React.PropTypes.string,
  closable: React.PropTypes.bool,
  onClose: React.PropTypes.func,
  icon: React.PropTypes.string,
  animated: React.PropTypes.bool,
};

Alert.defaultProps = {
  type: 'default',
  closable: false,
  animated: false,
};

export default Alert;
