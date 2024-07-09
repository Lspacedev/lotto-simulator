//export admin function

export function admin(tickets) {
  //random number generator
  function generateWinningNumbers(min, max) {
    let arr = [];
    while (arr.length < 6) {
      let num = Math.floor(Math.random() * (max - min + 1)) + min;
      if (arr.indexOf(num) === -1) {
        arr.push(num);
      }
    }

    return arr;
  }
  const drawBtn1 = document.querySelector(".draw-btn1");
  let winningResults1;
  drawBtn1.addEventListener("click", () => {
    winningResults1 = generateWinningNumbers(1, 52);
  });
  console.log(winningResults1);
}
