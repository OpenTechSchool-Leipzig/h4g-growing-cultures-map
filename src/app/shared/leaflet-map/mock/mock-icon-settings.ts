import * as L from 'leaflet';
export const iconRetinaUrl = 'assets/icons/marker-icon-2x-green.png';
export const iconUrl = 'assets/icons/marker-icon-green.png';
export const shadowUrl = 'assets/icons/marker-shadow.png';

export const  userIcon = L.icon({
    iconUrl: 'assets/icons/marker-icon-2x.png',
    shadowUrl: 'assets/icons/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});
