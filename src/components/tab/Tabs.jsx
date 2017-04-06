import React from 'react';
import classNames from 'classnames';

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: props.activeIndex,
      transition: '',
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  isActive(index) {
    return index === this.state.selectedIndex;
  }

  handleSelect(index) {
    const selectedIndex = index;
    let transition = this.state.transition;
    if (this.props.transition === 'fadeLeftRight') {
      transition = index < this.state.selectedIndex ? 'fadeRight' : 'fadeLeft';
    } else if (this.props.transition === 'fadeUpDown') {
      transition = index < this.state.selectedIndex ? 'fadeUp' : 'fadeDown';
    }

    this.setState({
      selectedIndex,
      transition,
    });

    this.props.onTabClick(index, this.props.children[index]);
  }

  componentWillMount() {
    let transition = this.props.transition;
    if (this.props.transition === 'fadeLeftRight') {
      transition = 'fadeLeft';
    } else if (this.props.transition === 'fadeUpDown') {
      transition = 'fadeUpDown';
    }
    this.setState({
      transition,
    });
  }

  render() {
    const {
      layout,
      type,
      size,
      alignment,
      children,
    } = this.props;
    const selectedIndex = this.state.selectedIndex;
    const transition = this.state.transition;

    const alignClass = alignment ? `is-${alignment}` : null;
    const typeClass = type ? `is-${type}` : null;
    const sizeClass = size ? `is-${size}` : null;
    const layoutClass = layout ? `is-layout-${layout}` : null;
    const tabClasses = classNames('tabs', alignClass, typeClass, sizeClass, layoutClass);

    const tabEls = [];
    const tabItems = [];
    React.Children.forEach(children, (tab, index) => {
      const tabProps = tab.props;
      const isActive = (index === selectedIndex);

      const tabEl = (
        <li key={`tab-item-${index}`}
            className={classNames({ 'is-active': isActive, 'is-disabled': tabProps.disabled })}
            onClick={this.handleSelect.bind(this, index)}
        >
          <a>
          {tabProps.icon ? <span className={classNames('icon', { 'is-small': size !== 'large' })}><i className={classNames('fa', `fa-${tabProps.icon}`)}></i></span> : null}
          <span>{tabProps.label}</span>
          </a>
        </li>
      );
      tabEls.push(tabEl);

      const cloneTab = React.cloneElement(tab, { isActive, transition, key: `tab-content-${index}` });
      tabItems.push(cloneTab);
    });

    return (
      <div className={tabClasses}>
        <ul className="tab-list">{tabEls}</ul>
        <div className="tab-content is-flex">{tabItems}</div>
      </div>
    );
  }
}

Tabs.propTypes = {
  layout: React.PropTypes.string,
  type: React.PropTypes.string,
  size: React.PropTypes.string,
  alignment: React.PropTypes.string,
  onTabClick: React.PropTypes.func,
  activeIndex: React.PropTypes.number,
  unmountOnExit: React.PropTypes.bool,
  transition: React.PropTypes.string,
};

Tabs.defaultProps = {
  layout: 'top',
  activeIndex: 0,
  unmountOnExit: true,
  transition: 'fade',
  onTabClick: () => {},
};

export default Tabs;
