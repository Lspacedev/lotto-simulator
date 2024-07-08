//get user input
const input = document.querySelector("#input-number");
const submit = document.querySelector("#input-submit");
let userNum = 0;

//create array for storing ticket object
let tickets = [];

submit.addEventListener("click", (e) => {
  e.preventDefault();
  userNum = parseInt(input.value);
  input.value = "";

  generateBoards(userNum);
});

//generate boards based on number
function generateBoards(num) {
  //initialize tickets
  sortTickets(num);
  console.log(tickets);
  //select boards container
  const boards = document.querySelector(".boards-container");

  //if boards is not empty, clear its children
  while (boards.firstChild) {
    boards.firstChild.remove();
  }

  for (let i = 0; i < num; i++) {
    const board = document.createElement("div");
    board.classList.add("board");

    //create board id
    const id = i + 1;
    board.setAttribute("id", `${id}`);

    for (let i = 0; i < 52; i++) {
      const boardBlock = document.createElement("div");
      boardBlock.innerText = i + 1;
      board.appendChild(boardBlock);
    }

    boards.appendChild(board);
  }
}

//create function to associate or sort number of boards with tickets
function sortTickets(num) {
  let ticketNum;
  if (num % 10 == 0) {
    ticketNum = num / 10;
  } else {
    //store modulus
    let modulus = num % 10;
    ticketNum = num - modulus;
    ticketNum /= 10;
    ticketNum += 1;
  }
  console.log(ticketNum);
  //initialize tickets
  for (let i = 0; i < ticketNum; i++) {
    tickets.push({
      ticketId: i + 1,
      boards: [
        {
          boardId: 0,
          numbers: [],
        },
      ],
    });
  }
  console.log(tickets);
}
//user must be able to select
/*{ 
    ticketId: id, 
    boards: [
    {
        boardId: 1, 
        numbers: []
    }
    ] 
} */
console.log("hello");
sortTickets(31);
