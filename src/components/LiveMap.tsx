import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const busIcon = new L.DivIcon({
  html: `<div style="background:#ffc528;width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;box-shadow:0 0 12px rgba(255,197,40,0.5)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#040707" stroke-width="2.5"><path d="M8 6v6m8-6v6M5 11h14M6 18h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z"/><circle cx="7.5" cy="18.5" r="1.5"/><circle cx="16.5" cy="18.5" r="1.5"/></svg></div>`,
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const workerIcon = new L.DivIcon({
  html: `<div style="background:#22c55e;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 0 8px rgba(34,197,94,0.5)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/></svg></div>`,
  className: "",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const mockBuses = [
  { id: 1, name: "Bus A-01", lat: 30.0444, lng: 31.2357, status: "On Time" },
  { id: 2, name: "Bus A-02", lat: 30.0555, lng: 31.2480, status: "Delayed" },
  { id: 3, name: "Bus B-01", lat: 30.0380, lng: 31.2200, status: "On Time" },
];

const mockWorkers = [
  { id: 1, name: "Ahmed", lat: 30.0460, lng: 31.2400 },
  { id: 2, name: "Mona", lat: 30.0510, lng: 31.2450 },
  { id: 3, name: "Karim", lat: 30.0400, lng: 31.2300 },
];

const routeCoords: [number, number][] = [
  [30.0380, 31.2200], [30.0400, 31.2300], [30.0444, 31.2357], [30.0510, 31.2450], [30.0555, 31.2480],
];

interface Props {
  showWorkers?: boolean;
  showBuses?: boolean;
  height?: string;
}

const LiveMap = ({ showWorkers = true, showBuses = true, height = "h-[400px] lg:h-[500px]" }: Props) => {
  return (
    <div className={`${height} rounded-xl overflow-hidden border border-border/30 relative`}>
      <MapContainer
        center={[30.0444, 31.2357]}
        zoom={13}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />
        {showBuses && mockBuses.map((bus) => (
          <Marker key={bus.id} position={[bus.lat, bus.lng]} icon={busIcon}>
            <Popup>
              <div className="text-sm">
                <strong>{bus.name}</strong>
                <br />Status: {bus.status}
              </div>
            </Popup>
          </Marker>
        ))}
        {showWorkers && mockWorkers.map((w) => (
          <Marker key={w.id} position={[w.lat, w.lng]} icon={workerIcon}>
            <Popup><strong>{w.name}</strong></Popup>
          </Marker>
        ))}
        <Polyline positions={routeCoords} pathOptions={{ color: "#ffc528", weight: 3, opacity: 0.7 }} />
      </MapContainer>
      {/* Legend overlay */}
      <div className="absolute bottom-4 left-4 glass-card p-3 z-[1000] text-xs space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-primary" />
          <span>Buses</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span>Workers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-primary" />
          <span>Route</span>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;
