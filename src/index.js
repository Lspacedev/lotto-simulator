//create user and admin button
const userBtn = document.createElement("button");
userBtn.classList.add("userBtn");
userBtn.innerHTML = "User";

const adminBtn = document.createElement("button");
adminBtn.classList.add("adminBtn");
adminBtn.innerText = "Admin";

//select container
const container = document.querySelector(".container");

container.appendChild(userBtn);
container.appendChild(adminBtn);
