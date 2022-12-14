const applicationState = {
    bookings: [],
};

const API = "http://localhost:8088";

const mainContainer = document.querySelector("#container");

const dispatchStateChangedCustomEvent = () => {
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
};

export const delObjFromAPI = (resource, id) => {
    return fetch(`${API}/${resource}/${id}`, { method: "DELETE" }).then(
        dispatchStateChangedCustomEvent()
    );
};

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

export const postObjToAPI = (obj, resource) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    };

    return fetch(`${API}/${resource}`, fetchOptions)
        .then((response) => response.json())
        .then(dispatchStateChangedCustomEvent());
};
