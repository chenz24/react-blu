import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import sortBy from 'lodash/sortBy';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

class DataTable extends React.Component {
  constructor() {
    super();

    this.state = {
      cols: [],
      sortState: {
        sortKey: '',
        reverse: '',
      },
      pagination: {},
      data: [],
      showData: [],
    };

    this.handleInitColumns = this.handleInitColumns.bind(this);
    this.handleToggleSort = this.handleToggleSort.bind(this);
    this.handleReorganizeData = this.handleReorganizeData.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  handleInitColumns() {
    const columns = this.props.columns;
    const node = ReactDOM.findDOMNode(this);
    let width = node.offsetWidth;
    let length = columns.length;
    const cols = [];
    const column = {};

    if (this.props.checkable) {
      column.width = 40;
      column.isCheck = true;
      column.visible = true;
      width -= 40;
      cols.push(column);
    }
    if (this.props.showIndex) {
      column.width = 40;
      column.isIndex = true;
      column.visible = true;
      width -= 40;
      cols.push(column);
    }

    columns.forEach(col => {
      if (col.width) {
        width -= col.width;
        length -= 1;
      }
    });
    const avgWidth = Math.floor(width / length);

    columns.forEach(col => {
      if (!col.width) {
        const columnWidth = this.props.height ? avgWidth : '';
        col.width = columnWidth;
      }
      if (typeof col.visible === 'undefined') col.visible = true;
      cols.push(col);
    });

    this.setState({ cols });
  }

  handleReorganizeData() {
    if (this.state.pagination.total) {
      const current = this.state.pagination.current || 1;
      const pageSize = this.state.pagination.pageSize || 10;

      if (this.state.data.length <= pageSize) {
        this.setState({
          showData: this.state.data,
        });
      } else {
        const start = (current - 1) * pageSize;
        const end = parseInt(start, 10) + parseInt(pageSize, 10);
        const showData = this.state.data.slice(start, end);
        this.setState({
          showData,
        });
      }
    } else {
      this.setState({
        showData: this.state.data,
      });
    }
  }

  handleToggleSort(column) {
    if (!column.sorter || !column.field) return;
    const sortState = {
      sortKey: column.field,
      reverse: !this.state.sortState.reverse,
    };
    if (isFunction(column.sorter) || column.sorter === 'custom') {
      this.state.data = sortBy(this.state.data, column.field);
      if (sortState.reverse) this.state.data.reverse();
    }
    this.setState({ sortState });
    this.handleTableChange();
  }

  handleTableChange() {
    this.handleReorganizeData();
  }

  componentWillMount() {
    this.state.pagination = this.props.pagination;
    this.state.data = this.props.data;
    this.handleReorganizeData();
  }

  componentDidMount() {
    this.handleInitColumns();
  }

  render() {
    const {
      bordered,
      striped,
      narrow,
      height,
      checkable,
      showIndex,
      rowClassName,
    } = this.props;

    const tableStyle = this.props.height ? { height: `${this.props.height}px`, overflow: 'scroll' } : null;

    return (
      <div className="data-table-container">

        <div className="data-table-main" style={tableStyle}>
          <table className={classNames('table data-table', { 'is-bordered': bordered, 'is-striped': striped, 'is-narrow': narrow })}>
            <colgroup>
              {this.state.cols.map((col, index) => <col width={col.width} key={`cols-${index}`}/>)}
            </colgroup>
            {height ? null : <TableHeader checkable={checkable} sortState={this.state.sortState} columns={this.state.cols} showIndex={showIndex} toggleSort={this.handleToggleSort}/>}
            <TableBody data={this.state.showData} columns={this.state.cols} rowClassName={rowClassName} />
          </table>
        </div>
      </div>
    );
  }
}

DataTable.propTypes = {
  data: React.PropTypes.array,
  columns: React.PropTypes.array,
  onChange: React.PropTypes.func,
  height: React.PropTypes.number,
  checkable: React.PropTypes.bool,
  showIndex: React.PropTypes.bool,
  bordered: React.PropTypes.bool,
  striped: React.PropTypes.bool,
  narrow: React.PropTypes.bool,
  pagination: React.PropTypes.object,
  rowClassName: React.PropTypes.func,
};

DataTable.defaultProps = {
  pagination: { current: 1 },
};

export default DataTable;
