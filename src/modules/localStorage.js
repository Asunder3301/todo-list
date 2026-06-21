import { JSONHandler } from "./handleJSON.js";

export class LocalStorage {
    static addToLocal(key, value) {
        if (!this.#storageAvailable("localStorage")) {
            console.log("Storage not found");
            return;
        }

        localStorage.setItem(key, JSONHandler.toJSON(value));
    }

    static getFromLocal(key) {
        if(!this.#storageAvailable("localStorage")) {
            console.log("Storage not found");
            return;
        }

        return JSONHandler.toArray(localStorage.getItem(key));
    }

    static #storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
            );
        }
    }
}