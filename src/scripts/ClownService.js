import { Bookings, Clowns } from "./Bookings.js";

export const ClownService = () => {
    return ` 
    <h1>West Coast Clown Service</h1>
    <section class="bookingForm"></section>
    <section class="bookings">
        <h2>Bookings</h2>
        ${Bookings()}
        <h3>Completed By</h3>
        ${Clowns()}
    </section>
    `;
};
