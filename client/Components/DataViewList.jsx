import React from 'react';

import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class DataViewList extends React.Component {
  constructor() {
    super();
  }
  render () {
    const style = {
      menu: {
        animated: true,
        autoWidth: true,
        desktop: true,
        marginRight: 32,
        marginBottom: 32,
        float: 'left',
        position: 'relative',
        zIndex: 0,
      },
      rightIcon: {
        textAlign: 'center',
        lineHeight: '24px',
      },
    };

    return (
      <div>
        <Menu style={style.menu}>
          <MenuItem primaryText="Pie Chart" onClick={() => this.props.handleClick('pie')} />
          <MenuItem primaryText="Bar Chart" onClick={() => this.props.handleClick('bar')} />
          <MenuItem primaryText="Taxonomy" onClick={() => this.props.handleClick('tax')} />
        </Menu>
    </div>
    )
  }
}
