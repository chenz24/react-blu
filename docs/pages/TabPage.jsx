import React from 'react';
import { Tabs, TabItem } from '../../src';

class TabPage extends React.Component {

  handleSwitchTab(index, tab) {
    console.log(index);
    console.log(tab);
  }

  render() {
    return (
      <div className="content">
        <h2>Tab 标签页</h2>
        <div className="box box-demo">
          <Tabs transition="fadeLeftRight">
            <TabItem label="tab1">content 11111</TabItem>
            <TabItem label="tab2" icon="user">content 222222</TabItem>
            <TabItem label="tab3" disabled={false}>content 333333</TabItem>
          </Tabs>
          <hr />
          <Tabs transition="fade">
            <TabItem label="tab1">content 11111</TabItem>
            <TabItem label="tab2" icon="user">content 222222</TabItem>
            <TabItem label="tab3" disabled={false}>content 333333</TabItem>
          </Tabs>
          <hr />
          <Tabs layout="left">
            <TabItem label="tab1">content 11111</TabItem>
            <TabItem label="tab2" icon="user">content 222222</TabItem>
            <TabItem label="tab3" disabled={false}>content 333333</TabItem>
          </Tabs>
          <hr />
          <Tabs layout="right" onTabClick={this.handleSwitchTab}>
            <TabItem label="tab1">content 11111</TabItem>
            <TabItem label="tab2" icon="user">content 222222</TabItem>
            <TabItem label="tab3">content 333333</TabItem>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default TabPage;
