import React from 'react';
import { Tag, Notify } from '../../src';

class TagPage extends React.Component {

  handleOnClose() {
    Notify.danger({
      content: '已删除！',
    });
  }

  render() {
    return (
      <div className="content">
        <h2>Tag 标签</h2>
        <div className="box box-demo">
          <Tag>标签测试</Tag>&nbsp;&nbsp;<Tag type="success">标签测试</Tag>
          <hr />
          <Tag type="primary" closable={true}>标签</Tag>
          <hr />
          <Tag type="primary" closable={true} size="medium" onClose={this.handleOnClose}>测试</Tag>
          &nbsp;&nbsp;<Tag type="success" size="large">标签测试</Tag>
          &nbsp;&nbsp;<Tag type="success" size="medium" rounded={true}>标签测试</Tag>
        </div>
      </div>
    );
  }
}

export default TagPage;
