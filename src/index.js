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
  //create array tickets
  const tickets = createTickets(num);
  //select boards container
  const boards = document.querySelector(".boards-container");

  //if boards is not empty, clear its children
  while (boards.firstChild) {
    boards.firstChild.remove();
  }

  /*
    [
      { ticketId: 1, boards: [
          {
            boardId: 1,
            numbers: [],
          }
       ] }
    ]
  */
  tickets.forEach((ticket) => {
    const ticketId = ticket.ticketId;
    const boardsArr = ticket.boards;
    boardsArr.forEach((boardObj) => {
      //get board id
      const boardId = boardObj.boardId;

      const board = document.createElement("div");
      board.classList.add("board");

      board.setAttribute("id", `${boardId}`);

      for (let i = 0; i < 52; i++) {
        const boardBlock = document.createElement("div");
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
  let modulus = num % 10;
  ticketNum = num - modulus;
  ticketNum /= 10;
  for (let i = 1; i <= ticketNum; i++) {
    let end = i * 10;
    let start = end - 10;
    start += 1;
    let boards = [];
    for (start; start <= end; start++) {
      boards.push({
        boardId: start,
        numbers: [],
      });
    }
    arr.push({ ticketId: i, boards: boards });
  }
  if (modulus !== 0) {
    //store modulus
    let start = num - modulus;
    start = start + 1;

    let boards = [];
    let length = arr.length;
    for (start; start <= num; start++) {
      boards.push({
        boardId: start,
        numbers: [],
      });
    }
    arr.push({ ticketId: length + 1, boards: boards });
  }
  return arr;
}
