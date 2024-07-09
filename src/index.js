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

userBtn.addEventListener("click", () => {
  render("user");
  user();
});
adminBtn.addEventListener("click", () => {
  render("admin");
  admin();
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
