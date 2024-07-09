export const getMapZoom = (
    minLat: number,
    maxLat: number,
    minLon: number,
    maxLon: number
) => {
    const latDiff = maxLat - minLat;
    const lonDiff = maxLon - minLon;
    const maxDiff = Math.max(latDiff, lonDiff);

    if (maxDiff < 1) {
        return 11;
    } else if (maxDiff < 1.5) {
        return 10;
    } else if (maxDiff < 2) {
        return 9;
    } else if (maxDiff < 2.5) {
        return 8;
    }

    return 7;
};
