//export admin function

export function admin(tickets, lotto_plus1, lotto_plus2) {
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
  let clicked1 = false;
  const drawBtn = document.querySelector(".draw-btn");
  drawBtn.innerText = `Draw Lotto`;
  drawBtn.addEventListener("click", () => {
    if (clicked1) {
      return;
    }
    lotto(tickets, "Lotto");

    clicked1 = true;
  });

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
    tickets.map((ticket) => {
      const boards = ticket.boards;
      console.log(ticket);
      boards.map((board) => {
        const boardId = board.boardId;

        const numbers = board.numbers;
        let matchesObj = {
          boardId: boardId,
          count: 0,
        };
        numbers.forEach((number) => {
          if (winningResults1.indexOf(number) !== -1) {
            matchesObj.count++;
          }
        });
        results.push(matchesObj);
        console.log(winningResults1);
        console.log(numbers);
      });
    });
    let matchedBoards = results.filter((obj) => obj.count >= 1);
    if (matchedBoards.length > 0) {
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
  }
  /*
  lotto(tickets, "Lotto");
  lotto(tickets, "Lotto Plus 1");
  lotto(tickets, "Lotto Plus 2");*/
}
