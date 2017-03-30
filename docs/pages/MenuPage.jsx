import React from 'react';
import { Menus, Menu } from '../../src';

class MenuPage extends React.Component {
  constructor() {
    super();

    this.menus = [{
      label: 'navigation',
      items: [{
        label: '菜单一',
        icon: 'facebook',
      }, {
        label: '菜单二',
        icon: '500px',
      }, {
        label: '子目录一',
        isSub: true,
        icon: 'google',
        items: [{
          label: '子菜单二',
        }, {
          label: '子菜单三',
        }, {
          label: '子菜单四',
          type: 'float',
          isSub: true,
          items: [{
            label: '子子菜单一',
          }, {
            label: '子子菜单二',
          }],
        }],
      }],
    }];
  }

  generateMenu(menus) {
    if (!Array.isArray(menus)) menus = [menus];
    return menus.map(menu => (
      <Menus label={menu.label} key={menu.label} isSub={menu.isSub} icon={menu.icon} type={menu.type}>
        {menu.items.map(item => (item.isSub ? this.generateMenu(item) : <Menu icon={item.icon} key={item.label}>{item.label}</Menu>))}
      </Menus>
    ));
  }

  render() {
    const menuEl = this.generateMenu(this.menus);
    return (
      <div className="">
        <h2>Menu 菜单</h2>
        <div className="box box-demo">
          <div className="columns">
            <div className="column is-3">
              <div className="menu">
                <Menus label="navigation">
                  <Menu icon="facebook">菜单一</Menu>
                  <Menu icon="500px">菜单二</Menu>
                  <Menus label="子目录一" isSub={true} icon="google">
                    <Menu>子菜单二</Menu>
                    <Menu>子菜单三</Menu>
                    <Menus type="float" isSub={true} label="子菜单四">
                      <Menu>子子菜单一</Menu>
                      <Menu>子子菜单一</Menu>
                    </Menus>
                  </Menus>
                </Menus>
              </div>
              <hr />
              <div className="menu">
                {menuEl}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuPage;
