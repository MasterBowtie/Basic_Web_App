import { createContext, useContext } from "react";

class Api {
    constructor (initialToken) {
        this.authToken = initialToken
    }

    async makeRequest (url, method, body) {
        const options = {};

        if (method === "POST" || method === "PUT" || method === "DELETE") {
            options.body = JSON.stringify(body);
            // console.log("BODY", options.body);
        }

        const res = await fetch (url, {
            method,
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            ...options
        });

        if (!res.ok) {
            // console.log(res)
            const errorBody = await res.json();
            throw new Error(errorBody.message || `HTTP error! status: ${res.status}`);
        }
        const text = await res.text();
        return text ? JSON.parse(text): {};
    }

    get(uri) {
        return this.makeRequest("api/"+uri, "GET");
    }

    post(uri, body) {
        return this.makeRequest("api/"+uri, "POST", body);
    }

    put(uri, body) {
        return this.makeRequest("api/"+uri, "PUT", body);
    }

    delete(uri, body) {
        return this.makeRequest("api/"+uri, "DELETE", body);
    }
}

const ApiContext = createContext(new Api());
export const useApi = () => {return useContext(ApiContext)}
