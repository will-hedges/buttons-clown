import { BookingForm } from "./BookingForm.js";
import { Bookings, CompletedBookings } from "./Bookings.js";

export const ClownService = () => {
    return ` 
    <h1>West Coast Clown Service</h1>
    <section class="bookingForm">
        ${BookingForm()}
    </section>
    <section class="bookings">
        <h2>Bookings</h2>
        ${Bookings()}
    </section>
    <section class="completedBookings">
        <h2>Completed Bookings</h2>
        ${CompletedBookings()}
    </section>
    `;
};
