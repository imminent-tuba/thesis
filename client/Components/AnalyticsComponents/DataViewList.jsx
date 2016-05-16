import React from 'react';
import Paper from 'material-ui/lib/paper';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class DataViewList extends React.Component {

  render() {
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
        width: '75%',
        height: '100%',
        display: 'inline-block',
        margin: '16px 32px 16px 0',
        pointerEvents: 'auto',
      },
      rightIcon: {
        textAlign: 'center',
        lineHeight: '24px',
      },
    };

    return (
      <Paper style={style.menu} zDepth={5}>
        <Menu>
          <MenuItem primaryText="Pie Chart" rightIcon={<img height="27" width="25" src="http://zizaza.com/cache/big_thumb/iconset/581423/581448/PNG/256/business_and_financial/business_financial_pie_chart_business_icon_png_pie_chart_png_pie_chart_icon.png" />}  onClick={() => this.props.handleClick('pie')} />
          <MenuItem primaryText="Bar Chart" rightIcon={<img height="27" width="25" src="http://www.boya-agl.st.ieo.es/boya_agl/images/grafico_t.png" />} onClick={() => this.props.handleClick('bar')} />
          <MenuItem primaryText="Bubble Chart" rightIcon={<img height="27" width="25" src="https://www.miosoft.com/img/Scalable-Graph.png" />} onClick={() => this.props.handleClick('bubble')} />
          <MenuItem primaryText="Taxonomy" rightIcon={<img height="27" width="25" src="http://kamber.com.au/wp-content/uploads/2013/09/1378900097_basic3-137_relations_graph_connections_structure.png" />} onClick={() => this.props.handleClick('tax')} />
          <MenuItem primaryText="Real Time Emotions" rightIcon={<img height="27" width="25" src="http://kamber.com.au/wp-content/uploads/2013/09/1378900097_basic3-137_relations_graph_connections_structure.png" />} onClick={() => this.props.handleClick('realTime')} />
          <MenuItem primaryText="Over Time" rightIcon={<img height="27" width="25" src="http://kamber.com.au/wp-content/uploads/2013/09/1378900097_basic3-137_relations_graph_connections_structure.png" />} onClick={() => this.props.handleClick('time')} />
        </Menu>
      </Paper>
    );
  }
}
