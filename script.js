let questions = [];
let answers = [];

// Load questions
fetch('questions.txt')
  .then(res => res.text())
  .then(data => {
    questions = data.split('\n').map(q => q.trim());
  });

// Load answers
fetch('answers.txt')
  .then(res => res.text())
  .then(data => {
    answers = data.split('\n').map(a => a.trim());
  });

function search() {
  const input = document.getElementById('searchBox').value.toLowerCase();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "";

  const matches = questions
    .map((q, i) => ({ q, i }))
    .filter(obj => obj.q.toLowerCase().includes(input));

  if (matches.length === 0) {
    resultDiv.innerHTML = "<p>❌ No matching question found.</p>";
    return;
  }

  matches.forEach(({ q, i }) => {
    const questionEl = document.createElement('div');
    questionEl.innerHTML = `🔎 <span style="font-weight:bold; background:yellow;">${q}</span>`;
    questionEl.style.cursor = 'pointer';
    questionEl.style.marginBottom = '10px';

    questionEl.addEventListener('click', () => {
      const answerEl = document.createElement('div');
      answerEl.innerHTML = `📜 <span style="color:cyan;">${answers[i]}</span>`;
      resultDiv.innerHTML = ""; // Clear existing
      resultDiv.appendChild(questionEl);
      resultDiv.appendChild(answerEl);
    });

    resultDiv.appendChild(questionEl);
  });
}
