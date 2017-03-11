import React from 'react';
import { Notify } from '../../src';

class NotifyPage extends React.Component {

  handleNotify() {
    Notify.open({
      type: 'primary',
      title: 'Congratulation！',
      content: 'Mission Complete',
    });
  }

  handleNotifyTop() {
    Notify.open({
      content: '任务执行成功！',
      placement: 'top-center',
    });
  }

  handleNotifyInfo() {
    Notify.info({
      content: '任务执行成功！',
    });
  }

  handleNotifyWarning() {
    Notify.warning({
      content: '任务执行成功！',
    });
  }

  handleNotifySuccess() {
    Notify.success({
      content: '任务执行成功！',
    });
  }

  handleNotifyDanger() {
    Notify.danger({
      content: '任务执行成功！',
    });
  }

  handleNotifyTransition() {
    Notify.open({
      content: '任务执行成功！',
      transition: 'bounce',
      placement: 'top-center',
    });
  }

  render() {
    return (
      <div className="content" style={{ height: '10000px' }}>
        <h2>Notify 通知</h2>
        <div className="box box-demo">
          <button className="button is-primary" onClick={this.handleNotify}>Notify</button> &nbsp;&nbsp;&nbsp;
          <button className="button is-primary" onClick={this.handleNotifyTop}>Notify Top</button>
          <hr />
          <button className="button is-info" onClick={this.handleNotifyInfo}>Notify Info</button> &nbsp;&nbsp;&nbsp;
          <button className="button is-warning" onClick={this.handleNotifyWarning}>Notify Warning</button>&nbsp;&nbsp;&nbsp;
          <button className="button is-success" onClick={this.handleNotifySuccess}>Notify Success</button>&nbsp;&nbsp;&nbsp;
          <button className="button is-danger" onClick={this.handleNotifyDanger}>Notify Danger</button>&nbsp;&nbsp;&nbsp;
          <hr />
          <button className="button is-info" onClick={this.handleNotifyTransition}>Notify Transition</button> &nbsp;&nbsp;&nbsp;
        </div>
      </div>
    );
  }
}

export default NotifyPage;
