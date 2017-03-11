import React from 'react';

class Timeline extends React.Component {
  render() {
    return (
      <div className="timeline">
        {this.props.children}
      </div>
    );
  }
}

export default Timeline;
