const questionsPool = [
    { q: "What is the plural of 'child'?", options: ["Childs", "Children", "Childes", "Childer"], correct: 1 },
    { q: "Which word is an adjective?", options: ["Run", "Quickly", "Beautiful", "Sing"], correct: 2 },
    { q: "Choose the correct sentence.", options: ["He go to school.", "He goes to school.", "He going school.", "He gone to school."], correct: 1 },
    { q: "What’s the past of 'eat'?", options: ["Eated", "Ate", "Eaten", "Eat"], correct: 1 },
    { q: "Fill the blank: I have lived here ___ 5 years.", options: ["since", "for", "during", "at"], correct: 1 },
    // … добавь ещё 30–50 любых
  ];
  while (questionsPool.length < 30) {
    questionsPool.push(questionsPool[Math.floor(Math.random() * 5)]);
  }
  
  let current = 0;
  let correct = 0;
  let startTime = Date.now();
  
  const questionText = document.getElementById('question-text');
  const optionsDiv = document.getElementById('options');
  const resultDiv = document.getElementById('result');
  const quizDiv = document.getElementById('quiz');
  const progressBar = document.getElementById('progress-bar');
  const questionNumber = document.getElementById('question-number');
  
  const timeTaken = document.getElementById('time-taken');
  const totalQuestions = document.getElementById('total-questions');
  const correctAnswers = document.getElementById('correct-answers');
  const points = document.getElementById('points');
  const scoreText = document.getElementById('score-text');
  
  function showQuestion() {
    const q = questionsPool[current];
    questionText.textContent = q.q;
    questionNumber.textContent = `${current + 1} / 30`;
    optionsDiv.innerHTML = '';
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.onclick = () => {
        if (i === q.correct) correct++;
        nextQuestion();
      };
      optionsDiv.appendChild(btn);
    });
    progressBar.innerHTML = `<div style="width: ${(current / 30) * 100}%"></div>`;
  }
  
  function nextQuestion() {
    current++;
    if (current < 30) {
      showQuestion();
    } else {
      showResult();
    }
  }
  
  function showResult() {
    quizDiv.classList.add('hidden');
    resultDiv.classList.remove('hidden');
    const totalTime = Math.round((Date.now() - startTime) / 1000);
    const percent = Math.round((correct / 30) * 100);
    const level = getLevel(percent);
  
    timeTaken.textContent = `${totalTime} сек.`;
    totalQuestions.textContent = '30';
    correctAnswers.textContent = correct;
    points.textContent = `${percent}%`;
    scoreText.textContent = `Ваш уровень: ${level}`;
  
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Правильно', 'Ошибки'],
        datasets: [{
          data: [percent, 100 - percent],
          backgroundColor: ['#4caf50', '#f44336'],
        }]
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        },
        cutout: '70%',
      }
    });
  }
  
  function getLevel(percent) {
    if (percent >= 90) return 'C2';
    if (percent >= 80) return 'C1';
    if (percent >= 70) return 'B2';
    if (percent >= 60) return 'B1';
    if (percent >= 50) return 'A2';
    return 'A1';
  }
  
  document.getElementById('review-btn').onclick = () => {
    alert("Функция проверки ошибок пока в разработке 🚧");
  };
  
  showQuestion();
  