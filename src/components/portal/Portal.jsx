// https://github.com/tajo/react-portal/blob/master/lib/portal.js
import React from 'react';
import ReactDOM from 'react-dom';

class Portal extends React.Component {
  constructor() {
    super();

    this.state = { active: false };
    this.portal = null;
    this.node = null;
  }

  componentDidMount() {
    if (this.props.isOpen) {
      this.openPortal();
    }
    console.log(this.props.children);
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.isOpen !== 'undefined') {
      if (nextProps.isOpen) {
        if (this.state.active) {
          this.renderPortal(nextProps);
        } else {
          this.openPortal(nextProps);
        }
      }

      if (!nextProps.isOpen && this.state.active) {
        this.closePortal();
      }
    }

    // portal handles its own 'is open' state
    if (typeof nextProps.isOpen === 'undefined' && this.state.active) {
      this.renderPortal(nextProps);
    }
  }

  componentWillUnmount() {
    this.closePortal(true);
  }

  openPortal(props = this.props) {
    this.setState({ active: true });
    this.renderPortal(props, true);
  }

  closePortal(isUnmounted = false) {
    const resetPortalState = () => {
      if (this.node) {
        ReactDOM.unmountComponentAtNode(this.node);
        document.body.removeChild(this.node);
      }
      this.portal = null;
      this.node = null;
      if (isUnmounted !== true) {
        this.setState({ active: false });
      }
    };

    if (this.state.active) {
      if (this.props.beforeClose) {
        this.props.beforeClose(this.node, resetPortalState);
      } else {
        resetPortalState();
      }

      this.props.onClose();
    }
  }

  renderPortal(props, isOpening) {
    if (!this.node) {
      this.node = document.createElement('div');
      document.body.appendChild(this.node);
    }

    if (isOpening) {
      //
    }

    let children = props.children;
    if (typeof props.children.type === 'function') {
      children = React.cloneElement(props.children, { closePortal: this.closePortal });
    }

    this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      children,
      this.node,
    );
  }

  render() {
    console.log(this);
    return null;
  }

}

Portal.propTypes = {
  children: React.PropTypes.element.isRequired,
  isOpen: React.PropTypes.bool,
  container: React.PropTypes.string,
  beforeClose: React.PropTypes.func,
};

export default Portal;
