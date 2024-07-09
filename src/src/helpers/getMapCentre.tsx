export const getMapCentre = (locationArr: [number, number][]) => {
    const minLat = Math.min(...locationArr.map((loc) => loc[0]));
    const maxLat = Math.max(...locationArr.map((loc) => loc[0]));
    const minLon = Math.min(...locationArr.map((loc) => loc[1]));
    const maxLon = Math.max(...locationArr.map((loc) => loc[1]));

    const centerLat = (minLat + maxLat) / 2;
    const centerLon = (minLon + maxLon) / 2;

    return [centerLat, centerLon];
};
