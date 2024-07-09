import { useEffect, useState } from "react";
import { Container } from "./components/Container";
import { Label } from "./components/Label";
import { MapBox } from "./components/MapBox";
import { apiConfig } from "./config/api";
import { getBackend } from "./helpers/getBackend";
import { useSocket } from "./helpers/useSocket";
import socketRequestModel0 from "./models/request/socket/0.json";
import socketCommonResponseModel0 from "./models/response/common/socket/0.json";
import { globalConfig } from "./config/global";
import { sendUserAlert } from "./helpers/sendUserAlert";
import { getMapCentre } from "./helpers/getMapCentre";
import { getFilteredValue } from "./helpers/getFilteredValue";
import { useInterval } from "./helpers/useInterval";
import { MapMarker } from "./components/MapMarker";
import { TimePicker } from "./components/TimePicker";
import { Button } from "./components/Button";
import { Holder } from "./components/Holder";
import { Player } from "./components/Player";

const App = () => {
    const backend = getBackend();
    const { endpoints } = apiConfig;
    const { placeholder, mapbox, buffer, query } = globalConfig;

    const [flightData, setFlightData] = useState<
        typeof socketCommonResponseModel0[]
    >([]);
    const [messageBuffer, setMessageBuffer] = useState<
        Record<string, typeof socketCommonResponseModel0>
    >({});
    const [mapCentre, setMapCentre] = useState<[number, number]>(
        mapbox.defaultCentre as [number, number]
    );

    useEffect(() => {
        if (!Object.keys(messageBuffer).length) {
            return;
        }
        const flights = Object.values(messageBuffer)
            .filter((item) => !!item.latitude && !!item.longitude);
        setFlightData(flights);

        if (!!flights.length) {
            const centre = getMapCentre(flights.map((item) => [item.latitude, item.longitude]));
            setMapCentre(centre as [number, number]);
        }
    }, [messageBuffer]);

    const handleSocketOpen = () => {
        sendUserAlert("后端连接成功");
    };

    const handleSocketData = ({
        data: _data,
    }: MessageEvent<typeof socketCommonResponseModel0>) => {
        setMessageBuffer((prev) => {
            const data = getFilteredValue(_data, [
                placeholder.number,
                placeholder.string,
            ]);

            if (data.icao in prev) {
                prev[data.icao] = { ...prev[data.icao], ...data };
            } else {
                prev[data.icao] = data;
            }

            return { ...prev };
        });
    };

    useSocket<typeof socketRequestModel0, typeof socketCommonResponseModel0>(
        {
            backend,
            endpoint: endpoints.socket,
            onOpen: handleSocketOpen,
            onData: handleSocketData,
        },
        true
    );

    useInterval(
        () => {
            setMessageBuffer((prev) => {
                for (const key in prev) {
                    if (prev[key].timestamp + buffer.timeout < Date.now()) {
                        delete prev[key];
                    }
                }

                return { ...prev };
            });
        },
        1000,
        true
    );

    const [selectedFlight, setSelectFlight] = useState("");

    const handleSetSelectFlight = (icao: string) => {
        setSelectFlight(icao);
    };

    const [duration, setDuration,] = useState({
        start: Date.now() - 1000 * 60, end: Date.now()
    });

    const handleSetDuration = (value: number, end = false) => {
        if (end) {
            setDuration({ ...duration, end: value });
        } else {
            setDuration({ ...duration, start: value });
        }
    };

    const handleReplayData = async (data: any) => {
        console.log(data, "航班数据重放");
    };

    const handleQueryData = async () => {
        const { data } = await fetch(query.backend, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(duration),
        }).then((res) => res.json());
        if (!data?.length) {
            sendUserAlert("未查询到数据", true);
            return;
        }
        handleReplayData(data);
    };

    return (
        <Container className="grid grid-cols-2 min-h-screen" toaster={true}>
            <Container>
                <MapBox
                    className="h-[100%]"
                    dragging={true}
                    center={mapCentre}
                    tile={mapbox.tileUrl}
                    minZoom={mapbox.minZoom}
                    maxZoom={mapbox.maxZoom}
                    zoom={mapbox.defaultZoom}
                >
                    {!!flightData?.length &&
                        flightData.map(({ icao, heading, latitude, longitude }) => (
                            <MapMarker
                                key={icao}
                                icao={icao}
                                rotate={heading}
                                position={[latitude, longitude]}
                                popup={icao === selectedFlight}
                            />
                        ))}
                </MapBox>
            </Container>
            <Container className="max-h-screen overflow-scroll bg-gray-50">

                <Container className="space-y-4 px-4 pt-4">
                    <Holder label="历史查询">
                        <Container className="space-y-4 px-4 pt-4">
                            <TimePicker label="选择起始时间" currentLocale="zhCN" value={duration.start} onChange={(value) => { handleSetDuration(value); }} />
                            <TimePicker label="选择结束时间" currentLocale="zhCN" value={duration.end} onChange={(value) => { handleSetDuration(value, true); }} />
                            <Button className="bg-indigo-700 hover:bg-indigo-800 transition-all" label="回放数据" onClick={handleQueryData} />
                        </Container>
                    </Holder>
                </Container>

                <Player
                    startTime={duration.start}
                    endTime={duration.end}
                    onValueChange={(time: number) => {
                        console.log(time);
                    }}
                />

                <Container className="space-y-2 p-4">
                    {
                        !!Object.keys(messageBuffer).length
                            ? Object.values(messageBuffer).map(({
                                altitude,
                                callsign,
                                heading,
                                icao,
                                latitude,
                                longitude,
                                timestamp,
                                velocity,
                            }) => <Label
                                    key={icao}
                                    icao={icao}
                                    callsign={callsign}
                                    timestamp={timestamp}
                                    altitude={altitude?.toFixed(2)}
                                    heading={heading?.toFixed(2)}
                                    velocity={velocity?.toFixed(2)}
                                    location={[latitude ?? null, longitude ?? null]}
                                    onClick={handleSetSelectFlight}
                                />
                            )
                            : <Container className="flex justify-center min-h-screen">
                                <span className="p-2 my-auto text-xl font-medium">等待航班数据</span>
                            </Container>
                    }
                </Container>
            </Container>
        </Container>
    );
};

export default App;
