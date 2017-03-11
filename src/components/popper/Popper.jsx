import React from 'react';
import ReactDOM from 'react-dom';
import PopperJS from 'popper.js';
import Transition from '../transition/Transition';

class Popper extends React.Component {
  constructor() {
    super();

    this.state = {
      reference: null,
      popper: null,
      isShow: false,
    };
    this.timer = null;
    this.popper = null;
    this.reference = null;

    this.createInstance = this.createInstance.bind(this);
    this.showPopper = this.showPopper.bind(this);
    this.hidePopper = this.hidePopper.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  runPopper() {
    if (this.props.disabled) return;
    if (this.props.always) {
      this.createInstance();
    } else {
      this.bindEvent();
    }
  }

  showPopper() {
    this.setState({
      isShow: true,
    });
    if (this.timer) clearTimeout(this.timer);
  }

  hidePopper() {
    this.setState({
      isShow: false,
    });
    if (!this.popper) return;
    this.timer = setTimeout(() => { // add delay for transition animate
      this.popper.destroy();
      this.popper = null;
    }, 300);
  }

  handleClick(e) {
    const rootNode = ReactDOM.findDOMNode(this);
    if (rootNode.contains(e.target)) {
      e.stopPropagation();
      this.state.isShow ? this.hidePopper() : this.createInstance();
    } else if (this.refs.popper.contains(e.target)) {
      this.showPopper();
    } else if (this.state.isShow) {
      this.hidePopper();
    }
  }

  createInstance() {
    this.showPopper();
    if (this.popper) {
      this.popper.update();
      return;
    }

    const placementMapper = {
      top: 'top',
      left: 'left',
      right: 'right',
      bottom: 'bottom',
      topLeft: 'top-end',
      topRight: 'top-start',
      leftTop: 'left-end',
      leftBottom: 'left-start',
      bottomLeft: 'bottom-end',
      bottomRight: 'bottom-start',
      rightTop: 'right-end',
      rightBottom: 'right-start',
    };
    const placement = placementMapper[this.props.placement] ? placementMapper[this.props.placement] : 'bottom';

    const reference = this.reference = this.reference || this.refs.referenceEl; // eslint-disable-line
    const popperEl = this.refs.popper;
    const options = {
      placement,
    };
    if (this.props.appendToBody) document.body.appendChild(popperEl);
    this.popper = new PopperJS(reference, popperEl, options);
  }

  bindEvent() {
    const reference = this.reference = this.reference || this.refs.referenceEl; // eslint-disable-line
    const popperEl = this.refs.popper;
    if (!reference || !popperEl) return;

    if (this.props.trigger === 'hover') {
      reference.addEventListener('mouseenter', this.createInstance);
      reference.addEventListener('mouseleave', this.hidePopper);
      popperEl.addEventListener('mouseenter', this.showPopper);
      popperEl.addEventListener('mouseleave', this.hidePopper);
    } else {
      reference.addEventListener('click', this.handleClick);
      popperEl.addEventListener('click', this.showPopper);
      document.documentElement.addEventListener('click', this.handleClick);
    }
  }

  removeEvent() {
    if (!this.reference) return;
    const popper = this.$refs.popper;
    if (this.trigger === 'focus') {
      this.reference.removeEventListener('focus', this.createInstance);
      this.reference.removeEventListener('blur', this.hidePopper);
    } else if (this.trigger === 'click') {
      this.reference.removeEventListener('click', this.handleClick);
      popper.removeEventListener('click', this.showPopper);
      document.documentElement.removeEventListener('click', this.handleClick);
    } else {
      this.reference.removeEventListener('mouseenter', this.createInstance);
      this.reference.removeEventListener('mouseleave', this.hidePopper);
    }
  }

  destroy() {
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }
  }

  componentDidMount() {
    this.runPopper();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.disabled) {
      this.destroy();
    } else {
      this.runPopper();
    }

    if (nextProps.show) {
      this.runPopper();
      this.showPopper();
    } else {
      this.hidePopper();
    }
  }

  componentWillUnmount() {
    this.removeEvent();
    this.refs.popper.remove();
    this.destroy();
  }

  render() {
    const child = React.Children.only(this.props.children);
    const cloneChild = React.cloneElement(child, { ref: 'referenceEl' });

    let styles = {};
    if (!this.state.isShow) styles = { display: 'none' };

    const classPre = this.props.classPre;
    const classes = this.props.classes || '';
    return (
      <span>
        {cloneChild}
        <Transition
          in={this.state.isShow}
          transitionAppear={true}
          enteringClassName="fade"
          exitingClassName="fade"
        >
          <div className={`${classPre} ${classes}`} ref="popper" style={styles}>
            {this.props.content}
            <div className={`${classPre}-arrow`}></div>
          </div>
        </Transition>
      </span>
    );
  }
}

Popper.propTypes = {
  always: React.PropTypes.bool,
  trigger: React.PropTypes.string,
  placement: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  show: React.PropTypes.bool,
  appendToBody: React.PropTypes.bool,
  content: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.element,
  ]),
  classPre: React.PropTypes.string,
  classes: React.PropTypes.string,
};

Popper.defaultProps = {
  always: false,
  trigger: 'hover',
  placement: 'top',
  disabled: false,
  appendToBody: true,
  classPre: 'tooltip',
};


export default Popper;
