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

  //create array tickets, which contains each ticket with its associated boards.
  const tickets = createTickets(userNum);

  //render user boards
  generateBoards(tickets);

  //with boards rendered get board selections
  getBoardSelections();
});

//generate boards based on number
function generateBoards(tickets) {
  //select boards container
  const boards = document.querySelector(".boards-container");

  //if boards div is not empty, clear its children
  while (boards.firstChild) {
    boards.firstChild.remove();
  }
  //loop through tickets array
  tickets.forEach((ticket) => {
    //get ticket id
    const ticketId = ticket.ticketId;

    //get boards from ticket obj
    const boardsArr = ticket.boards;

    //loop through boards of the current ticket
    boardsArr.forEach((boardObj) => {
      //get board id
      const boardId = boardObj.boardId;

      //create board div for each board obj
      const board = document.createElement("div");
      board.classList.add("board");

      board.setAttribute("id", `${boardId}`);
      console.log(ticketId, "dd");
      board.setAttribute("data-cell-index", `${ticketId}`);

      for (let i = 0; i < 52; i++) {
        const boardBlock = document.createElement("div");
        boardBlock.classList.add("board-block");
        boardBlock.innerText = i + 1;
        board.appendChild(boardBlock);
      }

      boards.appendChild(board);
    });
  });
}

//create function to associate or sort number of boards with tickets

function createTickets(num) {
  let arr = [];

  //get the modulus
  let modulus = num % 10;

  //store number of tickets without modulus
  let ticketNum = num - modulus;
  ticketNum /= 10;

  //loop through the number of tickets
  for (let i = 1; i <= ticketNum; i++) {
    //stop the loop at the number multipled by 10, which is the max amount of boards per ticket
    let end = i * 10;
    //start the loop at the end/stop minus 10 to loop in range
    let start = end - 10;
    //add 1 to start after 0;
    start += 1;

    //create boards array to store board objects of numbers the fall within range
    let boards = [];

    for (start; start <= end; start++) {
      boards.push({
        boardId: start,
        numbers: [],
      });
    }
    //push ticket object with the boards
    arr.push({ ticketId: i, boards: boards });
  }

  //if modulus is not equal to 0, add 1 more ticket
  if (modulus !== 0) {
    //create variable to start
    let start = num - modulus;
    //add 1 to start after last range
    start = start + 1;

    let boards = [];

    //get arr length and add 1 as id for last ticket
    let lastTicketId = arr.length + 1;

    for (start; start <= num; start++) {
      boards.push({
        boardId: start,
        numbers: [],
      });
    }
    arr.push({ ticketId: lastTicketId, boards: boards });
  }
  return arr;
}

function getBoardSelections(arr) {
  //select all blocks/number divs
  const boardBlocks = document.querySelectorAll(".board-block");
  console.dir(boardBlocks);
  boardBlocks.forEach((boardBlock) => {
    boardBlock.addEventListener("click", (e) => {
      //select parent div / board
      const board = boardBlock.parentElement;

      //get ticketId and boardId
      const ticketId = parseInt(board.getAttribute("data-cell-index"));
      const boardId = parseInt(board.id);

      //get number from div
      const number = parseInt(e.target.innerText);
      console.log(ticketId, boardId, number);
    });
  });
}
