import { MapContainer, Popup, TileLayer } from "react-leaflet";
import LocationIcon from "../assets/icons/plane-solid.svg";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ReactNode, RefObject, useEffect, useRef } from "react";
import { Popup as LeafletPopup } from "leaflet";

export interface MapBoxProps<T = ReactNode | ReactNode[]> {
    readonly className?: string;
    readonly minZoom: number;
    readonly maxZoom: number;
    readonly zoom: number;
    readonly tile: string;
    readonly center: [number, number];
    readonly scrollWheelZoom?: boolean;
    readonly zoomControl?: boolean;
    readonly dragging?: boolean;
    readonly children?: T;
}

export const MapBox = (props: MapBoxProps) => {
    const {
        className,
        minZoom,
        maxZoom,
        zoom,
        tile,
        center,
        scrollWheelZoom,
        zoomControl,
        dragging,
        children,
    } = props;

    return (
        <MapContainer
            className={`z-0 w-full ${className ?? ""}`}
            scrollWheelZoom={scrollWheelZoom}
            zoomControl={zoomControl}
            attributionControl={false}
            doubleClickZoom={false}
            dragging={dragging}
            maxZoom={maxZoom}
            minZoom={minZoom}
            center={center}
            zoom={zoom}
            style={{
                cursor: "default",
            }}
        >
            <TileLayer url={tile} />
            {children}
        </MapContainer>
    );
};
