window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
    document.getElementById('start').play()
    document.querySelector(".score-container").classList.remove("hide") 
  };

  function startGame() {
    game.init('canvas')
    document.getElementById('background').play()
  }
};