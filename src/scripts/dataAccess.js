const applicationState = {
    bookings: [],
};

const API = "http://localhost:8088";

const mainContainer = document.querySelector("#container");

export const fetchAPIResource = (resource) => {
    return fetch(`${API}/${resource}`)
        .then((response) => response.json())
        .then((data) => {
            applicationState[resource] = data;
        });
};

export const getApplicationState = (data) => {
    return applicationState[data].map((d) => ({ ...d }));
};
