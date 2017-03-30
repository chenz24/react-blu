import React from 'react';
import classNames from 'classnames';
import Transition from '../transition/Transition';
import Portal from '../portal';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.handleBackdropClose = this.handleBackdropClose.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.isLoding = false;
    this.state = {
      isOpen: this.props.isOpen,
    };
  }

  handleOk() {
    if (this.props.asyncConfirm) {
      this.isLoding = true;
      this.props.onOk();
    } else {
      this.props.onOk();
      this.handleClose();
    }
    // this.props.onClose();
  }

  handleCancel() {
    this.props.onCancel();
    this.handleClose();
  }

  handleBackdropClose() {
    if (this.props.backdropClosable) {
      this.handleClose();
    }
  }

  handleClose() {
    this.setState({
      isOpen: false,
    });
    setTimeout(this.props.onClose, 300);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.props.isOpen) {
      this.setState({
        isOpen: nextProps.isOpen,
      });
    }
  }

  render() {
    const {
      title,
      width,
      okText,
      cancelText,
      backdrop,
      showOk,
      showCancel,
      transition,
      header,
      showHeader,
      footer,
      showFooter,
      children,
      needPortal,
      wrapClass,
    } = this.props;

    const isOpen = this.state.isOpen;
    const modalClass = classNames('modal', 'align-baseline', 'is-active', { 'modal-hidden': !isOpen }, wrapClass);

    let headerEl = null;
    if (showHeader) {
      headerEl = <header className="modal-card-head">{header}</header>;
      if (!header) {
        headerEl = (
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <span className="close" onClick={this.handleClose}>×</span>
          </header>
        );
      }
    }

    let footerEl = null;
    if (showFooter) {
      footerEl = <footer className="modal-card-foot">{footer}</footer>;
      if (!footer) {
        footerEl = (
          <footer className="modal-card-foot">
            {showCancel ? <a className="button" onClick={this.handleCancel}>{cancelText}</a> : null}
            {showOk ? <a className="button is-primary" onClick={this.handleOk}>{okText}</a> : null}
          </footer>
        );
      }
    }

    const modalEL = (
      <div className={modalClass}>
        {backdrop ?
          <Transition in={isOpen} enteringClassName="fade" exitingClassName="fade">
            <div className="modal-background" onClick={this.handleBackdropClose}></div>
          </Transition>
          : null
        }
        <Transition
          in={isOpen}
          enteringClassName={transition}
          exitingClassName={transition}
          transitionAppear={true}
        >
          <div className="modal-card" style={ { width: `${width}px` } }>
            {headerEl}
            <section className="modal-card-body">
              {children}
            </section>
            {footerEl}
          </div>
        </Transition>
      </div>
    );

    return needPortal ? <Portal isOpen={isOpen}>{modalEL}</Portal> : modalEL;
  }
}

Modal.propTypes = {
  isOpen: React.PropTypes.bool,
  title: React.PropTypes.node,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  okText: React.PropTypes.string,
  cancelText: React.PropTypes.string,
  backdrop: React.PropTypes.bool,
  backdropClosable: React.PropTypes.bool,
  showOk: React.PropTypes.bool,
  showCancel: React.PropTypes.bool,
  showHeader: React.PropTypes.bool,
  showFooter: React.PropTypes.bool,
  asyncConfirm: React.PropTypes.bool,
  transition: React.PropTypes.string,
  onOk: React.PropTypes.func,
  onCancel: React.PropTypes.func,
  onClose: React.PropTypes.func,
  header: React.PropTypes.node,
  footer: React.PropTypes.node,
  needPortal: React.PropTypes.bool,
  wrapClass: React.PropTypes.string,
};

Modal.defaultProps = {
  isOpen: false,
  width: 640,
  okText: '确定',
  cancelText: '取消',
  backdrop: true,
  backdropClosable: true,
  showOk: true,
  showCancel: true,
  showHeader: true,
  showFooter: true,
  transition: 'fade',
  onOk: () => {},
  onCancel: () => {},
  onClose: () => {},
  asyncConfirm: false,
  needPortal: true,
};

export default Modal;
