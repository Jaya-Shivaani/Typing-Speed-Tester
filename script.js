const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing is a skill you can improve daily.",
  "Practice makes perfect when it comes to speed.",
  "Every great achievement starts with the decision to try.",
  "Stay focused and keep typing with accuracy!",
  "A journey of a thousand miles begins with a single step.",
  "Success is not the key to happiness. Happiness is the key to success.",
];

let textToType = "";
const textToTypeEl = document.getElementById("text-to-type");
const typedOutputEl = document.getElementById("typed-output");
const typingArea = document.getElementById("typing-area");
const timeSpan = document.getElementById("time");
const speedSpan = document.getElementById("speed");
const accuracySpan = document.getElementById("accuracy");
const resetBtn = document.getElementById("reset-btn");
const progressBar = document.getElementById("progress-bar");
const confettiEl = document.getElementById("confetti");

let timer = null;
let startTime = null;
let elapsed = 0;
let isRunning = false;
let testEnded = false;

// Confetti effect
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

function setNewSentence() {
  textToType = sentences[Math.floor(Math.random() * sentences.length)];
  textToTypeEl.textContent = textToType;
}

function showTypedOutput() {
  const typedText = typingArea.value;
  let resultHTML = "";
  for (let i = 0; i < textToType.length; i++) {
    if (typedText[i] == null) {
      resultHTML += `<span class="pending">${textToType[i]}</span>`;
    } else if (typedText[i] === textToType[i]) {
      resultHTML += `<span class="correct">${textToType[i]}</span>`;
    } else {
      resultHTML += `<span class="incorrect">${textToType[i]}</span>`;
    }
  }
  typedOutputEl.innerHTML = resultHTML;
  // Progress bar
  const progress = Math.min(typedText.length / textToType.length, 1);
  progressBar.style.width = `${progress * 100}%`;
}

function startTestOnType() {
  if (!isRunning && typingArea.value.length === 1) {
    isRunning = true;
    startTime = Date.now();
    timer = setInterval(() => {
      elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      timeSpan.textContent = elapsed;
    }, 100);
    resetBtn.disabled = false;
  }
}

function endTest() {
  clearInterval(timer);
  typingArea.disabled = true;
  isRunning = false;
  testEnded = true;
  calculateResults();
  launchConfetti();
}

function resetTest() {
  clearInterval(timer);
  typingArea.value = "";
  typingArea.disabled = false;
  timeSpan.textContent = "0";
  speedSpan.textContent = "0";
  accuracySpan.textContent = "0";
  typedOutputEl.innerHTML = "";
  confettiEl.innerHTML = "";
  progressBar.style.width = "0";
  isRunning = false;
  testEnded = false;
  elapsed = 0;
  setNewSentence();
  showTypedOutput();
  typingArea.focus();
  resetBtn.disabled = true;
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
  startTestOnType();
  if (!isRunning || testEnded) return;
  if (typingArea.value.length >= textToType.length) {
    endTest();
  }
});

// Stop test when Enter is pressed
typingArea.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && isRunning && !testEnded) {
    e.preventDefault(); // Prevent new line in textarea
    endTest();
  }
});

resetBtn.addEventListener("click", resetTest);

// Enable typing area on load and set sentence
window.onload = () => {
  typingArea.disabled = false;
  setNewSentence();
  showTypedOutput();
  typingArea.value = "";
  typingArea.focus();
  testEnded = false;
  resetBtn.disabled = true;
};
