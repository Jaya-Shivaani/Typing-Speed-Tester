// script.js

const textToType = "The quick brown fox jumps over the lazy dog.";
const textElement = document.getElementById("text-to-type");
const typingArea = document.getElementById("typing-area");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

const timeDisplay = document.getElementById("time");
const speedDisplay = document.getElementById("speed");
const accuracyDisplay = document.getElementById("accuracy");

let startTime = null;
let timerInterval = null;

function startTest() {
  typingArea.disabled = false;
  typingArea.value = "";
  typingArea.focus();
  startBtn.disabled = true;
  resetBtn.disabled = false;

  startTime = new Date().getTime();
  timerInterval = setInterval(updateTimer, 100);
}

function updateTimer() {
  const elapsed = (new Date().getTime() - startTime) / 1000;
  timeDisplay.textContent = elapsed.toFixed(1);
}

function calculateResults() {
  clearInterval(timerInterval);
  const elapsedMinutes = (new Date().getTime() - startTime) / 1000 / 60;
  const typedText = typingArea.value;

  // Calculate words typed
  const wordsTyped = typedText.trim().split(/\s+/).length;

  // Calculate accuracy
  let correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === textToType[i]) {
      correctChars++;
    }
  }
  const accuracy = (correctChars / textToType.length) * 100;

  const wpm = (wordsTyped / elapsedMinutes).toFixed(2);

  speedDisplay.textContent = isNaN(wpm) || !isFinite(wpm) ? "0" : wpm;
  accuracyDisplay.textContent = isNaN(accuracy) ? "0" : accuracy.toFixed(2);

  startBtn.disabled = false;
  typingArea.disabled = true;
}

function resetTest() {
  clearInterval(timerInterval);
  timeDisplay.textContent = "0";
  speedDisplay.textContent = "0";
  accuracyDisplay.textContent = "0";
  typingArea.value = "";
  typingArea.disabled = true;
  startBtn.disabled = false;
  resetBtn.disabled = true;
}

startBtn.addEventListener("click", startTest);
resetBtn.addEventListener("click", resetTest);
typingArea.addEventListener("input", () => {
  if (!startTime) return;
  if (typingArea.value.length >= textToType.length) {
    calculateResults();
  }
});

// Initialize
textElement.textContent = textToType;
typingArea.disabled = true;
resetBtn.disabled = true;
