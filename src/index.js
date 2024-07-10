import { user } from "./user.js";
import { admin } from "./admin.js";

//create user and admin button
const userBtn = document.createElement("button");
userBtn.classList.add("userBtn");
userBtn.innerHTML = "User";

const adminBtn = document.createElement("button");
adminBtn.classList.add("adminBtn");
adminBtn.innerText = "Admin";

//select nav and container
const nav = document.querySelector(".nav");
const container = document.querySelector(".container");

nav.appendChild(userBtn);
nav.appendChild(adminBtn);

//create array for storing ticket object
let tickets = [];
userBtn.addEventListener("click", () => {
  render("user");

  //get user input
  const input = document.querySelector("#input-number");
  const submit = document.querySelector("#input-submit");
  let userNum = 0;

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    userNum = parseInt(input.value);
    input.value = "";

    //create array tickets, which contains each ticket with its associated boards.
    tickets = user().createTickets(userNum);

    //render user boards
    user().generateBoards(tickets);

    //with boards rendered get board selections
    user().getBoardSelections(tickets);
  });
});
adminBtn.addEventListener("click", () => {
  render("admin");
  admin(tickets);
});

function render(user) {
  if (user === "user") {
    container.innerHTML = `<section class="boards">
            <div class="boards-heading">Select your boards.</div>
            <div class="boards-selector">
                <input type="text" id="input-number" placeholder="Enter board number">
                <input type="submit" id="input-submit" value="submit">
            </div>
            <div class="boards-container">
            
            </div>
        </section>`;
  } else if (user === "admin") {
    container.innerHTML = `     <section class="lotto-draw">
          <div class="lotto-draw-heading">Run Lotto Draw</div>
          <div class="lotto-draw-btn">
              <button class="draw-btn1">Draw</button>
          </div>
          <div class="lotto-draw-results">
          </div>
      </section>`;
  }
}
