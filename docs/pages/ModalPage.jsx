import React from 'react';
import { Modal, ModalManager, Notify } from '../../src';

class ModalPage extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({
      isOpen: true,
    });
  }

  handleCloseModal() {
    this.setState({
      isOpen: false,
    });
    Notify.open({
      content: 'Modal closed',
    });
  }

  handleModalManager() {
    ModalManager.open({
      title: 'test',
      content: <div>Duis mollis, est non commodo luctus, nisi erat porttitor</div>,
    });
  }

  handleModalConfirm() {
    ModalManager.confirm({
      title: '测试',
      content: <div>Duis mollis, est non commodo luctus, nisi erat porttitor</div>,
      transition: 'zoom',
    });
  }

  handleModalAlert() {
    ModalManager.alert({
      title: '测试',
      content: <div>asdfasdasdsf</div>,
    });
  }

  render() {
    return (
      <div className="content" style={{ height: '10000px' }}>
        <h2>Modal 模态框</h2>
        <div className="box box-demo">
          <Modal isOpen={this.state.isOpen} onClose={this.handleCloseModal} title="My modal">
            <div className="notification">
              <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem. Praesent commodo
                cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
              </p>
            </div>
          </Modal>
          <button className="button is-primary" onClick={this.handleOpenModal}>Open Modal</button> &nbsp;&nbsp;&nbsp;
          <button className="button is-primary" onClick={this.handleModalManager}>Modal Manager</button> &nbsp;&nbsp;&nbsp;
          <button className="button is-primary" onClick={this.handleModalConfirm}>Modal Confirm</button> &nbsp;&nbsp;&nbsp;
          <button className="button is-primary" onClick={this.handleModalAlert}>Modal Alert</button> &nbsp;&nbsp;&nbsp;
        </div>
      </div>
    );
  }
}

export default ModalPage;
