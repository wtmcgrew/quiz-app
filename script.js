// Object array of questions for quiz
const questions = [
{
	question: "What is the capitol of Texas?",
	answers: [
		{ text: "Dallas", correct: false},
		{ text: "Austin", correct: true},
		{ text: "Houston", correct: false},
		{ text: "San Antonio", correct: false},
	]
},
{
	question: "Which person is NOT a former President?",
	answers: [
		{ text: "Barack Obama", correct: false},
		{ text: "Donald Trump", correct: false},
		{ text: "Hillary Clinton", correct: true},
		{ text: "Gerald Ford", correct: false},
	]
},
{
	question: "How many weeks are in a year?",
	answers: [
		{ text: 54, correct: false},
		{ text: 60, correct: false},
		{ text: 48, correct: false},
		{ text: 52, correct: true},
	]
}
];

// DOM will grab the info from object to display on index.html using ID
const questionText = document.getElementById("question");
const answerButtons = document.getElementById("answer-btns");
const nextButton = document.getElementById("next-btn");

let rightAnswer = document.getElementById("right-answer");

let currentQuestionIndex = 0;
let score = 0;

/*
Wull start current question at first index
Start score from 0
Display Next button that is hidden on CSS and display "Next"
Runs function logic for next question
*/
function startQuiz() {
	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "Next";
	showQuestion();
}


/*
currentQuestion will store the first element of object array
questionNUm will store the next element of object array
questionText on index.html will display the next question within the object
Iterate over answers using forEach method
*/
function showQuestion() {
	resetAnswers();
	let currentQuestion = questions[currentQuestionIndex];
	let questionNum = currentQuestionIndex + 1;
	questionText.innerHTML = questionNum + ". " + currentQuestion.question;

	currentQuestion.answers.forEach(answer => {
		const button = document.createElement("button");
		button.innerHTML = answer.text;
		button.classList.add("btn");
		answerButtons.appendChild(button);

		if(answer.correct) {
			button.dataset.correct = answer.correct;
		}

		button.addEventListener("click", selectAnswer);
	});
}

/*
Hides the btn-group class on index.html
Will remove a child element if present
	Remove all the previous answers of the previous question
*/
function resetAnswers() {
	nextButton.style.display = "none";
	while(answerButtons.firstChild) {
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

/*
When an amswer button is clicked it will display the correct or incorrect answer
ams.target displays the selected element of the button when clicked
Then it will check if the dataset is true
If correct it will add class name correct, or it will add class name incorrect
*/
function selectAnswer(ans) {
	const selectedBtn = ans.target;
	const isCorrect = selectedBtn.dataset.correct === "true";

	if(isCorrect) {
		selectedBtn.classList.add("correct");
		score++;
	} else {
		selectedBtn.classList.add("incorrect");
	}
	Array.from(answerButtons.children).forEach(button => {
		if(button.dataset.correct === "true") {
			button.classList.add("correct");
		}
		button.disabled = true;
		
	});
	nextButton.style.display = "block"; // Displays Next button (hidden right now on CSS)
}

function showScore() {
	resetAnswers();
	questionText.innerHTML = `You scored ${score} out of ${questions.length}!`;
	nextButton.innerHTML = "Play Again";
	nextButton.style.display = "block";
}

// This will move to next question or show final score at the end once the conditional statement is false
function nextQuestion() {
	currentQuestionIndex++;
	if(currentQuestionIndex < questions.length) {
		showQuestion();
	} else {
		showScore();
	}
}

// When Next button is clicked, it will go to next question; if not it will restart quiz
nextButton.addEventListener("click", ()=> {
	if(currentQuestionIndex < questions.length) {
		nextQuestion();
	} else {
		startQuiz();
	}
})

startQuiz();