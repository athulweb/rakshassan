let questions = [], answers = [];

Promise.all([
  fetch('questions.txt').then(res => res.text()),
  fetch('answers.txt').then(res => res.text())
]).then(([qText, aText]) => {
  questions = qText.trim().split('\n');
  answers = aText.trim().split('\n');
});

document.getElementById('searchBox').addEventListener('input', function () {
  const query = this.value.trim().toLowerCase();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "";

  if (!query) return;

  let matchCount = 0;

  for (let i = 0; i < questions.length; i++) {
    if (questions[i].toLowerCase().includes(query)) {
      const highlighted = questions[i].replace(
        new RegExp(query, "gi"),
        (match) => `<mark>${match}</mark>`
      );
      resultDiv.innerHTML += `
        <div class="match">
          <strong>🔎 ${highlighted}</strong><br>
          📜 ${answers[i]}
        </div>`;
      matchCount++;
    }
  }

  if (matchCount === 0) {
    resultDiv.innerHTML = "👻 No result found";
  }
});

// Loader removal after animation
setTimeout(() => {
  document.getElementById('loader').style.display = "none";
}, 3000);
