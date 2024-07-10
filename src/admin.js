//export admin function

export function admin(tickets) {
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

  function lotto(tickets, lottoName) {
    let clicked = false;
    const drawBtn1 = document.querySelector(".draw-btn1");
    drawBtn1.addEventListener("click", () => {
      if (clicked) {
        return;
      }
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
      clicked = true;
    });
  }
  lotto(tickets, "Lotto");
}
