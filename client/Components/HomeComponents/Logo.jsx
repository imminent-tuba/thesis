import React from 'react';
import SvgIcon from 'material-ui/lib/svg-icon';
import Icon from '../../resources/bot.svg';


const Logo = (props) => (
  <SvgIcon {...props}>
    {Icon}
  </SvgIcon>
);

export default Logo;
