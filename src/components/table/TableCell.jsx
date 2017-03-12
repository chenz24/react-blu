import React from 'react';

class TableCell extends React.Component {

  render() {
    const { row, column } = this.props;
    console.log(column.template);

    let content = row[column.field];
    if (column.template) {
      content = column.template(row);
    }

    let style = {};
    if (column.style) {
      style = column.style(row[column.field]);
    }
    return (
      <td style={style}>
        {content}
      </td>
    );
  }
}

TableCell.propTypes = {
  row: React.PropTypes.object,
  column: React.PropTypes.object,
};

export default TableCell;
