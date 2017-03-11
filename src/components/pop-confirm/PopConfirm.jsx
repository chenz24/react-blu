import React from 'react';
import Popper from '../popper';

class PopConfirm extends React.Component {
  constructor() {
    super();

    this.state = {
      isShow: false,
    };
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleOk(e) {
    this.props.onOk();
    this.handleClose(e);
  }

  handleCancel(e) {
    this.props.onCancel();
    this.handleClose(e);
  }

  handleClose(e) {
    e.stopPropagation();
    this.setState({
      isShow: false,
    });
  }

  render() {
    const {
      width,
      type,
      icon,
      showOk,
      showCancel,
      okText,
      cancelText,
    } = this.props;

    let popperStyle = {};
    if (width && width !== 276) popperStyle = { width: `${width}px`, maxWidth: 'none' };

    const typeClass = type ? `is-${type}` : null;
    const content = (
      <div>
        {this.props.title ? <div className="popover-title">{this.props.title}</div> : null}
        <div className="popover-content">
          <article className={`media ${typeClass}`}>
            {icon ? <div className="media-left"><i className={`fa fa-${icon}`}></i></div> : null}
            <div className="media-content">{this.props.content}</div>
          </article>
        </div>
        <div className="popover-footer">
          {showCancel ? <a className="button is-small" onClick={this.handleCancel}>{cancelText}</a> : null}
          {showOk ? <a className="button is-small is-primary" onClick={this.handleOk}>{okText}</a> : null}
        </div>
      </div>
    );

    return (
      <Popper {...this.props} classPre="popover" show={this.state.isShow} classes="popover-confirm" content={content} style={popperStyle}>
        {this.props.children}
      </Popper>
    );
  }
}

PopConfirm.propTypes = {
  always: React.PropTypes.bool,
  trigger: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  appendToBody: React.PropTypes.bool,
  content: React.PropTypes.string,
  title: React.PropTypes.string,
  width: React.PropTypes.number,
  showOk: React.PropTypes.bool,
  showCancel: React.PropTypes.bool,
  okText: React.PropTypes.string,
  cancelText: React.PropTypes.string,
  onOk: React.PropTypes.func,
  onCancel: React.PropTypes.func,
  icon: React.PropTypes.string,
  type: React.PropTypes.string,
};

PopConfirm.defaultProps = {
  always: false,
  trigger: 'click',
  placement: 'top',
  disabled: false,
  appendToBody: true,
  okText: '确定',
  cancelText: '取消',
  onOk: () => {},
  onCancel: () => {},
  type: 'info',
  showOk: true,
  showCancel: true,
};

export default PopConfirm;
