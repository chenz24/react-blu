import React from 'react';
import Popper from '../popper';

class Popover extends React.Component {
  render() {
    let popperStyle = {};
    const width = this.props.width;
    if (this.props.width && this.props.width !== 276) popperStyle = { width: `${width}px`, maxWidth: 'none' };

    const content = (
      <div>
        {this.props.title ? <div className="popover-title">{this.props.title}</div> : null}
        <div className="popover-content">
          {this.props.content}
        </div>
      </div>
    );

    return (
      <Popper {...this.props} classPre="popover" content={content} style={popperStyle}>
        {this.props.children}
      </Popper>
    );
  }
}

Popover.propTypes = {
  always: React.PropTypes.bool,
  trigger: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  appendToBody: React.PropTypes.bool,
  content: React.PropTypes.string,
  title: React.PropTypes.string,
  width: React.PropTypes.number,
};

Popover.defaultProps = {
  always: false,
  trigger: 'click',
  placement: 'top',
  disabled: false,
  appendToBody: true,
};

export default Popover;
