import { renderAdvertCard} from './card-adverts.js';
import {LattingMap} from './constants.js';

const MAP_ZOOM = 12;

const map = L.map('map-canvas');

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: LattingMap.LAT,
    lng: LattingMap.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const initMap = (onMapLoad, onMainPinMoveEnd) => {
  map
    .on('load', onMapLoad)
    .setView({
      lat: LattingMap.LAT,
      lng: LattingMap.LNG,
    }, MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.addTo(map);

  mainPinMarker.on('drag', (evt) => {
    onMainPinMoveEnd(evt.target.getLatLng());
  });
};

const renderAdMarkers = (adsData) => {
  const icon = L.icon({
    iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  adsData.forEach((ad) => {
    const { lat, lng } = ad.location;
    const marker = L.marker(
      {
        lat: lat,
        lng: lng,
      },
      {
        icon,
      },
    );
    marker
      .addTo(map)
      .bindPopup(renderAdvertCard(ad),
        {
          keepInView: true,
        },
      );
  });
};

const resetMap = () => {
  mainPinMarker.setLatLng({
    lat: LattingMap.LAT,
    lng: LattingMap.LNG,
  });

  map.setView({
    lat: LattingMap.LAT,
    lng: LattingMap.LNG,
  }, MAP_ZOOM);
};

export {initMap, renderAdMarkers, resetMap};

