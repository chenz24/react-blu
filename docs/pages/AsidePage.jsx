import React from 'react';
import { Aside, AsideManager } from '../../src';

class AsidePage extends React.Component {
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
  }

  handleModalManager() {
    AsideManager.open({
      title: 'test',
      content: <div>Duis mollis, est non commodo luctus, nisi erat porttitor</div>,
    });
  }

  handleAsideManager() {
    AsideManager.open({
      placement: 'right',
      title: 'test',
      content: <div>Duis mollis, est non commodo luctus, nisi erat porttitor</div>,
    });
  }

  render() {
    return (
      <div className="content">
        <h2>Aside 侧边模态框</h2>
        <div className="box box-demo">
          <Aside isOpen={this.state.isOpen} onClose={this.handleCloseModal}>
            <p>asdadsf</p>
          </Aside>
          <button className="button is-primary" onClick={this.handleOpenModal}>Open Modal</button>&nbsp;&nbsp;&nbsp;
          <button className="button is-primary" onClick={this.handleModalManager}>AsideManager Open</button>&nbsp;&nbsp;&nbsp;
          <button className="button is-primary" onClick={this.handleAsideManager}>Right Modal</button>
        </div>
      </div>
    );
  }
}

export default AsidePage;
