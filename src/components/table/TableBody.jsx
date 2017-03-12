import React from 'react';
import classNames from 'classnames';

import TableCell from './TableCell';

class TableBody extends React.Component {

  render() {
    const {
      data,
      columns,
      rowClassName,
    } = this.props;

    return (
      <tbody>
      {data.map((row, index) => {
        const key = `key-${index}`;

        let className = '';
        if (rowClassName) {
          className = rowClassName(row, index);
        }
        return (
          <tr key={key} className={classNames(className)}>
            {columns.map((column, cellIndex) => {
              if (!column.visible) return null;
              if (column.isIndex) return <td key={`cell-${index}-${cellIndex}`}>{index + 1}</td>;
              if (column.isCheck) return <td>check</td>;
              return (
                <TableCell key={cellIndex} column={column} row={row}/>
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
};

export default TableBody;
