import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';

class ModalManager extends React.Component {
  static open(props) {
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    document.body.appendChild(modalContainer);

    const onClose = () => {
      const unmountResult = ReactDOM.unmountComponentAtNode(modalContainer);
      if (unmountResult && modalContainer.parentNode) {
        modalContainer.parentNode.removeChild(modalContainer);
      }
    };

    ReactDOM.render((
      <Modal {...props} onClose={onClose} isOpen={true} needPortal={false}>
        {props.content}
      </Modal>
    ), modalContainer);
  }

  static confirm(props) {
    const iconClass = props.icon ? `fa-${props.icon}` : 'fa-question-circle-o';
    const typeClass = props.type ? `is-${props.type}` : 'is-warning';

    const content = (
      <article className={`media ${typeClass}`}>
        <div className="media-left"><i className={`fa ${iconClass}`}></i></div>
        <div className="media-content">{props.content}</div>
      </article>
    );

    props.content = content;
    props.wrapClass = 'modal-confirm borderless';
    if (!props.width) props.width = 400;
    if (!props.title) props.title = '提示';
    this.open(props);
  }

  static alert(props) {
    props.showCancel = false;
    props.type = 'danger';
    props.icon = 'exclamation-triangle';
    this.confirm(props);
  }
}

export default ModalManager;
