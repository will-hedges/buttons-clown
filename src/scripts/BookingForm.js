import { postObjToAPI } from "./dataAccess.js";

export const BookingForm = () => {
    return `
    <div class="field">
        <label class="label" for="parentName">Parent Name</label>
        <input type="text" name="parentName"></input>
    </div>
    <div class="field">
        <label class="label" for="childName">Child Name</label>
        <input type="text" name="childName"></input>
    </div>
    <div class="field">
        <label class="label" for="numOfChildren">Number of Children</label>
        <input type="number" name="numOfChildren"></input>
    </div>
    <div class="field">
        <label class="label" for="partyAddress">Party Address</label>
        <input type="text" name="partyAddress"></input>
    </div>
    <div class="field">
        <label class="label" for="reservationDate">Party Date</label>
        <input type="text" name="reservationDate"></input>
    </div>
    <div class="field">
        <label class="label" for="bookingHours">Party length (hours)</label>
        <input type="number" name="bookingHours"></input>
    </div>

    <button class="button" id="submitButton">Submit</button>
    `;
};
