export const setData = (key, data) => {
    if ('localStorage' in window) {
        localStorage.setItem(key, JSON.stringify(data));
    }
}

export const getData = (key) => {
    if ('localStorage' in window) {
        const data = localStorage.getItem(key);

        // return JSON.parse(data);
        return data;
    }
}

export const getParsedData = (key) => {
    if ('localStorage' in window) {
        const data = localStorage.getItem(key);

        return JSON.parse(data);
    }
}

export const removeData = (key) => {
    if ('localStorage' in window) {
        localStorage.removeItem(key);
    }
}