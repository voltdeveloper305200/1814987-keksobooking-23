import { renderAdvertCard} from './card-adverts.js';

const map = L.map('map-canvas');
const addressInput = document.querySelector('#address');

const initMap = (onMapLoad) => {
  map
    .on('load', onMapLoad)
    .setView({
      lat: 35.6895,
      lng: 139.69171,
    }, 10);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  const mainPinIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  const mainPinMarker = L.marker(
    {
      lat: 35.6895,
      lng: 139.69171,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  mainPinMarker.addTo(map);
  mainPinMarker.on('moveend', (evt) => {
    addressInput.value = evt.target.getLatLng();
  });
};

const renderAdMarkers = (adsData) => {
  const icon = L.icon({
    iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  adsData.forEach((ad) => {
    const lattingLat = ad.location.lat;
    const lattingLng = ad.location.lng;
    const marker = L.marker(
      {
        lat: lattingLat,
        lng: lattingLng,
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

export {initMap, renderAdMarkers};

