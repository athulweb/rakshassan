let questions = [];
let answers = [];

// Load both txt files
Promise.all([
  fetch('questions.txt').then(res => res.text()),
  fetch('answers.txt').then(res => res.text())
]).then(([qText, aText]) => {
  questions = qText.split('\n').map(line => line.trim()).filter(Boolean);
  answers = aText.split('\n').map(line => line.trim()).filter(Boolean);
}).catch(err => {
  document.getElementById('result').innerText = "❌ Failed to load files.";
  console.error("File load error:", err);
});

function search() {
  const input = document.getElementById('searchBox').value.trim().toLowerCase();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "";

  if (!input) return;

  const matches = questions
    .map((q, i) => ({ question: q, index: i }))
    .filter(obj => obj.question.toLowerCase().includes(input));

  if (matches.length === 0) {
    resultDiv.innerHTML = "<p>❌ No matches found.</p>";
    return;
  }

  matches.forEach(({ question, index }) => {
    const qDiv = document.createElement('div');
    qDiv.className = "question";
    qDiv.innerHTML = `🔍 <b>${question}</b>`;

    qDiv.onclick = () => {
      resultDiv.innerHTML = `
        <div class="question">🔍 <b>${question}</b></div>
        <div class="answer">📜 ${answers[index]}</div>
      `;
    };

    resultDiv.appendChild(qDiv);
  });
}
