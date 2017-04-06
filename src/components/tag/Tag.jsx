import React from 'react';
import classNames from 'classnames';
import Transition from '../transition';

class Tag extends React.Component {
  constructor() {
    super();
    this.state = {
      isShow: true,
    };

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({
      isShow: false,
    });
    this.props.onClose();
  }

  render() {
    const {
      type,
      size,
      closable,
      rounded,
      children,
    } = this.props;

    const typeClass = type ? `is-${type}` : null;
    const sizeClass = size ? `is-${size}` : null;
    const btnClass = size === 'large' ? null : 'is-small';
    const roundedClass = rounded ? null : 'is-square';
    const tagClasses = classNames('tag', typeClass, sizeClass, roundedClass);

    return (
      <Transition
        in={this.state.isShow}
        enteringClassName="fade"
        exitingClassName="fade"
        unmountOnExit={true}
        timeout={300}
      >
        <span className={tagClasses}>
          {children}
        {closable ? <button className={classNames(btnClass, 'delete')} onClick={this.handleClose}></button> : null}
        </span>
      </Transition>
    );
  }
}

Tag.propTypes = {
  type: React.PropTypes.string,
  size: React.PropTypes.string,
  closable: React.PropTypes.bool,
  rounded: React.PropTypes.bool,
  onClose: React.PropTypes.func,
};

Tag.defaultProps = {
  onClose: () => {},
  rounded: false,
};

export default Tag;
