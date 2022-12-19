import {
    delObjFromAPI,
    getApplicationState,
    postObjToAPI,
} from "./dataAccess.js";

export const Bookings = () => {
    // filter bookings against bookings that are already complete
    let bookings = getApplicationState("bookings");
    bookings = bookings.filter(checkIfPending);

    // sort bookings by date, closest -> furthest (ternary)
    bookings.sort((booking1, booking2) =>
        booking1.partyDate > booking2.partyDate ? 1 : -1
    );
    let html = `
    <ul class="bookings">
        ${bookings
            .map((booking) => convertBookingObjToListElem(booking))
            .join("")}
    </ul>`;
    return html;
};

const checkIfPending = (booking) => {
    // filter function to get pending/completed bookings
    const completedBookings = getApplicationState("completedBookings");
    for (const completedBooking of completedBookings) {
        if (booking.id === completedBooking.bookingId) {
            // FALSE, this booking IS complete
            return false;
        }
    }
    return true;
};

export const CompletedBookings = () => {
    const completedBookings = getApplicationState("completedBookings");

    return `
    <ul class="completedBookings">
        ${completedBookings
            .map((completedBooking) =>
                convertBookingObjToListElem(completedBooking, true)
            )
            .join("")}
    </ul>
    `;
};

const convertBookingObjToListElem = (bookingObj, completed = false) => {
    const clowns = getApplicationState("clowns");

    // find the booking object of a corresponding completedBooking object
    if (completed) {
        const bookings = getApplicationState("bookings");
        bookingObj = bookings.find(
            (booking) => booking.id === bookingObj.bookingId
        );
    }

    return `
        <li class="booking">
            <div class="booking__details">
                ${bookingObj.partyDate} for ${
        bookingObj.numOfChildren
    } kids @ ${bookingObj.partyAddress} (${bookingObj.parentName})
            </div>
            <div class="booking-buttons__container">
                <select class="clowns">
                    <option value="">Completed By</option>
                        ${clowns
                            .map((clown) => {
                                return `<option value="${bookingObj.id}--${clown.id}">${clown.name}</option>`;
                            })
                            .join("")}
                </select>
            </div>
            <button class="delete__button" id="booking--${bookingObj.id}">
                Delete
            </button>
        </li>
        `;
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
        let resource = "bookings";
        let [, id] = event.target.id.split("--");
        id = parseInt(id);

        // check if the item is in the pending or completed bookings
        if (event.target.closest(".completedBookings") !== null) {
            resource = "completedBookings";
            // if it is completed bookings, we need to get the primary key of the completed object
            const completedBookings = getApplicationState(resource);
            id = completedBookings.find(
                (booking) => booking.bookingId === id
            ).id;
        }
        delObjFromAPI(resource, id);
    }
});
