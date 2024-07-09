export const getFilteredValue = <T,>(data: T, placeholders: any[]) => {
    for (const key in data) {
        if (placeholders.includes(data[key as keyof typeof data])) {
            delete data[key as keyof typeof data];
        }
    }

    return data;
};
