import Time_Icon from "../assets/icons/clock-solid.svg";
import ICAO_Icon from "../assets/icons/database-solid.svg";
import Callsign_Icon from "../assets/icons/plane-departure-solid.svg";
import Altitude_Icon from "../assets/icons/cloud-solid.svg";
import Heading_Icon from "../assets/icons/compass-solid.svg";
import Location_Icon from "../assets/icons/map-solid.svg";
import Velocity_Icon from "../assets/icons/gauge-solid.svg";
import { getTimeString } from "../helpers/getTimeString";

interface LabelProps {
    readonly icao: string;
    readonly timestamp: number;
    readonly callsign?: string;
    readonly altitude?: string;
    readonly heading?: string;
    readonly velocity?: string;
    readonly location?: [number | null, number | null];
    readonly onClick?: (icao: string) => void;
}

export const Label = (props: LabelProps) => {
    const { timestamp, icao, callsign, altitude, heading, velocity, location, onClick } = props;

    return (
        <div
            className="rounded-md cursor-pointer p-2 border-2 border-orange-200 bg-orange-300 hover:bg-orange-400 transition-all text-amber-800 font-medium space-y-3"
            onClick={() => { onClick && onClick(icao); }}
        >
            <div className="flex items-center">
                <img className="size-5 mr-1" src={Time_Icon} alt="" />
                <span className="text-lg">{getTimeString(timestamp)}</span>
            </div>
            <div className="flex flex-wrap space-x-2">
                <div className="flex items-center">
                    <img className="size-5 mr-1" src={ICAO_Icon} alt="" />
                    <span className="text-lg">{icao}</span>
                </div>
                {!!callsign?.length && <div className="flex items-center">
                    <img className="size-5 mr-1" src={Callsign_Icon} alt="" />
                    <span className="text-lg">{callsign}</span>
                </div>}
                {!!altitude?.length && <div className="flex items-center">
                    <img className="size-5 mr-1" src={Altitude_Icon} alt="" />
                    <span className="text-lg">{altitude}</span>
                </div>}
            </div>
            <div className="flex flex-wrap space-x-2">
                {!!heading?.length && <div className="flex items-center">
                    <img className="size-5 mr-1" src={Heading_Icon} alt="" />
                    <span className="text-lg">{heading}</span>
                </div>}
                {!!velocity?.length && <div className="flex items-center">
                    <img className="size-5 mr-1" src={Velocity_Icon} alt="" />
                    <span className="text-lg">{velocity}</span>
                </div>}
                {!!location && location[0] !== null && location[1] !== null && <div className="flex items-center">
                    <img className="size-5 mr-1" src={Location_Icon} alt="" />
                    <span className="text-lg">{`${location[0]?.toFixed(5)}°, ${location[1]?.toFixed(5)}°`}</span>
                </div>}
            </div>
        </div>
    );
};
