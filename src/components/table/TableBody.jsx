import React from 'react';
import classNames from 'classnames';

import TableCell from './TableCell';

class TableBody extends React.Component {

  render() {
    const {
      data,
      columns,
      rowClassName,
      rowKey,
      selectedRowKeys,
    } = this.props;

    return (
      <tbody>
      {data.map((row, index) => {
        const key = row[rowKey];
        let className = '';
        if (rowClassName) {
          className = rowClassName(row, index);
        }
        return (
          <tr key={`tr-${key}`} className={classNames(className)}>
            {columns.map((column, cellIndex) => {
              if (!column.visible) return null;
              let isChecked = false;
              if (column.isCheck && selectedRowKeys.indexOf(key) >= 0) isChecked = true;
              return (
                <TableCell
                  key={`cell-${index}-${cellIndex}`}
                  column={column}
                  row={row}
                  rowIndex={index}
                  cellIndex={cellIndex}
                  rowKey={rowKey}
                  onCheckChange={this.props.onCheckChange}
                  isChecked={isChecked}
                />
              );
            })}
          </tr>
        );
      })}
      </tbody>
    );
  }
}

TableBody.propTypes = {
  data: React.PropTypes.array,
  columns: React.PropTypes.array,
  checkable: React.PropTypes.bool,
  showIndex: React.PropTypes.bool,
  rowClassName: React.PropTypes.func,
  onCheckChange: React.PropTypes.func,
  rowKey: React.PropTypes.string,
  selectedRowKeys: React.PropTypes.array,
};

export default TableBody;
