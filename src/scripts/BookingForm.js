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
        <label class="label" for="partyAddress">Party Address</label>
        <input type="text" name="partyAddress"></input>
    </div>
    <div class="small-fields__container">
        <div class="field">
            <label class="label" for="numOfChildren"># of Children</label>
            <input type="number" name="numOfChildren"></input>
        </div>
        <div class="field">
            <label class="label" for="partyDate">Party Date</label>
            <input type="date" name="partyDate"></input>
        </div>
        <div class="field">
            <label class="label" for="bookingHours">Party length (hr)</label>
            <input type="number" name="bookingHours"></input>
        </div>
    </div>
    <button class="button" id="submitButton">Submit</button>
    `;
};

const mainContainer = document.querySelector("#container");

mainContainer.addEventListener("click", (event) => {
    if (event.target.id === "submitButton") {
        const parentName = document.querySelector(
            "input[name='parentName']"
        ).value;
        const childName = document.querySelector(
            "input[name='childName']"
        ).value;
        const numOfChildren = document.querySelector(
            "input[name='numOfChildren']"
        ).value;
        const partyAddress = document.querySelector(
            "input[name='partyAddress']"
        ).value;
        const partyDate = document.querySelector(
            "input[name='partyDate']"
        ).value;
        const bookingHours = document.querySelector(
            "input[name='bookingHours']"
        ).value;

        const bookingObj = {
            parentName: parentName,
            childName: childName,
            numOfChildren: numOfChildren,
            partyAddress: partyAddress,
            partyDate: partyDate,
            bookingHours: parseInt(bookingHours),
        };

        postObjToAPI(bookingObj, "bookings");
    }
});
