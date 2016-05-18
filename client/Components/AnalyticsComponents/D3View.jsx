import React from 'react';
import EmotionPieChart from './EmotionPieChart.jsx';
import EmotionBarChart from './EmotionBarChart.jsx';
import Taxonomy from './Taxonomy.jsx';
import BubbleChart from './bubble.jsx';
import RealTimeGraph from './RealTimeGraph.jsx';
import TimeChart from './emotionLineChart.jsx';

export default class D3View extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.methods.connect();
  }

  render() {
    return (
      <div>
        {(() => {
          switch (this.props.view) {
            case 'pie':
              return <EmotionPieChart data={this.props.data.emotions}/>;
            case 'bar':
            return <EmotionBarChart data={this.props.data.emotions}/>;
            case 'bubble':
            return <BubbleChart data={this.props.data.keywords}/>;
            case 'tax':
            return <Taxonomy data={this.props.data.taxonomy}/>;
            case 'RT':
            return <RealTimeGraph data={this.props.data.allEmotions}/>;
            case 'time':
            return <TimeChart data={this.props.data.emotionsTime}/>;
            default:
            return <EmotionPieChart data={this.props.data.emotions}/>;
          }
        })()}
      </div>
    );
  }
}

D3View.propTypes = {
  data: React.PropTypes.object,
  view: React.PropTypes.string,
  methods: React.PropTypes.object,
};
