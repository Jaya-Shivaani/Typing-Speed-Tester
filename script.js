let startTime;
const displayText = document.getElementById("text-display").innerText;
const inputArea = document.getElementById("input-area");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

inputArea.addEventListener("input", () => {
  if (!startTime) startTime = new Date();

  const inputText = inputArea.value;
  const elapsedTime = (new Date() - startTime) / 60000; // in minutes
  const wordCount = inputText.trim().split(/\s+/).length;
  const wpm = Math.round(wordCount / elapsedTime);
  wpmDisplay.textContent = isNaN(wpm) ? 0 : wpm;

  let correctChars = 0;
  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i] === displayText[i]) correctChars++;
  }
  const accuracy = Math.round((correctChars / inputText.length) * 100);
  accuracyDisplay.textContent = isNaN(accuracy) ? 0 : accuracy;
});

function startTest() {
  inputArea.value = "";
  startTime = null;
  wpmDisplay.textContent = 0;
  accuracyDisplay.textContent = 0;
}
