import L, { Marker as LeafletMarker } from "leaflet";
import { Popup } from "react-leaflet";
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import LocationIcon from "../assets/icons/plane-solid.svg";
import { Marker, MarkerProps } from "react-leaflet";

const RotableMarker = forwardRef((props: MarkerProps & {
    rotationAngle: number;
    rotationOrigin: string;
}, ref: ForwardedRef<LeafletMarker>) => {
    const markerRef = useRef<any>();

    useEffect(() => {
        const marker = markerRef.current;
        if (marker) {
            const proto_setPos = marker._setPos;
            marker._setPos = (pos: any) => {
                proto_setPos.call(marker, pos);
                if (props.rotationAngle) {
                    marker._icon.style[L.DomUtil.TRANSFORM + "Origin"] =
                        props.rotationOrigin;
                    marker._icon.style[L.DomUtil.TRANSFORM] +=
                        " rotateZ(" + props.rotationAngle + "deg)";
                }
            };
            marker.update();
        }
    }, [props.rotationAngle, props.rotationOrigin]);

    useImperativeHandle(ref, () => markerRef.current!);

    return (
        <Marker ref={markerRef} {...props}>
            {props.children}
        </Marker>
    );
});

interface MapMarkerProps {
    readonly popup?: boolean;
    readonly icao: string;
    readonly rotate: number;
    readonly position: [number, number];
}

export const MapMarker = (props: MapMarkerProps) => {
    const { icao, rotate, position, popup } = props;
    const icon = new L.Icon({
        iconUrl: LocationIcon,
        iconAnchor: [9, 24],
        iconSize: [25, 25],
    });

    const popupRef = useRef<LeafletMarker>(null);

    useEffect(() => {
        if (!!popup) {
            popupRef.current?.openPopup();
        }
    }, [popup]);

    return (
        <RotableMarker
            icon={icon}
            rotationOrigin="center"
            position={position}
            rotationAngle={rotate}
            ref={popupRef}
        >
            <Popup>{`ICAO: ${icao}, Heading: ${rotate}`}</Popup>
        </RotableMarker>
    );
};
