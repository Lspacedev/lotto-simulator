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
const body = document.querySelector("body");
const lottoHeading = document.createElement("div");
lottoHeading.classList.add("lotto-heading");
lottoHeading.innerText = "Lotto Simulator";

const navBtns = document.createElement("div");
navBtns.classList.add("nav-btns");

nav.prepend(lottoHeading);
navBtns.appendChild(userBtn);
navBtns.appendChild(adminBtn);
nav.appendChild(navBtns);

body.prepend(nav);
container.innerHTML = `    <div class="lotto-info">
      
      <div class="lotto-info-heading">How to play lotto ?</div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
        nihil fugiat ipsum temporibus inventore blanditiis ab animi veritatis,
        reprehenderit necessitatibus exercitationem sequi quod possimus impedit
        quidem repudiandae. Nam, molestias aut.
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
        nihil fugiat ipsum temporibus inventore blanditiis ab animi veritatis,
        reprehenderit necessitatibus exercitationem sequi quod possimus impedit
        quidem repudiandae. Nam, molestias aut.
      </div>
      <div class="lotto-types">
        <div class="lotto-icon">Lotto</div>
        <div class="lotto-plus1-icon">Lotto Plus 1</div>
        <div class="lotto-plus2-icon">Lotto Plus 2</div>
      </div>
    </div>`;

//create array for storing ticket object
let tickets = [];
let lotto_plus1 = false;
let lotto_plus2 = false;
userBtn.addEventListener("click", () => {
  login("user");
  const userSubmitBtn = document.querySelector("#user-login-submit");
  userSubmitBtn.addEventListener("click", () => {
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
      console.log(tickets, "uuu");

      //render user boards
      user().generateBoards(tickets);

      //with boards rendered get board selections
      user().getBoardSelections(tickets);

      const priceDiv = document.querySelector(".price");
      let totalPrice = user().totalPrice(tickets);
      priceDiv.innerText = `Total Price: ${totalPrice}`;

      const playBtn = document.querySelector(".playBtn");
      playBtn.addEventListener("click", () => {
        //check if there are any numbers selected
        let numberSelectionCount = user().checkSelections(tickets);
        if (numberSelectionCount < 6) {
          alert("Please select at least 6 numbers.");
        } else {
          const lottoPlus1 = document.querySelector("#lp1");
          const lottoPlus2 = document.querySelector("#lp2");

          lotto_plus1 = lottoPlus1.checked;
          lotto_plus2 = lottoPlus2.checked;

          let ticketsNum = tickets.length;
          let message = `You have ${ticketsNum} tickets. `;

          if (lottoPlus1.checked) {
            message +=
              "You have selected to play Lotto Plus 1, for an additional R2.50. ";
          }
          if (lottoPlus2.checked) {
            message +=
              "You have selected to play Lotto Plus 2, for an additional R2.50. ";
          }
          alert(message);

          const playDiv = document.querySelector(".playDiv");
          playDiv.removeChild(playBtn);

          const confirmBtn = document.createElement("button");
          confirmBtn.classList.add("confirm");
          confirmBtn.innerText = "confirm";
          playDiv.appendChild(confirmBtn);
          let confirmed = false;
          confirmBtn.addEventListener("click", () => {
            if (confirmed) {
              return;
            }
            alert("OK");
            if (lotto_plus1) {
              let boardsNumber = user().getBoardsNumber(tickets);
              totalPrice += 2.5 * boardsNumber;
              priceDiv.innerText = `Total Price: ${totalPrice}`;
            }
            if (lotto_plus2) {
              let boardsNumber = user().getBoardsNumber(tickets);
              totalPrice += 2.5 * boardsNumber;

              priceDiv.innerText = `Total Price: ${totalPrice}`;
            }
            confirmed = true;
          });
        }
      });
    });
  });
});
adminBtn.addEventListener("click", () => {
  login("admin");
  const adminSubmitBtn = document.querySelector("#admin-login-submit");
  adminSubmitBtn.addEventListener("click", () => {
    render("admin");
    admin(tickets, lotto_plus1, lotto_plus2);
  });
});

function render(user) {
  if (user === "user") {
    container.innerHTML = `<section class="boards">
            <div class="boards-heading">Select your boards.</div>
            <div class="boards-selector">
                <input type="text" id="input-number" placeholder="Enter board number">
                <input type="submit" id="input-submit" value="submit">
            </div>
            <div class="boards-div">
              <div class="boards-container">
            
              </div>
              <div class="playDiv"></div>
            </div>
          
            <div class="price">Total Price: 0</price>
        </section>
        <div class="aside"></div>`;
  } else if (user === "admin") {
    container.innerHTML = `     <section class="lotto-draw">
          <div class="lotto-draw-heading">Run Lotto Draw</div>
          <div class="lotto-draw-btns">
              <button class="draw-btn">Draw</button>
              <button class="draw-btn2">Draw Lotto Plus 1</button>
              <button class="draw-btn3">Draw Lotto Plus 2</button>
          </div>
          <div class="lotto-draw-results">
          </div>
      </section>`;
  }
}

function login(user) {
  if (user === "user") {
    container.innerHTML = `
  
    <form>
    <label for="username">Username: 
      <input type="text" id="username" />
    </label>
    <label for="password">Password: 
    <input type="password" id="password" />
    </label>
    <input type="submit" id="user-login-submit" />
  </form>`;
  } else if (user === "admin") {
    container.innerHTML = `
   
    <form>
    <label for="adminname">Admin name: 
      <input type="text" id="adminname" />
    </label>
    <label for="password">Password: 
    <input type="password" id="password" />
    </label>
    <input type="submit" id="admin-login-submit" />
  </form>`;
  }
}
