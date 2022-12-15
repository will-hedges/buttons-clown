import {
    delObjFromAPI,
    getApplicationState,
    postObjToAPI,
} from "./dataAccess.js";

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
    <li class="booking">
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

const mainContainer = document.querySelector("#container");

mainContainer.addEventListener("change", (event) => {
    // this is the completed by listener
    if (event.target.className === "clowns") {
        // send it to the API as completed
        const [bookingId, clownId] = event.target.value.split("--");
        const completionObj = {
            bookingId: parseInt(bookingId),
            clownId: parseInt(clownId),
            date_created: Date.now(),
        };

        postObjToAPI(completionObj, "completedBookings");
    }
});

mainContainer.addEventListener("click", (event) => {
    if (event.target.className === "delete__button") {
        const [, bookingId] = event.target.id.split("--");
        delObjFromAPI("bookings", parseInt(bookingId));
    }
});
