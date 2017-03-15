import React from 'react';
import classNames from 'classnames';

class TableHeader extends React.Component {
  constructor() {
    super();

    this.state = {
      isChecked: false,
    };
    this.handleToggleCheckAll = this.handleToggleCheckAll.bind(this);
  }

  handleToggleCheckAll() {
    this.setState({
      isChecked: !this.state.isChecked,
    }, this.props.toggleCheckAll(!this.state.isChecked));
  }

  render() {
    const {
      columns,
      // checkable,
      // showIndex,
      toggleSort,
      sortState,
    } = this.props;

    return (
      <thead>
        <tr>
          {columns.map((column, index) => {
            if (!column.visible) return null;
            if (column.isCheck) {
              return <th key={`check-${index}`}><input type="checkbox" onChange={this.handleToggleCheckAll}/></th>;
            }
            if (column.isIndex) {
              return <th key={`index-${index}`}>#</th>;
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
};

export default TableHeader;
