import React from 'react';
import Popper from '../popper';

class Tooltip extends React.Component {
  render() {
    const content = (
      <span>{this.props.content}</span>
    );
    return (
      <Popper {...this.props} classPre="tooltip" content={content}>
        {this.props.children}
      </Popper>
    );
  }
}

Tooltip.propTypes = {
  always: React.PropTypes.bool,
  trigger: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  appendToBody: React.PropTypes.bool,
  content: React.PropTypes.string,
  placement: React.PropTypes.string,
};

Tooltip.defaultProps = {
  always: false,
  trigger: 'hover',
  placement: 'top',
  disabled: false,
  appendToBody: true,
};

export default Tooltip;
