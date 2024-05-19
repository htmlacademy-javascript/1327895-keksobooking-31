// import { generateDataPopup } from './data.js';
import { generatePopup } from './generation-template.js';

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

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
  iconUrl:configIcon.url,
  iconSize: [configIcon.width, configIcon.height],
  iconAnchor: [configIcon.anchorX, configIcon.anchorY],
});

const pinMainIcon = L.icon({
  iconUrl:configMainIcon.url,
  iconSize: [configMainIcon.width, configMainIcon.height],
  iconAnchor: [configMainIcon.anchorX, configMainIcon.anchorY],
});

const adFormAddress = document.querySelector('#address');

const renderMap = (points, onMapLoad) => {
  const map = L.map('map-canvas')
    .on('load', () => {
      onMapLoad();
    })
    .setView(TOKIO_CENTER, ZOOM);

  L.tileLayer(TILE_LAYER, {
    attribution: COPYRIGHT,
  }).addTo(map);

  points.forEach((data) => {
    const pinMarker = L.marker({
      lat: data.location.lat,
      lng: data.location.lng,
    },
    {
      draggable: false,
      icon: pinIcon,
    });

    // pinMarker.on('moveend', (evt) => {
    //   console.log(evt.target.getLatLng());
    // });

    const popup = generatePopup(data);
    pinMarker.addTo(map).bindPopup(popup);
  });

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

  mainPinMarker.on('moveend', (evt) => {
    const coords = evt.target.getLatLng();
    adFormAddress.value = `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`;
  });

  mainPinMarker.addTo(map);
};

export { renderMap, adFormAddress };

