import React from 'react';
import { Tooltip } from '../../src';

class TagPage extends React.Component {

  render() {
    return (
      <div className="content">
        <h2>Tooltip 提示工具</h2>
        <div className="box box-demo">
          <Tooltip content="are you ready" always={true} placement="bottom">
            <button className="button is-primary">tooltip</button>
          </Tooltip>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Tooltip content="are you ready" placement="top">
            <button className="button is-primary">tooltip</button>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default TagPage;
