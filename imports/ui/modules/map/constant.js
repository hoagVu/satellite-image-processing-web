import L from 'leaflet';
import { appToken, URL_CONFIG, hereCredentials } from '../../constants';

export const hereIsolineUrl = (coords, options) =>
  `https://isoline.route.api.here.com/routing/7.2/calculateisoline.json?app_id=${hereCredentials.id}&app_code=${hereCredentials.code}&mode=shortest;${options.mode};traffic:${options.traffic}&start=geo!${coords[0]},${coords[1]}&range=${options.range}&rangetype=${options.type}`;

export const hereTileUrl = (style) =>
  `https://2.base.maps.api.here.com/maptile/2.1/maptile/newest/${style}/{z}/{x}/{y}/512/png8?app_id=${hereCredentials.id}&app_code=${hereCredentials.code}&ppi=320`;

export const maxIsolineRangeLookup = {
  time: 20000,
  distance: 400000,
};

export const defaultMapProperty = {
  fullscreenControl: true,
  center: [18.35452552912665, 105.73242187500001],
  zoom: 6,
  scrollWheelZoom: true,
  zoomControl: false,
  maxZoom: 9,
  minZoom: 6,
  style: { height: 675, width: '100%' }, //660 || 880
};

export const defaultTimeDimensionProperty = {
  step: 10,
  min: 10,
  max: 90,
  defaultValue: 10,
};

export const defaultWindDirectionProperty = {
  url: 'https://HoangVuViet.github.io/tif/wind_direction.tif',
  options: {
    band: 0,
    name: 'Wind direction',
    arrowSize: 40,
  },
};

export const defaultWindSpeedProperty = {
  url: 'https://HoangVuViet.github.io/tif/PM25_20170101_3km.tif',
  options: {
    band: 0,
    displayMin: 0,
    displayMax: 30,
    name: 'Wind speed',
    colorScale: 'rainbow',
    clampLow: false,
    clampHigh: true,
    //vector:true
  },
};

export const style = (feature) => {
  return {
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.1,
    // fillColor: getColor(feature && feature.properties.density),
  };
};

export const getLegend = (
  title = `Tốc độ, km/h`,
  progress = `<div>5</div><div>10</div><div>20</div><div>40</div> <div>60</div> <div>80</div> <div>100</div>`,
  colorT = `<div class="horizontal-gradient-line" style=" width: 260px; background: linear-gradient(to left, rgb(158, 128, 177), rgba(116, 76, 172, 0.9), rgb(164, 123, 170), rgba(170, 128, 177, 0.84), rgba(176, 128, 177, 0.71), rgba(170, 128, 177, 0.54), rgba(170, 128, 177, 0.44), rgba(255, 255, 0, 0) ); " ></div>`,
) => {
  return `<div class="leaflet-control-color-scale leaflet-control" style=" display: block; background: none; box-shadow: none; border-width: 0px; margin-right: -1px; width: 345px; height: 20px; "  > <div class="leaflet-control-color-scale-line" style="background-image: none; position: relative; border-width: 0px; margin: 0px" > <div class="scale-details"> <div>${title}</div> <div class="scale-gradient" style="width: 260px"> <div class="scale-dividers"> ${progress} </div> ${colorT} </div> </div> </div>  </div>`;
};

export default L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
});

export const defaultGeoUrl = {
  url: [
    'https://HoangVuViet.github.io/pm2.5/tif/2017/PM25_20171108_3km.tif',
    'https://HoangVuViet.github.io/pm2.5/tif/2017/PM25_20171109_3km.tif',
    'https://HoangVuViet.github.io/pm2.5/tif/2017/PM25_20171110_3km.tif',
    'https://HoangVuViet.github.io/pm2.5/tif/2017/PM25_20171111_3km.tif',
    'https://HoangVuViet.github.io/pm2.5/tif/2017/PM25_20171112_3km.tif',
    'https://HoangVuViet.github.io/pm2.5/tif/2017/PM25_20171113_3km.tif',
    'https://HoangVuViet.github.io/pm2.5/tif/2017/PM25_20171114_3km.tif',
    'https://HoangVuViet.github.io/pm2.5/tif/2017/PM25_20171115_3km.tif',
    'https://HoangVuViet.github.io/pm2.5/tif/2017/PM25_20171116_3km.tif',
  ],
  time: [
    '03/12/2017',
    '04/12/2017',
    '05/12/2017',
    '06/12/2017',
    '07/12/2017',
    '08/12/2017',
    '09/12/2017',
    '10/12/2017',
    '11/12/2017',
  ],
};

export const windUrl = '../../../../../json/wind.json';
