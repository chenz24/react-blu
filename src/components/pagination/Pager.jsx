import React from 'react';

class Pager extends React.Component {
  render() {
    const {
      isActive,
      pageNo,
      size,
      handleChangePage,
    } = this.props;
    const activeClass = isActive ? `button is-primary ${size}` : `button ${size}`;

    return (
      <li>
        <a className={activeClass} onClick={handleChangePage}>{pageNo}</a>
      </li>
    );
  }
}

Pager.propTypes = {
  isActive: React.PropTypes.bool,
  pageNo: React.PropTypes.number,
  size: React.PropTypes.string,
  handleChangePage: React.PropTypes.func,
};

export default Pager;
