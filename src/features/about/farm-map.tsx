"use client";

import React from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
    iconUrl: "/leaf-marker.png",
    iconRetinaUrl: "/leaf-marker.png",
    iconSize: [45, 45],
});

interface FarmLocation {
    name: string;
    address: string;
    description: string;
    position: number[];
}

interface FarmMapProps {
    locations: FarmLocation[];
}

const FarmMap: React.FC<FarmMapProps> = ({locations}) => {
    const calculateCenter = (): [number, number] => {
        if (locations.length === 0) {
            return [47.6588, -117.426];
        }

        const sumLat = locations.reduce((sum, loc) => sum + loc.position[0], 0);
        const sumLng = locations.reduce((sum, loc) => sum + loc.position[1], 0);

        return [sumLat / locations.length, sumLng / locations.length];
    };

    const center = calculateCenter();

    return (
        <MapContainer
            center={[center[0], center[1]]}
            style={{height: "100%", width: "100%", zIndex: 0}}
            scrollWheelZoom={false}
            zoom={10}
            className="border-2 rounded-xl"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />

            {locations.map((location, index) => (
                <Marker
                    key={index}
                    position={[location.position[0], location.position[1]]}
                    icon={icon}
                >
                    <Popup>
                        <div>
                            <h3 className="font-bold text-primary text-lg">
                                {location.name}
                            </h3>
                            <p className="text-sm">{location.address}</p>
                            <p className="mt-2">{location.description}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default FarmMap;
