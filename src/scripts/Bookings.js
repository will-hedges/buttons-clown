import { getApplicationState } from "./dataAccess.js";

export const Bookings = () => {
    const bookings = getApplicationState("bookings");
    bookings.sort((booking1, booking2) =>
        booking1.partyDate > booking2.partyDate ? 1 : -1
    );
    let html = `
    <ul>
        ${bookings
            .map((booking) => convertBookingObjToScheduleListElem(booking))
            .join("")}
    </ul>`;
    return html;
};

const convertBookingObjToScheduleListElem = (bookingObj) => {
    return `
    <li>
        ${bookingObj.partyDate} for ${bookingObj.numOfChildren} kids @ ${bookingObj.partyAddress} (${bookingObj.parentName})
    </li>`;
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
