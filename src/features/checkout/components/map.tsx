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

const Map = (): React.JSX.Element => {
    return (
        <div className="rounded-lg overflow-hidden border-2 my-4">
            <MapContainer
                center={[47.66091605485775, -117.41270019414627]}
                style={{height: "450px", width: "100%", zIndex: 0}}
                zoom={13}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[47.66091605485775, -117.41270019414627]} icon={icon}>
                    <Popup>Pick up your order at our location!</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Map;
