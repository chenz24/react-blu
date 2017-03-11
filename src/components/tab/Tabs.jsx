import React from 'react';
import classNames from 'classnames';

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: props.activeIndex,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  isActive(index) {
    return index === this.state.selectedIndex;
  }

  handleSelect(index) {
    this.setState({
      selectedIndex: index,
    });

    // React.Children.forEach(this.props.children, (tab, index) => {
    //
    // });
  }

  render() {
    const {
      layout,
      type,
      size,
      alignment,
      unmountOnExit,
      children,
    } = this.props;
    const selectedIndex = this.state.selectedIndex;

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

      if (unmountOnExit && isActive) {
        tabItems.push(tab);
      } else if (!unmountOnExit) {
        const cloneTab = React.cloneElement(tab, { isActive });
        tabItems.push(<div className={classNames({ 'is-active': isActive })}>{cloneTab}</div>);
      }
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
};

Tabs.defaultProps = {
  layout: 'top',
  activeIndex: 0,
  unmountOnExit: true,
};

export default Tabs;
