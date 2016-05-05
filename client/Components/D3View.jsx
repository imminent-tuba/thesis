import React from 'react';
import EmotionPieChart from './EmotionPieChart.jsx';
import BarChart from './BarChart.jsx';
import Taxonomy from './Taxonomy.jsx';


const D3View = ({ view, data, methods }) => {
  D3View.propTypes = {
    data: React.PropTypes.object,
    view: React.PropTypes.string,
    methods: React.PropTypes.object,
  };

  return (
    <div>
      {(() => {
        switch (view) {
          case 'pie': return <EmotionPieChart data={data.emotions} getEmotions={methods.getEmotions} />;
          case 'bar': return <BarChart />;
          case 'tax': return <Taxonomy />;
          default: return <EmotionPieChart data={data.emotions} getEmotions={methods.getEmotions} />;
        }
      })()}
    </div>
  );
};

export default D3View;
