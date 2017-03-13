import React from 'react';
import { Pagination } from '../../src';

class PaginationPage extends React.Component {

  render() {
    return (
      <div className="content">
        <h2>Pagination 分页</h2>
        <div className="box box-demo">
          <Pagination total={400} />
          <hr />
          <Pagination total={800} simple={true} align="right"/>
        </div>
      </div>
    );
  }
}

export default PaginationPage;
