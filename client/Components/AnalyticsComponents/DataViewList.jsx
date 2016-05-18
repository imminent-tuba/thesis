import React from 'react';
import Paper from 'material-ui/lib/paper';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import LeftNav from 'material-ui/lib/left-nav';
import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

export default class DataViewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle(e) {
    this.setState({ open: !this.state.open });
  }

  render() {

    return (
      <div>
        <RaisedButton
          label="More Graphs"
          onTouchTap={this.handleToggle.bind(this)}
          secondary={true}
          style={{marginTop: 20 }}
        />
        <LeftNav width={250} height={200} openRight={false} open={this.state.open} style={{ marginTop : 7.5}}>
          <AppBar title="Graphs" showMenuIconButton={false}/>

          <MenuItem primaryText="Pie Chart" rightIcon={<img height="27" width="25" src="http://zizaza.com/cache/big_thumb/iconset/581423/581448/PNG/256/business_and_financial/business_financial_pie_chart_business_icon_png_pie_chart_png_pie_chart_icon.png" />}  onClick={() => this.props.handleClick('pie')} />
          <MenuItem primaryText="Bar Chart" rightIcon={<img height="27" width="25" src="http://www.boya-agl.st.ieo.es/boya_agl/images/grafico_t.png" />} onClick={() => this.props.handleClick('bar')} />
          <MenuItem primaryText="Bubble Chart" rightIcon={<img height="27" width="25" src="https://www.miosoft.com/img/Scalable-Graph.png" />} onClick={() => this.props.handleClick('bubble')} />
          <MenuItem primaryText="Taxonomy" rightIcon={<img height="27" width="25" src="http://kamber.com.au/wp-content/uploads/2013/09/1378900097_basic3-137_relations_graph_connections_structure.png" />} onClick={() => this.props.handleClick('tax')} />
          <MenuItem primaryText="Real Time Emotions" rightIcon={<img height="27" width="25" src="http://kamber.com.au/wp-content/uploads/2013/09/1378900097_basic3-137_relations_graph_connections_structure.png" />} onClick={() => this.props.handleClick('RT')} />
          <MenuItem primaryText="Over Time" rightIcon={<img height="27" width="25" src="http://kamber.com.au/wp-content/uploads/2013/09/1378900097_basic3-137_relations_graph_connections_structure.png" />} onClick={() => this.props.handleClick('time')} />
          <RaisedButton
            label="Close"
            onTouchTap={this.handleToggle.bind(this)}
            primary={true}
            style={{ marginTop: 60, display: 'flex'}}
          />
        </LeftNav>
      </div>
    );
  }
}
