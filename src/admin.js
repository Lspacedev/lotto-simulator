//export admin function

export function admin() {
  let matchedBoards = [];

  function draw(tickets, lotto_plus1, lotto_plus2) {
    //save tickets
    localStorage.setItem("tickets", JSON.stringify(tickets));
    //random number generator
    function drawNumbers(min, max) {
      let arr = [];
      while (arr.length < 6) {
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        if (arr.indexOf(num) === -1) {
          arr.push(num);
        }
      }

      return arr;
    }
    //Lotto

    if (tickets.length !== 0) {
      let clicked1 = false;
      const drawBtn = document.querySelector(".draw-btn");
      drawBtn.innerText = `Draw Lotto`;
      drawBtn.addEventListener("click", () => {
        if (clicked1) {
          return;
        }
        lotto(tickets, "Lotto");
        updateWinningTickets(matchedBoards);

        clicked1 = true;
      });
    }
    if (lotto_plus1) {
      //Lotto Plus 1
      let clicked2 = false;
      const drawBtn2 = document.querySelector(".draw-btn2");
      drawBtn2.innerText = `Draw Lotto Plus 1`;
      drawBtn2.addEventListener("click", () => {
        if (clicked2) {
          return;
        }
        lotto(tickets, "Lotto Plus 1");

        clicked2 = true;
      });
    }

    if (lotto_plus2) {
      //Lotto Plus 2
      let clicked3 = false;
      const drawBtn3 = document.querySelector(".draw-btn3");
      drawBtn3.innerText = `Draw Lotto Plus 2`;
      drawBtn3.addEventListener("click", () => {
        if (clicked3) {
          return;
        }
        lotto(tickets, "Lotto Plus 2");

        clicked3 = true;
      });
    }
    function lotto(tickets, lottoName) {
      let results = [];

      let winningResults1 = drawNumbers(1, 52);
      updateDrawsHistory(winningResults1);
      //append winning balls
      const lottoResultsDiv = document.querySelector(".lotto-draw-results");
      const ballsDiv = document.createElement("div");
      ballsDiv.classList.add("balls-div");
      winningResults1.forEach((number) => {
        const ball = document.createElement("div");
        ball.classList.add("ball");
        ball.innerText = number;

        if (number >= 1 && number <= 13) {
          ball.classList.add("red");
        } else if (number >= 14 && number <= 25) {
          ball.classList.add("yellow");
        } else if (number >= 26 && number <= 37) {
          ball.classList.add("green");
        } else if (number >= 38 && number <= 52) {
          ball.classList.add("blue");
        }
        ballsDiv.appendChild(ball);
      });
      lottoResultsDiv.appendChild(ballsDiv);
      tickets.map((ticket) => {
        const ticketId = ticket.ticketId;
        const boards = ticket.boards;

        boards.map((board) => {
          const boardId = board.boardId;

          const numbers = board.numbers;
          let matchesObj = {
            ticketId: ticketId,
            boardId: boardId,
            count: 0,
          };
          numbers.forEach((number) => {
            if (winningResults1.indexOf(number) !== -1) {
              matchesObj.count++;
            }
          });
          results.push(matchesObj);
        });
      });
      matchedBoards = results.filter((obj) => obj.count >= 1);
      if (matchedBoards.length > 0) {
        const adminWinAside = document.querySelector(".admin-win-aside");

        let message = `${lottoName} Results:
                Congragulations!`;
        matchedBoards.forEach((board) => {
          let boardInfo = `Board ${board.boardId}, matched ${board.count} numbers.`;
          message = message.concat(" ", boardInfo);
        });
        alert(message);
      } else {
        alert(`${lottoName} Results: You lost`);
      }
      localStorage.setItem("winners", JSON.stringify(matchedBoards));
    }
    function updateWinningTickets(arr) {
      //append to admin win aside
      const adminWinAside = document.querySelector(".admin-win-aside");
      arr.forEach((board) => {
        const ticketDiv = document.createElement("div");
        ticketDiv.classList.add("ticket-div");

        const ticketId = board.ticketId;

        const ticketDate = new Date().toISOString().split("T")[0];

        const ticketIdDiv = document.createElement("div");

        const dateDiv = document.createElement("div");

        ticketIdDiv.innerHTML = `ticketId: ${ticketId}`;
        dateDiv.innerText = `date: ${ticketDate}`;

        ticketDiv.appendChild(ticketIdDiv);
        ticketDiv.appendChild(dateDiv);
        adminWinAside.appendChild(ticketDiv);
      });
    }

    function updateDrawsHistory(arr) {
      const adminDrawAside = document.querySelector(".admin-draw-aside");
      const numbersDiv = document.createElement("div");
      numbersDiv.classList.add("numbers-div");
      arr.forEach((number) => {
        const numDiv = document.createElement("div");
        numDiv.classList.add("num-div");
        numDiv.innerText = number;

        numbersDiv.appendChild(numDiv);
      });
      adminDrawAside.appendChild(numbersDiv);
    }
  }
  function getMatched() {
    return matchedBoards;
  }
  return { draw, getMatched };
}
