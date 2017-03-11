import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Transition extends React.Component {

  render() {
    const { name, enterTimeOut, leaveTimeOut, children } = this.props;

    return (
      <ReactCSSTransitionGroup
        transitionName={name}
        transitionEnterTimeout={enterTimeOut}
        transitionLeaveTimeout={leaveTimeOut}
      >
        {children}
      </ReactCSSTransitionGroup>
    );
  }
}

Transition.propTypes = {
  name: React.PropTypes.string,
  enterTimeOut: React.PropTypes.number,
  leaveTimeOut: React.PropTypes.number,
};

Transition.defaultProps = {
  name: 'fade',
  enterTimeOut: 300,
  leaveTimeOut: 300,
};

export default Transition;
