import Slider from "@mui/material/Slider";
import { Container } from "./Container";
import playIcon from "../assets/icons/play-solid.svg";
import pauseIcon from "../assets/icons/pause-solid.svg";
import { useState } from "react";
import { format } from "date-fns";

interface PlayerProps {
    readonly startTime: number;
    readonly endTime: number;
    readonly onValueChange: (time: number) => void;
}

export const Player = (props: PlayerProps) => {
    const { startTime, endTime, onValueChange } = props;

    const [playback, setPlayback] = useState(true);
    const [value, setValue] = useState(0);

    const getTimelineLabel = (value: number) =>
        format(new Date(value), "HH:mm:ss");

    const calculateValue = (value: number) => {
        if (value === 0) {
            return startTime;
        } else if (value === 100) {
            return endTime;
        }

        return Math.round((endTime - startTime) * (value / 100) + startTime);
    };

    return (
        <Container className="py-5 px-3 max-w-[30rem] grid grid-cols-[50px_1fr] gap-8 m-2 border-2 rounded-lg">
            <button
                className="border-2 rounded-full size-12 flex justify-center items-center hover:bg-gray-100"
                onClick={() => setPlayback(!playback)}
            >
                <img className={playback ? "size-5" : "hidden"} src={playIcon} alt="" />
                <img className={playback ? "hidden" : "size-5"} src={pauseIcon} alt="" />
            </button>
            <Slider
                value={value}
                onChange={(_, value) => {
                    setValue(value as number);
                    onValueChange(calculateValue(value as number));
                }}
                marks={[
                    { value: 0, label: getTimelineLabel(startTime) },
                    { value: 100, label: getTimelineLabel(endTime) },
                ]}
                scale={calculateValue}
                valueLabelDisplay="auto"
                step={100 / (endTime - startTime)}
                valueLabelFormat={getTimelineLabel}
                sx={{ width: "calc(100% - 20px)" }}
            />
        </Container>
    );
};
