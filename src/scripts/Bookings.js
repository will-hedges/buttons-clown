import { fetchAPIResource, getApplicationState } from "./dataAccess.js";

export const Bookings = () => {
    const bookings = getApplicationState("bookings");
    let html = `
    <ul>
        ${bookings
            .map((booking) => convertObjPropToListItem(booking, "parentName"))
            .join("")}
    </ul>`;
    return html;
};

export const Clowns = () => {
    const clowns = getApplicationState("clowns");
    let html = `
    <ul>
        ${clowns
            .map((clown) => convertObjPropToListItem(clown, "name"))
            .join("")}
    </ul>`;
    return html;
};

const convertObjPropToListItem = (obj, propName) => {
    return `
    <li>
        ${obj[propName]}
    </li>
    `;
};
