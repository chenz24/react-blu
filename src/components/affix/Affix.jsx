import React from 'react';
import ReactDOM from 'react-dom';

class Affix extends React.Component {
  constructor() {
    super();

    this.state = {
      affixed: false,
      affixedClientHeight: 0,
      offsets: 0,
      styles: {},
      wrapStyle: {},
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  getScroll(w, top) {
    let ret = w[`page${(top ? 'Y' : 'X')}Offset`];
    const method = `scroll${top ? 'Top' : 'Left'}`;
    if (typeof ret !== 'number') {
      const d = w.document;
      // ie6,7,8 standard mode
      ret = d.documentElement[method];
      if (typeof ret !== 'number') {
        // quirks mode
        ret = d.body[method];
      }
    }
    return ret;
  }

  getOffset(element) {
    const rect = element.getBoundingClientRect();
    const body = document.body;
    const clientTop = element.clientTop || body.clientTop || 0;
    const clientLeft = element.clientLeft || body.clientLeft || 0;
//      const clientHeight = element.clientHeight || 0;
    const scrollTop = this.getScroll(window, true);
    const scrollLeft = this.getScroll(window);
    return {
      top: rect.bottom + scrollTop - clientTop - this.state.affixedClientHeight,
      left: rect.left + scrollLeft - clientLeft,
    };
  }

  handleScroll() {
    const rootNode = ReactDOM.findDOMNode(this);
    const scrollTop = this.getScroll(window, true) + this.state.offsets;// handle setting offset
    const elementOffset = this.getOffset(rootNode);

    if (!this.state.affixed && scrollTop > elementOffset.top) {
      const styles = {
        top: `${this.state.offsets}px`,
        left: `${elementOffset.left}px`,
        width: `${rootNode.offsetWidth}px`,
      };
      this.setState({
        affixed: true,
        styles,
      });
      this.props.onAffix(this.state.affixed);
    }

    // if setting boundary
    if (this.props.boundary && scrollTop > elementOffset.top) {
      const el = document.getElementById(this.props.boundary.slice(1));
      if (el) {
        const boundaryOffset = this.getOffset(el);
        if ((scrollTop + this.state.offsets) > boundaryOffset.top) {
          const top = scrollTop - boundaryOffset.top;
          const styles = Object.assign({}, this.state.styles); // clone object.(Mutating `style` is deprecated.)
          styles.top = `-${top}px`;
          this.setState({
            styles,
          });
        }
      }
    }

    if (this.state.affixed && scrollTop < elementOffset.top) {
      this.setState({
        affixed: false,
        styles: {},
      });
      this.props.onAffix(false);
    }

    if (this.state.affixed && this.props.boundary) {
      const el = document.getElementById(this.props.boundary.slice(1));
      if (el) {
        const boundaryOffset = this.getOffset(el);
        if ((scrollTop + this.state.offsets) <= boundaryOffset.top) {
          const styles = Object.assign({}, this.state.styles);
          styles.top = '0px';
          this.setState({
            styles,
          });
        }
      }
    }
  }

  componentDidMount() {
    const rootNode = ReactDOM.findDOMNode(this);
    const affixedClientHeight = rootNode.children[0].clientHeight;
    const wrapStyle = { height: `${affixedClientHeight}px` };
    const offsets = this.props.boundary ? 0 : this.props.offset;
    this.setState({
      affixedClientHeight,
      wrapStyle,
      offsets,
    });

    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
  }

  render() {
    const affixClass = this.state.affixed ? 'affix' : '';
    return (
      <div className="affix-placeholder" style={this.state.wrapStyle}>
        <div style={this.state.styles} className={affixClass}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Affix.propTypes = {
  offset: React.PropTypes.number,
  onAffix: React.PropTypes.func,
  boundary: React.PropTypes.string,
};

Affix.defaultProps = {
  offset: 0,
  onAffix: () => {},
};

export default Affix;
