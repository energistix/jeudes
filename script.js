let currentPlayer = 1
let currentScore = 0
let isAIPlaying = false

async function waitFor(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function disableButtons() {
  console.log("test")
  isAIPlaying = true
  document.getElementById("roll").classList.add("disabled")
  document.getElementById("hold").classList.add("disabled")
  document.getElementById("new-game").classList.add("disabled")
}

function enableButtons() {
  isAIPlaying = false
  document.getElementById("roll").classList.remove("disabled")
  document.getElementById("hold").classList.remove("disabled")
  document.getElementById("new-game").classList.remove("disabled")
}

function restart() {
  currentPlayer = 1
  currentScore = 0
  document.querySelector(`#player1 .name img`).style.visibility = "visible"
  document.querySelector(`#player1 .current-score div`).textContent = currentScore
  document.querySelector(`#player1 .score`).textContent = 0

  document.querySelector(`#player2 .name img`).style.visibility = "hidden"
  document.querySelector(`#player2 .current-score div`).textContent = currentScore
  document.querySelector(`#player2 .score`).textContent = 0
}

async function IAPlay(rolls) {
  await waitFor(1000)
  if (!rolls) {
    rolls = Math.floor(Math.random() * 10)
  } else if (rolls === 0) {
    return switchPlayer()
  }
  const roll = Math.floor(Math.random() * 6) + 1
  document.getElementById("dice").src = `./assets/diceImages/${roll}.svg`
  if (roll === 1) {
    currentScore = 0
    return switchPlayer()
  }
  currentScore += roll
  document.querySelector(`#player${currentPlayer} .current-score div`).textContent = currentScore
  if (currentScore < 20) {
    await waitFor(1000)
    await IAPlay()
  } else {
    switchPlayer()
  }
}

async function switchPlayer() {
  const playerScore = document.querySelector(`#player${currentPlayer} .score`)
  const newScore = Number(playerScore.textContent) + currentScore
  playerScore.textContent = newScore
  if (newScore >= 100) {
    alert(`Player ${currentPlayer} wins!`)
    return restart()
  }
  currentScore = 0
  document.querySelector(`#player${currentPlayer} .current-score div`).textContent = currentScore
  document.querySelector(`#player${currentPlayer} .name img`).style.visibility = "hidden"
  currentPlayer = currentPlayer === 1 ? 2 : 1
  document.querySelector(`#player${currentPlayer} .name img`).style.visibility = "visible"

  if (currentPlayer === 2 && document.querySelector("#toggle input").checked) {
    console.log("test")
    disableButtons()
    await IAPlay()
    enableButtons()
  }
}

document.getElementById("roll").addEventListener("click", function () {
  if (isAIPlaying) {
    return
  }
  const roll = Math.floor(Math.random() * 6) + 1
  document.getElementById("dice").src = `./assets/diceImages/${roll}.svg`
  if (roll === 1) {
    currentScore = 0
    switchPlayer()
  }
  currentScore += roll
  document.querySelector(`#player${currentPlayer} .current-score div`).textContent = currentScore
})

document.getElementById("hold").addEventListener("click", async function () {
  if (isAIPlaying) {
    return
  }
  switchPlayer()
})

document.getElementById("new-game").addEventListener("click", async function () {
  if (isAIPlaying) {
    return
  }
  restart()
})
