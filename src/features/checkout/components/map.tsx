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
        <div className="rounded-lg overflow-hidden border-2 my-4 shadow-md">
            <MapContainer
                center={[47.66091605485775, -117.41270019414627]}
                style={{height: "450px", width: "100%", zIndex: 0}}
                zoom={13}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                <Marker position={[47.66091605485775, -117.41270019414627]} icon={icon}>
                    <Popup>
                        <div className="text-base font-bold text-primary">
                            Sprout & About
                        </div>
                        <div className="mt-2">Pick up your order at our location!</div>
                        <div className="mt-2 font-medium">
                            334 W Spokane Falls Blvd Spokane, WA 99201
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Map;
