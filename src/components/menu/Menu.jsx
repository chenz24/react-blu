import React from 'react';

class Menu extends React.Component {
  constructor() {
    super();

    this.state = {
      hasChildren: false,
      arrowClass: 'fa-caret-down',
    };
  }
  //
  // componentWillMount() {
  //   React.Children.map(this.props.children, child => { // todo need refine
  //     if (child.type && child.type.name === 'Menus' && !this.state.hasChildren) {
  //       this.setState({ hasChildren: true });
  //     }
  //   });
  // }

  render() {
    const { children, icon } = this.props;

    return (
      <li>
        <span>
          <a href="#">
            {icon ? <i className={`fa fa-${icon}`}></i> : null}
            {children}
          </a>
        </span>
      </li>
    );
  }
}

Menu.propTypes = {
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  icon: React.PropTypes.string,
};

export default Menu;
