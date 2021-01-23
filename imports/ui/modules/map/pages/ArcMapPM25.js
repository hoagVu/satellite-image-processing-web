import React from 'react';
import ReactDOM from 'react-dom';

import { Map } from '@esri/react-arcgis';
import MyFeatureLayer from '../components/MapLayer';
import './styles.css';
const ArcMap = (props) => {
  const [mapState, setMapState] = React.useState({ view: null, map: null });

  const handleMapLoad = React.useCallback((map, view) => {
    setMapState({ map, view });
  }, []);
  return (
    <div style={{ height: 590 }}>
      <MyFeatureLayer
        featureLayerProperties={{
          url: 'http://113.175.118.161:6080/arcgis/rest/services/PM25_MYD/MapServer',
          featureUrl: 'http://113.175.118.161:6080/arcgis/rest/services/PM25_MYD/MapServer/0',
        }}
        mapState={mapState}
      ></MyFeatureLayer>
    </div>
  );
};
export default ArcMap;
