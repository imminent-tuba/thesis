import React from 'react';

import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Divider from 'material-ui/lib/divider';
import FontIcon from 'material-ui/lib/font-icon';
import ContentCopy from 'material-ui/lib/svg-icons/content/content-copy';
import ContentLink from 'material-ui/lib/svg-icons/content/link';
import Delete from 'material-ui/lib/svg-icons/action/delete';
import Download from 'material-ui/lib/svg-icons/file/file-download';
import PersonAdd from 'material-ui/lib/svg-icons/social/person-add';
import RemoveRedEye from 'material-ui/lib/svg-icons/image/remove-red-eye';


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
          <MenuItem primaryText="Graph" leftIcon={<RemoveRedEye />} />
          <MenuItem primaryText="Bar Chart" leftIcon={<PersonAdd />} />
          <MenuItem primaryText="Taxonomy" leftIcon={<ContentLink />} />
        </Menu>

    </div>
    )
  }
}
