const textToTypeList = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing is a skill you can improve daily.",
  "Practice makes perfect when it comes to speed.",
  "Every great achievement starts with the decision to try.",
  "Stay focused and keep typing with accuracy!",
];

// Select a random text each test
let textToType =
  textToTypeList[Math.floor(Math.random() * textToTypeList.length)];

const textToTypeEl = document.getElementById("text-to-type");
const typedOutputEl = document.getElementById("typed-output");
const typingArea = document.getElementById("typing-area");
const timeSpan = document.getElementById("time");
const speedSpan = document.getElementById("speed");
const accuracySpan = document.getElementById("accuracy");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const progressBar = document.getElementById("progress-bar");
const confettiEl = document.getElementById("confetti");

let timer = null;
let startTime = null;
let elapsed = 0;
let isRunning = false;

// For confetti effect
function launchConfetti() {
  confettiEl.innerHTML = "";
  for (let i = 0; i < 80; i++) {
    let div = document.createElement("div");
    div.className = "confetti-piece";
    div.style.position = "absolute";
    div.style.width = "8px";
    div.style.height = "16px";
    div.style.borderRadius = "3px";
    div.style.background = `hsl(${Math.random() * 360},80%,80%)`;
    div.style.left = Math.random() * 98 + "vw";
    div.style.top = Math.random() * 10 + "vh";
    div.style.opacity = "0.7";
    let dropDistance = 70 + Math.random() * 25;
    let duration = 1.2 + Math.random();
    div.animate(
      [
        { transform: "translateY(0)", opacity: 0.7 },
        {
          transform: `translateY(${dropDistance}vh) rotate(${
            Math.random() * 180
          }deg)`,
          opacity: 0,
        },
      ],
      {
        duration: duration * 1000,
        fill: "forwards",
      }
    );
    confettiEl.appendChild(div);
    setTimeout(() => div.remove(), duration * 900);
  }
}

function showTextToType() {
  textToTypeEl.textContent = textToType;
}

function showTypedOutput() {
  const typedText = typingArea.value;
  let resultHTML = "";
  let correctChars = 0;
  for (let i = 0; i < textToType.length; i++) {
    if (typedText[i] == null) {
      resultHTML += `<span class="pending">${textToType[i]}</span>`;
    } else if (typedText[i] === textToType[i]) {
      resultHTML += `<span class="correct">${textToType[i]}</span>`;
      correctChars++;
    } else {
      resultHTML += `<span class="incorrect">${textToType[i]}</span>`;
    }
  }
  typedOutputEl.innerHTML = resultHTML;
  // Progress bar
  const progress = Math.min(typedText.length / textToType.length, 1);
  progressBar.style.width = `${progress * 100}%`;
}

function startTest() {
  textToType =
    textToTypeList[Math.floor(Math.random() * textToTypeList.length)];
  showTextToType();
  typedOutputEl.innerHTML = "";
  typingArea.value = "";
  typingArea.disabled = false;
  typingArea.focus();
  startBtn.disabled = true;
  resetBtn.disabled = false;
  elapsed = 0;
  timeSpan.textContent = "0";
  speedSpan.textContent = "0";
  accuracySpan.textContent = "0";
  isRunning = true;
  startTime = Date.now();
  progressBar.style.width = "0";
  confettiEl.innerHTML = "";
  showTypedOutput();
  timer = setInterval(() => {
    elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    timeSpan.textContent = elapsed;
  }, 100);
}

function endTest() {
  clearInterval(timer);
  typingArea.disabled = true;
  isRunning = false;
  calculateResults();
  startBtn.disabled = false;
  launchConfetti();
}

function resetTest() {
  clearInterval(timer);
  typingArea.value = "";
  typingArea.disabled = true;
  timeSpan.textContent = "0";
  speedSpan.textContent = "0";
  accuracySpan.textContent = "0";
  startBtn.disabled = false;
  resetBtn.disabled = true;
  typedOutputEl.innerHTML = "";
  confettiEl.innerHTML = "";
  progressBar.style.width = "0";
  showTextToType();
}

function calculateResults() {
  const typedText = typingArea.value.trim();
  const wordCount = typedText === "" ? 0 : typedText.split(/\s+/).length;
  const minutes = elapsed / 60;
  const speed = minutes > 0 ? (wordCount / minutes).toFixed(2) : 0;
  speedSpan.textContent = speed;

  let correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === textToType[i]) correctChars++;
  }
  const accuracy =
    textToType.length === 0
      ? 0
      : ((correctChars / textToType.length) * 100).toFixed(2);
  accuracySpan.textContent = accuracy;
}

typingArea.addEventListener("input", () => {
  showTypedOutput();
  if (!isRunning) return;
  if (typingArea.value.length >= textToType.length) {
    endTest();
  }
});

startBtn.addEventListener("click", startTest);
resetBtn.addEventListener("click", resetTest);

typingArea.disabled = true;
resetBtn.disabled = true;

showTextToType();
showTypedOutput();
