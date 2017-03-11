import React from 'react';
import classNames from 'classnames';
import Transition from '../transition/Transition';

class TabItem extends React.Component {
  constructor() {
    super();

    this.state = {
      isActive: false,
    };
  }

  componentWillMount() {
    console.log('mount');
  }

  componentWillReceiveProps(nextProps) {
    console.log('props', nextProps);
    setTimeout(() => {
      this.setState({
        isActive: true,
      });
    }, 300);
  }

  render() {
    return (
      <Transition enteringClassName="bounceIn" in={this.state.isActive} transitionAppear={true}>
        <div className={classNames('tab-pane', 'is-active')} key={this.props.label}>{this.props.children}</div>
      </Transition>
    );
  }
}

TabItem.propTypes = {
  label: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  isActive: React.PropTypes.bool,
};

TabItem.defaultProps = {
  disabled: false,
  isActive: false,
};


export default TabItem;
