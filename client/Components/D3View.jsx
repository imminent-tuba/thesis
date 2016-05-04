import React from 'react';
import EmotionPieChart from './EmotionPieChart.jsx';
import BarChart from './BarChart.jsx';
import Taxonomy from './Taxonomy.jsx';


const D3View = ({ view, emotions }) => {
  D3View.propTypes = {
    view: React.PropTypes.string,
    emotions: React.PropTypes.object,
  };

  return (
    <div>
      {(() => {
        switch (view) {
          case 'pie': return <EmotionPieChart data={emotions}/>;
          case 'bar': return <BarChart />;
          case 'tax': return <Taxonomy />;
          default: return <EmotionPieChart data={emotions} />;
        }
      })()}
    </div>
  );
};

export default D3View;
