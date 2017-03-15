import React from 'react';
import shortid from 'shortid';
import Pager from './Pager';

class Pagination extends React.Component {
  constructor() {
    super();

    this.state = {
      current: 1,
      pageSize: 10,
      totalPage: 1,
    };

    this.uniqueKey = shortid.generate();

    this.hasPrev = this.hasPrev.bind(this);
    this.hasNext = this.hasNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleJumpPrev = this.handleJumpPrev.bind(this);
    this.handleJumpNext = this.handleJumpNext.bind(this);
  }

  calcTotalPage() {
    const totalPage = Math.floor((this.props.total - 1) / this.state.pageSize) + 1;
    this.setState({ totalPage });
  }

  hasPrev() {
    return this.state.current > 1;
  }

  hasNext() {
    return this.state.current < this.state.totalPage;
  }

  handlePrev() {
    this.handleChangePage(this.state.current - 1);
  }

  handleNext() {
    this.handleChangePage(this.state.current + 1);
  }

  handleJumpPrev() {
    this.handleChangePage(Math.max(1, this.state.current - 5));
  }

  handleJumpNext() {
    this.handleChangePage(Math.min(this.state.totalPage, this.state.current + 5));
  }

  handleChangePage(p) {
    if (p !== this.state.current) {
      this.setState({
        current: p,
      });
      this.props.onChange(p);
    }
  }

  handlePageSizeChange(e) {
    const pageSize = e.target.value;
    this.state.pageSize = pageSize;
    const totalPage = this.calcTotalPage();
    this.state.totalPage = totalPage;
    if (this.state.current > totalPage) {
      this.handleChangePage(totalPage);
    }
    this.props.onPageSizeChange(this.state.current, pageSize);
  }

  handleQuickJumper(e) {
    let page = e.target.value;
    page = Number(page);
    if (!page || isNaN(page)) return;

    if (e.keyCode === 13) {
      this.handleChangePage(page);
    }
  }

  componentWillMount() {
    this.sizeClass = this.props.size === 'small' ? 'is-small' : '';
    this.alignClass = this.props.align ? `is-${this.props.align}` : '';

    this.calcTotalPage();
  }

  componentDidMount() {
    this.handleChangePage(this.state.current);
  }

  render() {
    const sizeClass = this.sizeClass;
    const alignClass = this.alignClass;
    const pagerList = [];
    let pager = null;
    let total = null;
    let sizer = null;
    let jumper = null;
    let prevPager = null;
    let nextPager = null;
    let firstPager = null;
    let lastPager = null;
    const current = this.state.current;

    if (this.props.simple) {
      const prevClass = this.hasPrev() ? `button ${sizeClass}` : `button is-disabled ${sizeClass}`;
      const nextClass = this.hasNext() ? `button ${sizeClass}` : `button is-disabled ${sizeClass}`;
      pager = (
        <ul key={`${this.uniqueKey}-simple-ul`}>
          <li><a className={prevClass} onClick={this.handlePrev}><i className="fa fa-angle-left"></i></a></li>
          <li><input className={`input ${sizeClass}`} value={current} type="number" min="1" onKeyUp={this.handleQuickJumper}/></li>
          <li>/ {this.props.total}</li>
          <li><a className={nextClass} onClick={this.handleNext}><i className="fa fa-angle-right"></i></a></li>
        </ul>
      );
    } else {
      if (this.state.totalPage <= 6) {
        for (let i = 1; i <= this.state.totalPage; i++) {
          const active = current === i;
          pagerList.push(
            <Pager key={`${this.uniqueKey}-pager-${i}`} pageNo={i} isActive={active} size={sizeClass} handleChangePage={this.handleChangePage.bind(this, i)}/>,
          );
        }
      } else {
        prevPager = (
          <li className="btn-jumper" key={`${this.uniqueKey}-prevPager`}>
            <a className={`button is-primary is-inverted ${sizeClass}`} onClick={this.handleJumpPrev}><i className="fa fa-angle-double-left"></i></a>
          </li>
        );
        nextPager = (
          <li className="btn-jumper" key={`${this.uniqueKey}-nextPager`}>
            <a className={`button is-primary is-inverted ${sizeClass}`} onClick={this.handleJumpNext}><i className="fa fa-angle-double-right"></i></a>
          </li>
        );
        firstPager = (
          <Pager active={false} size={sizeClass} pageNo={1} key={`${this.uniqueKey}-firstPager`} handleChangePage={this.handleChangePage.bind(this, 1)}/>
        );
        lastPager = (
          <Pager active={false} size={sizeClass} pageNo={this.state.totalPage} key={`${this.uniqueKey}-lastPager`} handleChangePage={this.handleChangePage.bind(this, this.state.totalPage)}/>
        );

        let left = Math.max(1, current - 2);
        let right = Math.min(current + 2, this.state.totalPage);

        if (current - 1 <= 2) {
          right = 1 + 4;
        }

        if (this.state.totalPage - current <= 2) {
          left = this.state.totalPage - 4;
        }

        for (let i = left; i <= right; i++) {
          const active = current === i;
          pagerList.push(
            <Pager key={`${this.uniqueKey}-pager-${i}`} pageNo={i} size={sizeClass} isActive={active} handleChangePage={this.handleChangePage.bind(this, i)}/>,
          );
        }

        if (current - 1 >= 4) {
          pagerList.unshift(prevPager);
        }
        if (this.state.totalPage - current >= 4) {
          pagerList.push(nextPager);
        }

        if (left !== 1) {
          pagerList.unshift(firstPager);
        }
        if (right !== this.state.totalPage) {
          pagerList.push(lastPager);
        }
      }

      total = <span key={`${this.uniqueKey}-total`}>共 {this.props.total} 条</span>;
      jumper = (
        <span key={`${this.uniqueKey}-jumper`}>跳转到 <input className={`input ${sizeClass}`} type="number" min="1" onKeyUp={this.handleQuickJumper}/></span>
      );
      sizer = (
        <span className={`select ${sizeClass}`} key={`${this.uniqueKey}-pageSize`}>
          <select onChange={this.handlePageSizeChange} name="pagesize" value={this.state.pageSize}>
            {this.props.sizeOptions.map((option, index) => <option value={option} key={`page-option-${index}`}>{option} 条/页</option>)}
          </select>
        </span>
      );

      const prevClass = this.hasPrev() ? `button ${sizeClass}` : `button is-disabled ${sizeClass}`;
      const nextClass = this.hasNext() ? `button ${sizeClass}` : `button is-disabled ${sizeClass}`;
      pager = (
        <ul key={`${this.uniqueKey}-pager`}>
          <li><a className={prevClass} onClick={this.handlePrev}><i className="fa fa-angle-left"></i></a></li>
          {pagerList.map(page => page)}
          <li><a className={nextClass} onClick={this.handleNext}><i className="fa fa-angle-right"></i></a></li>
        </ul>
      );
    }

    const items = {
      total, sizer, pager, jumper,
    };
    const components = this.props.layout.split(',');

    return (
      <nav className={`pagination ${sizeClass} ${alignClass}`}>
        {components.map(item => items[item.trim()])}
      </nav>
    );
  }
}

Pagination.propTypes = {
  pageSize: React.PropTypes.number,
  current: React.PropTypes.number,
  total: React.PropTypes.number,
  onChange: React.PropTypes.func,
  onPageSizeChange: React.PropTypes.func,
  simple: React.PropTypes.bool,
  sizeOptions: React.PropTypes.array,
  align: React.PropTypes.string,
  size: React.PropTypes.string,
  layout: React.PropTypes.string,
};

Pagination.defaultProps = {
  pageSize: 10,
  current: 1,
  onChange: () => {},
  onPageSizeChange: () => {},
  sizeOptions: [10, 20, 30, 40, 50],
  layout: 'total, pager, sizer, jumper',
};

export default Pagination;
