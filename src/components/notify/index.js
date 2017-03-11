import React from 'react';
import ReactDOM from 'react-dom';
import Notify from './Notify';

class NotifyManager extends React.Component {
  static open(options) {
    const defaultProps = {
      placement: 'top-right',
      duration: 4500,
      onClose: () => {},
      closable: true,
    };
    const props = Object.assign(defaultProps, options);

    let notifyContainer = document.querySelector(`.notifications.${props.placement}`);
    if (!notifyContainer) {
      notifyContainer = document.createElement('div');
      notifyContainer.classList.add('notifications', props.placement);
      document.body.appendChild(notifyContainer);
    }
    const notifyEl = document.createElement('div');
    notifyContainer.appendChild(notifyEl);

    const onClose = () => {
      const unmountResult = ReactDOM.unmountComponentAtNode(notifyEl);
      if (unmountResult && notifyEl.parentNode) {
        notifyEl.parentNode.removeChild(notifyEl);
      }
    };
    ReactDOM.render((
      <Notify {...props} onClose={onClose}/>
    ), notifyEl);
  }

  static info(options) {
    options = options || {};
    options.type = 'info';
    this.open(options);
  }

  static warning(options) {
    options = options || {};
    options.type = 'warning';
    this.open(options);
  }

  static success(options) {
    options = options || {};
    options.type = 'success';
    this.open(options);
  }

  static danger(options) {
    options = options || {};
    options.type = 'danger';
    this.open(options);
  }
}

export default NotifyManager;
