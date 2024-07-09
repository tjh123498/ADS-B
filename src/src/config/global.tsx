import { getBackend } from "../helpers/getBackend";
import { getProtocol } from "../helpers/getProtocol";

const backend = getBackend();
const protocol = getProtocol(true);

export const globalConfig = {
    placeholder: {
        number: -9999,
        string: "N/A",
    },
    mapbox: {
        minZoom: 7,
        maxZoom: 11,
        defaultZoom: 8,
        defaultCentre: [39.7, 116.8],
        tileUrl: `${protocol}//${backend}/tiles/{z}/{x}/{y}/tile.webp`,
    },
    buffer: {
        timeout: 1000 * 60,
    },
    query: {
        backend: `${protocol}//${backend}/api/query`,
    }
};
