import React from 'react';
import classNames from 'classnames';

class TableHeader extends React.Component {
  constructor() {
    super();

    this.state = {
      isChecked: false,
      currentPage: 1,
      isCheckAll: false,
    };
    this.handleToggleCheckAll = this.handleToggleCheckAll.bind(this);
  }

  handleToggleCheckAll() {
    this.setState({
      isChecked: !this.state.isChecked,
    }, this.props.toggleCheckAll(!this.state.isChecked));
  }

  componentWillMount() {
    this.setState({ currentPage: this.props.currentPage });
    const isCheckAll = this.props.getIsCheckAll();
    this.setState({ isCheckAll });
    console.log(isCheckAll);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ currentPage: nextProps.currentPage });
    if (this.props.checkable) {
      const isCheckAll = this.props.getIsCheckAll();
      this.setState({ isCheckAll });
    }
  }

  render() {
    const {
      columns,
      // checkable,
      // showIndex,
      toggleSort,
      sortState,
      currentPage,
    } = this.props;

    return (
      <thead>
        <tr key={`header-${this.state.currentPage}`}>
          {columns.map((column, index) => {
            if (!column.visible) return null;
            if (column.isCheck) {
              return <th key={`check-${currentPage}`}><input type="checkbox" checked={this.state.isCheckAll} onChange={this.handleToggleCheckAll}/></th>;
            }
            if (column.isIndex) {
              return <th key={`index-${currentPage}`}>#</th>;
            }

            let sorterEl = '';
            let sortClass = 'sort';
            if (column.sorter) {
              if (sortState.sortKey === column.field && sortState.reverse) {
                sortClass = 'sort-desc';
              } else if (sortState.sortKey === column.field && !sortState.reverse) {
                sortClass = 'sort-asc';
              }

              sorterEl = <span className={classNames('sort-trigger', { [sortClass]: true })}><i className={`fa fa-${sortClass}`}></i></span>;
            }
            return (
              <th
                key={index} // todo
                className={classNames({ sortable: column.sorter })}
                onClick={toggleSort.bind(this, column)}
              >
                <span>{column.label}</span>
                {sorterEl}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

TableHeader.propTypes = {
  columns: React.PropTypes.array,
  checkable: React.PropTypes.bool,
  showIndex: React.PropTypes.bool,
  toggleSort: React.PropTypes.func,
  sortState: React.PropTypes.object,
  toggleCheckAll: React.PropTypes.func,
  selectedRowKeys: React.PropTypes.array,
  getIsCheckAll: React.PropTypes.func,
  currentPage: React.PropTypes.number,
};

export default TableHeader;
