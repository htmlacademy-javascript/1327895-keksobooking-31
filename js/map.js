// import { generateDataPopup } from './data.js';
import { generatePopup } from './generation-template.js';

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const MAX_COUNT_ADVERTISEMENT = 10;
const ZOOM = 10;

const TOKIO_CENTER = {
  lat: 35.6895,
  lng: 139.692,
};

const configMainIcon = {
  url: './img/main-pin.svg',
  width: 52,
  height: 52,
  anchorX: 26,
  anchorY: 52,
};

const configIcon = {
  url: './img/pin.svg',
  width: 40,
  height: 40,
  anchorX: 26,
  anchorY: 52,
};

const pinIcon = L.icon({
  iconUrl: configIcon.url,
  iconSize: [configIcon.width, configIcon.height],
  iconAnchor: [configIcon.anchorX, configIcon.anchorY],
});

const pinMainIcon = L.icon({
  iconUrl: configMainIcon.url,
  iconSize: [configMainIcon.width, configMainIcon.height],
  iconAnchor: [configMainIcon.anchorX, configMainIcon.anchorY],
});

const pinMarker = (location) => (
  L.marker(location, {
    draggable: false,
    icon: pinIcon,
  })
);

const mainPinMarker = L.marker(
  {
    lat: TOKIO_CENTER.lat,
    lng: TOKIO_CENTER.lng,
  },
  {
    draggable: true,
    icon: pinMainIcon,
  }
);

const adFormAddress = document.querySelector('#address');
const map = L.map('map-canvas');
let initialPoints = [];

const renderMap = (points, onMapLoad) => {
  map
    .on('load', () => {
      onMapLoad();
    })
    .setView(TOKIO_CENTER, ZOOM);

  L.tileLayer(TILE_LAYER, {
    attribution: COPYRIGHT,
  }).addTo(map);

  initialPoints = points.slice(0, MAX_COUNT_ADVERTISEMENT);

  initialPoints.forEach((data) => {
    const pinMarkerInstance = pinMarker({
      lat: data.location.lat,
      lng: data.location.lng,
    });

    const popup = generatePopup(data);
    pinMarkerInstance.addTo(map).bindPopup(popup);
  });

  adFormAddress.value = `${Object.values(TOKIO_CENTER)[0].toFixed(5)}, ${Object.values(TOKIO_CENTER)[1].toFixed(5)}`;

  mainPinMarker.on('moveend', (evt) => {
    const coords = evt.target.getLatLng();
    adFormAddress.value = `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`;
  });

  mainPinMarker.addTo(map);
};

const resetPinMarker = (address) => {
  map.setView(TOKIO_CENTER, ZOOM);
  mainPinMarker.setLatLng(TOKIO_CENTER);
  address.value = `${Object.values(TOKIO_CENTER)[0].toFixed(5)}, ${Object.values(TOKIO_CENTER)[1].toFixed(5)}`;
};

const closePopup = () => {
  map.closePopup();
};

const updatePointsMarkers = (points) => {
  const markerGroup = L.layerGroup().addTo(map);
  markerGroup.clearLayers();
  points.slice(0, MAX_COUNT_ADVERTISEMENT).forEach((point) => {
    const popup = generatePopup(point);
    const currentPinMarker = pinMarker({
      lat: point.location.lat,
      lng: point.location.lng,
    });
    currentPinMarker.addTo(markerGroup).bindPopup(popup);
  });
};

export { renderMap, adFormAddress, resetPinMarker, closePopup, updatePointsMarkers };
