import React from 'react';
import classNames from 'classnames';

class TimelineItem extends React.Component {

  render() {
    const {
      icon,
      date,
      type,
      children,
    } = this.props;

    const iconClass = icon ? `fa-${icon}` : '';
    const typeClass = type ? `is-${type}` : '';
    return (
      <div className={classNames('timeline-item', typeClass)}>
        {icon ? <div className="timeline-icon"><i className={classNames('fa', iconClass)}></i></div> : null}
        <div className="timeline-item-main">
          <div className="timeline-item-date">{ date }</div>
          <div className="timeline-item-content">{ children }</div>
        </div>
      </div>
    );
  }
}

TimelineItem.propTypes = {
  icon: React.PropTypes.string,
  date: React.PropTypes.string,
  type: React.PropTypes.string,
};

export default TimelineItem;
