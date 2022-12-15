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
    const clowns = getApplicationState("clowns");

    return `
    <li class="reservation">
        ${bookingObj.partyDate} for ${bookingObj.numOfChildren} kids @ ${
        bookingObj.partyAddress
    } (${bookingObj.parentName})
        <select class="clowns">
            <option value="">Completed By</option>
                ${clowns
                    .map((clown) => {
                        return `<option value="${bookingObj.id}--${clown.id}">${clown.name}</option>`;
                    })
                    .join("")}
        </select>
        <button class="delete__button" id="booking--${bookingObj.id}">
            Delete
        </button>
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
