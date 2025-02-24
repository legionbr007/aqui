let startBtn = document.getElementById('startBtn');
let stopBtn = document.getElementById('stopBtn');
let timeInput = document.getElementById('timeInput');
let timeDisplay = document.getElementById('timeDisplay');
let endMessage = document.getElementById('endMessage');

// Supondo que o slider de volume exista no HTML com id "volumeSlider"
let volumeSlider = document.getElementById('volumeSlider');

let timer;
let totalTimeInSeconds;
let isRunning = false; // Controle do cronômetro

// Função para iniciar o cronômetro
function startTimer() {
  if (isRunning) return; // Impede iniciar se já estiver rodando
  isRunning = true;
  endMessage.textContent = ""; // Limpa mensagem de fim, se houver
  totalTimeInSeconds = parseInt(timeInput.value) * 60; // Converte minutos para segundos
  updateDisplay(totalTimeInSeconds);

  timer = setInterval(function () {
    if (totalTimeInSeconds <= 0) {
      clearInterval(timer);
      isRunning = false;
      updateDisplay(0);
      endMessage.textContent = "O tempo terminou...";
      setTimeout(() => {
        playBeepSequence();
      }, 1000);
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
  minutes = minutes < 10 ? '0' + minutes : minutes;
  secondsLeft = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
  timeDisplay.textContent = `${minutes}:${secondsLeft}`;
}

// Função para parar o cronômetro
function stopTimer() {
  if (!isRunning) return;
  clearInterval(timer);
  isRunning = false;
  updateDisplay(0);
  endMessage.textContent = "";
}

// Função para tocar um beep usando a Web Audio API
// O volume é ajustado de acordo com o slider (valor entre 0 e 100, convertido para 0 a 1)
function beep() {
  let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let oscillator = audioCtx.createOscillator();
  let gainNode = audioCtx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.type = 'sine';
  oscillator.frequency.value = 1000; // Frequência em Hz
  
  // Obtém o volume atual do slider (se existir); se não, assume 100%
  let volume = volumeSlider ? parseInt(volumeSlider.value, 10) / 100 : 1;
  gainNode.gain.value = volume;
  
  oscillator.start();
  setTimeout(() => {
    oscillator.stop();
    audioCtx.close();
  }, 500); // Beep de 500ms
}

// Função para tocar a sequência de beep e exibir "Apitando: X"
function playBeepSequence() {
  let count = 5; // Número de beeps na sequência
  let beepInterval = setInterval(() => {
    endMessage.textContent = "Apitando: " + count;
    beep();
    count--;
    if (count <= 0) {
      clearInterval(beepInterval);
      setTimeout(() => {
        endMessage.textContent = "";
      }, 1000);
    }
  }, 1200);
}

// Eventos de clique
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
