import React from 'react';
import { Affix } from '../../src';

class AffixPage extends React.Component {

  handleOnAffix(status) {
    console.log(status);
  }

  render() {
    return (
      <div className="content" style={{ height: '10000px' }}>
        <h2>Affix 固钉</h2>
        <div className="box box-demo">
          <Affix>
            <button className="button is-primary">固定在顶部</button>
          </Affix>
          <hr />
          <Affix offset={200}>
            <button className="button is-primary">固定在距离顶部200px</button>
          </Affix>
          <hr />
          <div className="box" style={{ height: '200px', textAlign: 'center' }} id="parent">
            <Affix boundary="#parent">
              <button className="button is-primary">固定在某个容器内</button>
            </Affix>
          </div>
          <hr />
          <Affix onAffix={this.handleOnAffix}>
            <button className="button is-primary">触发回调</button>
          </Affix>
        </div>
      </div>
    );
  }
}

export default AffixPage;
