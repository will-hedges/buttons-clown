import { ClownService } from "./ClownService.js";

const mainContainer = document.querySelector("#container");

const render = () => {
    mainContainer.innerHTML = ClownService();
};

render();

mainContainer.addEventListener("stateChanged", (customEvent) => {
    render();
});
