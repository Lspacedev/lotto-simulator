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
lottoHeading.innerHTML = `<img src="./game_lotto.png"></img>`;

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
  To participate in an SA Lotto draw online, simply choose 6 numbers from a guess range of 1-52 for each line you play. You can choose your Lotto numbers manually, with a Quick Pick random selection, or from your saved Lucky Numbers. When you play South African Lotto online, your tickets will be scanned and saved in your account before the draw with theLotter’s lottery courier service.

South African Lotto draws take place Wednesdays and Saturdays at 21:00 local time.

If you’re interested in play additional lotteries, you can buy lottery tickets online. 


      </div>
 
      <div class="lotto-types">
        <div class="lotto-icon"><img src="./game_lotto.png"></img></div>
        <div class="lotto-plus1-icon"><img src="./game_lottoplus1.png"></img></div>
        <div class="lotto-plus2-icon"><img src="./game_lottoplus2.png"></img></div>
      </div>
    </div>`;

//create array for storing ticket object
let tickets = [];
const storedTicketsData = JSON.parse(localStorage.getItem("tickets"));
const storedWinningData = JSON.parse(localStorage.getItem("winners"));

let lotto_plus1 = false;
let lotto_plus2 = false;
userBtn.addEventListener("click", () => {
  login("user");

  const userSubmitBtn = document.querySelector("#user-login-submit");
  userSubmitBtn.addEventListener("click", () => {
    render("user");

    if (storedTicketsData.length > 0) {
      user().generateTickets(storedTicketsData);
    }

    //check if user won
    const winningsAside = document.querySelector(".winnings-aside");
    //get stored winning data
    if (storedWinningData.length > 0) {
      let message = `You have winning tickets. `;
      storedWinningData.forEach((ticket) => {
        const ticketId = ticket.ticketId;
        message += `ticketId ${ticketId} `;
      });
      winningsAside.innerText = message;
    } else {
      winningsAside.innerText = "You currently have  winning tickets.";
    }

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
            user().generateTickets(tickets);
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
    admin().draw(tickets, lotto_plus1, lotto_plus2);
  });
});

function render(user) {
  if (user === "user") {
    container.innerHTML = `
    <section class="boards">
        <aside>
          <h4>Tickets History</h4>
          <div class="aside"></div>
        </aside>
      <div class="boards-main">
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
        </div>
      </div>
        <aside>
          <h4>Winnings</h4>
          <div class="winnings-aside"></div>
        </aside>

     
      </section>
      
      `;
  } else if (user === "admin") {
    container.innerHTML = `     
    <section class="lotto-draw">
        <aside>
          <h4>Winning Tickets/Boards</h4>
          <div class="admin-win-aside"></div>
        </aside>
      <div class="admin-main">
          <div class="lotto-draw-heading">Run Lotto Draw</div>
          <div class="lotto-draw-btns">
              <button class="draw-btn">Draw</button>
              <button class="draw-btn2">Draw Lotto Plus 1</button>
              <button class="draw-btn3">Draw Lotto Plus 2</button>
          </div>
          <div class="lotto-draw-results">
          </div>
      </div>
          <aside>
          <h4>Draws History</h4>
          <div class="admin-draw-aside"></div>
        </aside>
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
