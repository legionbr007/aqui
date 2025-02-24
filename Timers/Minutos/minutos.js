let startBtn = document.getElementById('startBtn');
let stopBtn = document.getElementById('stopBtn');
let timeInput = document.getElementById('timeInput');
let timeDisplay = document.getElementById('timeDisplay');

let timer;
let totalTimeInSeconds;
let isRunning = false; // Variável para controlar se o cronômetro está rodando

// Função para iniciar o cronômetro
function startTimer() {
  if (isRunning) return; // Impede iniciar o cronômetro se já estiver rodando

  isRunning = true;
  totalTimeInSeconds = parseInt(timeInput.value) * 60; // Converte minutos para segundos
  updateDisplay(totalTimeInSeconds);

  // Intervalo para diminuir o tempo
  timer = setInterval(function () {
    if (totalTimeInSeconds <= 0) {
      clearInterval(timer);
      isRunning = false; // Marca como não rodando quando terminar
    } else {
      totalTimeInSeconds--;
      updateDisplay(totalTimeInSeconds);
    }
  }, 1000);
}

// Função para atualizar o display do cronômetro
function updateDisplay(seconds) {
  let minutes = Math.floor(seconds / 60);
  let secondsLeft = seconds % 60;

  // Formatar para 2 dígitos (ex: 05, 03)
  minutes = minutes < 10 ? '0' + minutes : minutes;
  secondsLeft = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;

  timeDisplay.textContent = `${minutes}:${secondsLeft}`;
}

// Função para parar o cronômetro
function stopTimer() {
  if (!isRunning) return; // Impede parar se o cronômetro não estiver rodando

  clearInterval(timer);
  isRunning = false; // Marca como não rodando
  timeDisplay.textContent = '00:00'; // Resetar o display
}

// Evento de click para iniciar
startBtn.addEventListener('click', startTimer);

// Evento de click para parar
stopBtn.addEventListener('click', stopTimer);