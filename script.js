document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const quizContainer = document.getElementById('quiz');
    const resultContainer = document.getElementById('result');
    const questionElement = document.getElementById('question');
    const answerElements = [
        document.getElementById('a'),
        document.getElementById('b'),
        document.getElementById('c'),
        document.getElementById('d')
    ];
    const answerTextElements = [
        document.getElementById('a_text'),
        document.getElementById('b_text'),
        document.getElementById('c_text'),
        document.getElementById('d_text')
    ];
    const submitButton = document.getElementById('submit');
    const scoreTextElement = document.getElementById('score-text');
    const percentageElement = document.getElementById('percentage');
    const feedbackElement = document.getElementById('feedback');
    const restartButton = document.getElementById('restart');

    // Quiz state
    let currentQuestion = 0;
    let score = 0;
    let selectedAnswer = null;

    // Quiz questions
    const questions = [
        {
            question: "What is the capital of France?",
            answers: {
                a: "Berlin",
                b: "Madrid",
                c: "Paris",
                d: "Rome"
            },
            correctAnswer: "c"
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: {
                a: "Venus",
                b: "Mars",
                c: "Jupiter",
                d: "Saturn"
            },
            correctAnswer: "b"
        },
        {
            question: "What is the largest mammal?",
            answers: {
                a: "Elephant",
                b: "Blue Whale",
                c: "Giraffe",
                d: "Polar Bear"
            },
            correctAnswer: "b"
        }
    ];

    // Load question function
    function loadQuestion() {
        const currentQuizQuestion = questions[currentQuestion];
        
        questionElement.textContent = currentQuizQuestion.question;
        
        answerTextElements.forEach((el, index) => {
            el.textContent = currentQuizQuestion.answers[Object.keys(currentQuizQuestion.answers)[index]];
        });
        
        // Clear previous selection
        answerElements.forEach(answer => {
            answer.checked = false;
        });
        
        selectedAnswer = null;
    }

    // Event listeners for answer selection
    answerElements.forEach(answer => {
        answer.addEventListener('change', (e) => {
            selectedAnswer = e.target.id;
        });
    });

    // Submit button functionality
    submitButton.addEventListener('click', () => {
        // Check if an answer is selected
        if (selectedAnswer === null) {
            alert('Please select an answer!');
            return;
        }

        // Check if answer is correct
        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
            score++;
        }
        
        currentQuestion++;
        
        // Check if quiz is complete
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });

    // Show results function
    function showResults() {
        quizContainer.style.display = 'none';
        resultContainer.style.display = 'block';
        
        const percentage = Math.round((score / questions.length) * 100);
        
        scoreTextElement.textContent = `Your score: ${score}/${questions.length}`;
        percentageElement.textContent = `Percentage: ${percentage}%`;
        
        // Provide feedback based on score
        if (percentage >= 80) {
            feedbackElement.textContent = "Excellent! You know your stuff!";
        } else if (percentage >= 60) {
            feedbackElement.textContent = "Good job! You did well.";
        } else if (percentage >= 40) {
            feedbackElement.textContent = "Not bad, but there's room for improvement.";
        } else {
            feedbackElement.textContent = "Keep practicing! You'll get better.";
        }
    }

    // Restart quiz function
    restartButton.addEventListener('click', () => {
        currentQuestion = 0;
        score = 0;
        
        quizContainer.style.display = 'block';
        resultContainer.style.display = 'none';
        
        loadQuestion();
    });

    // Initialize the quiz
    loadQuestion();
});