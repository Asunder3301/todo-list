class HandleJSON {
    static toJSON(data) {
        return JSON.stringify(data);
    }

    static toArray(data) {
        return JSON.parse(data);
    }
}

export const JSONHandler = {
    toJSON: HandleJSON.toJSON.bind(HandleJSON),
    toArray: HandleJSON.toArray.bind(HandleJSON),
}