import React from 'react';
import Modal from '../modal/Modal';

class Aside extends React.Component {

  render() {
    let defaultClass = 'aside';
    let transition = '';
    if (this.props.placement === 'left') {
      transition = 'fadeLeft';
    } else {
      defaultClass = 'aside aside-right';
      transition = 'fadeRight';
    }

    return (
      <Modal {...this.props} defaultClass={defaultClass} transition={transition}>
        {this.props.children}
      </Modal>
    );
  }
}

Aside.propTypes = {
  placement: React.PropTypes.string,
};

Aside.defaultProps = {
  placement: 'left',
};

export default Aside;
