import React from 'react';
import ReactDOM from 'react-dom';
import Aside from './Aside';

class AsideManager extends React.Component {
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
      <Aside {...props} onClose={onClose} isOpen={true} needPortal={false}>
        {props.content}
      </Aside>
    ), modalContainer);
  }
}

export default AsideManager;
