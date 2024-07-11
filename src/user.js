//import { admin } from "./admin.js";

export function user() {
  //generate boards based on number
  function generateBoards(tickets) {
    const boardsDiv = document.querySelector(".boards-div");
    //select boards container
    const boards = document.querySelector(".boards-container");
    //play container div
    const playDiv = document.querySelector(".playDiv");

    //if boards div is not empty, clear its children
    while (boards.firstChild) {
      boards.firstChild.remove();
    }

    //if boards div is not empty, clear its children
    while (playDiv.firstChild) {
      playDiv.firstChild.remove();
    }

    //lotto plus divs
    const lottoPlus1 = document.createElement("div");
    lottoPlus1.classList.add("lotto-plus1");
    lottoPlus1.innerHTML = `<label for="lp1">Lotto Plus 1
    <input type="checkbox" id="lp1">
    </label>`;

    const lottoPlus2 = document.createElement("div");
    lottoPlus2.classList.add("lotto-plus2");
    lottoPlus2.innerHTML = `<label for="lp2">Lotto Plus 2
    <input type="checkbox" id="lp2">
    </label>`;

    //create play button
    const playBtn = document.createElement("button");
    playBtn.classList.add("playBtn");
    playBtn.innerText = "Play";

    playDiv.appendChild(lottoPlus1);
    playDiv.appendChild(lottoPlus2);
    playDiv.appendChild(playBtn);

    boardsDiv.appendChild(playDiv);

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
      arr.push({ ticketId: i, boards: boards, price: boards.length * 5 });
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
      arr.push({
        ticketId: lastTicketId,
        boards: boards,
        price: boards.length * 5,
      });
    }
    return arr;
  }

  function getBoardSelections(tickets) {
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

        //loop through board's numbers array to see if

        //push selected into board's numbers array

        tickets.map((ticket) => {
          if (ticket.ticketId === ticketId) {
            ticket.boards.map((board) => {
              if (board.boardId === boardId) {
                //prevent more than 6 numbers being added
                if (board.numbers.length > 5) {
                  return;
                }
                //prevent same number from being added
                if (board.numbers.indexOf(number) === -1) {
                  //add selected class to boardBlock
                  boardBlock.classList.add("selected");
                  return board.numbers.push(number);
                }
              } else {
                return board;
              }
            });
          } else {
            return ticket;
          }
        });
      });
    });
  }
  function totalPrice(tickets) {
    let totalPrice = 0;
    tickets.map((ticket) => {
      const price = ticket.price;
      totalPrice += price;
    });
    return totalPrice;
  }

  function checkSelections(tickets) {
    let count = 0;
    tickets.map((ticket) => {
      const boards = ticket.boards;
      boards.map((board) => {
        count += board.numbers.length;
      });
    });
    return count;
  }

  function getBoardsNumber(tickets) {
    let count = 0;
    tickets.map((ticket) => {
      const boards = ticket.boards;
      count += boards.length;
    });
    return count;
  }
  return {
    generateBoards,
    createTickets,
    getBoardSelections,
    totalPrice,
    checkSelections,
    getBoardsNumber,
  };
}
