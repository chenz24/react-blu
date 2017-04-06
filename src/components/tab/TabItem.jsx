import React from 'react';
import classNames from 'classnames';
import Transition from '../transition';

class TabItem extends React.Component {
  constructor() {
    super();

    this.state = {
      isActive: false,
    };
  }

  componentWillMount() {
    this.setState({
      isActive: this.props.isActive,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isActive: nextProps.isActive,
    });
  }

  render() {
    const transition = this.props.transition;
    return (
      <Transition
        enteringClassName={transition}
        in={this.state.isActive}
        transitionAppear={true}
        unmountOnExit={true}
        timeout={300}
      >
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
  transition: React.PropTypes.string,
};

TabItem.defaultProps = {
  disabled: false,
  isActive: false,
};


export default TabItem;
