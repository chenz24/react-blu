import React from 'react';

class TableCell extends React.Component {
  constructor() {
    super();

    this.state = {
      isChecked: false,
    };

    this.handleToggleCheck = this.handleToggleCheck.bind(this);
  }

  handleToggleCheck(row) {
    this.setState({
      isChecked: !this.state.isChecked,
    }, this.props.onCheckChange(!this.state.isChecked, row));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isChecked !== this.state.isChecked) this.setState({ isChecked: nextProps.isChecked });
  }

  componentWillMount() {
    this.setState({ isChecked: this.props.isChecked });
  }

  render() {
    const { row, column, rowIndex, cellIndex, rowKey } = this.props;

    const key = row[rowKey];
    if (column.isIndex) return <td key={`cellIndex-${rowIndex}-${cellIndex}`}>{rowIndex + 1}</td>;
    if (column.isCheck) return <td key={`cellCheck-${key}`}><input type="checkbox" checked={this.state.isChecked} onChange={() => this.handleToggleCheck(row)}/></td>;

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
  rowIndex: React.PropTypes.number,
  cellIndex: React.PropTypes.number,
  onCheckChange: React.PropTypes.func,
  rowKey: React.PropTypes.string,
  isChecked: React.PropTypes.bool,
};

export default TableCell;
