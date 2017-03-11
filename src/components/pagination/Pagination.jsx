import React from 'react';

class Pagination extends React.Component {
  constructor() {
    super();
  }

  render() {
    if (this.simple) {

    }
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
