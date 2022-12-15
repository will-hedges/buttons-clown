import { fetchAPIResource } from "./dataAccess.js";
import { ClownService } from "./ClownService.js";

const mainContainer = document.querySelector("#container");

const render = () => {
    fetchAPIResource("bookings")
        .then(() => fetchAPIResource("clowns"))
        .then(() => fetchAPIResource("completedBookings"))
        .then(() => {
            mainContainer.innerHTML = ClownService();
        });
};

render();

mainContainer.addEventListener("stateChanged", (customEvent) => {
    render();
});
