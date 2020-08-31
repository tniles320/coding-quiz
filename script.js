var startButton = document.getElementById("start-btn");
var contentContainer = document.getElementById("content-container");
var questionElement = document.getElementById("question");
var answerBtns = document.getElementById("answer-buttons");
var nextBtn = document.getElementById("next-btn");
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
var btn4 = document.getElementById("btn4");
var answerResult = document.getElementById("answer-result");
var time = document.getElementById("time");
var scoreDisplay = document.getElementById("score");
var startPage = document.getElementById("start-page");
var highScoreDisplay = document.getElementById("highscore");

var score = 0;
var questionIndex = 0;
var timer = 0;
var localHighScore = localStorage.getItem("highscore");

// array of question objects
var questions = [
    //properties and property values for each question object
    {
        question: "What does HTML stand for?",
        answers: [
            { 
              text: "Hyper Trainer Marking Language", 
              correct: false 
            },
            { 
              text: "Hyper Text Marketing Language",
              correct: false 
            },
            { 
              text: "Hyper Text Markup Language",
              correct: true 
            },
            { 
              text: "Hyper Text Markup Leveler", 
              correct: false 
            },
        ]
        
    },

    {
        question: "Which of the following is the correct way of making a string in Javascript?",
        answers: [
            { text: "var Text;", correct: false },
            { text: "var text = 'text';", correct: true },
            { text: "string text = 'text'", correct: false },
            { text: "var = 'text';", correct: false },
        ]
        
    },
    {
        question: "In JavaScript, what element is used to store multiple values in a single variable?",
        answers: [
            { text: "Functions", correct: false },
            { text: "Strings", correct: false },
            { text: "Arrays", correct: true },
            { text: "Variables", correct: false },
        ]
        
    },
    {
        question: "Which of these represents a boolean?",
        answers: [
            { text: "false", correct: true },
            { text: "17", correct: false },
            { text: "boo + lean", correct: false },
            { text: "Object[]", correct: false },
        ]
        
    },
    {
        question: "What is the element used – and hidden – in code that explains things and makes the content more readable?",
        answers: [
            { text: "Quotations", correct: false },
            { text: "Comments", correct: true },
            { text: "Notes", correct: false },
            { text: "Comparisons", correct: false },
        ]
        
    },
    {
        question: "What is the most important CSS property, used for controlling the layout?",
        answers: [
            { text: "Margin", correct: false },
            { text: "<div>", correct: false },
            { text: "Table", correct: false },
            { text: "Display", correct: true },
        ]
        
    },
    {
        question: "What is the CSS property that sets the size of the whitespace outside the borders of the content?",
        answers: [
            { text: "Spacer", correct: false },
            { text: "Margin", correct: true },
            { text: "Block-level", correct: false },
            { text: "Line", correct: false },
        ]
        
    },
    {
        question: "What HTML tag is used to render or transform text into an important (bold) version?",
        answers: [
            { text: "<strong>", correct: true },
            { text: "<em>", correct: false },
            { text: "<blockquote>", correct: false },
            { text: "<a>", correct: false },
        ]
        
    },
    {
        question: "What declaration MUST be included as the first item in an HTML document before the tag and is used to provide instructions to the web browser?",
        answers: [
            { text: "<code>", correct: false },
            { text: "<embed>", correct: false },
            { text: "<caption>", correct: false },
            { text: "<!DOCTYPE>", correct: true },
        ]
        
    },
    {
        question: "What is the type of loop that continues through a block of code as long as the specified condition remains TRUE?",
        answers: [
            { text: "True loop", correct: false },
            { text: "Conditional loop", correct: false },
            { text: "While loop", correct: true },
            { text: "Else loop", correct: false },
        ]
        
    },

]

// start button starts quiz by calling startQuiz function
startButton.addEventListener("click", startQuiz);

// gets highscore from local storage
function getHighScore() {
    var localHighScore = localStorage.getItem("highscore");
    if(localHighScore == null) {
        highScoreDisplay.innerText = ("Highscore: 0");
    } else {
    highScoreDisplay.innerText = ("Highscore: " + localHighScore);
    }
}
// calls function
getHighScore();
    
// hides start buttton and text and displays questions and answer buttons
function startQuiz() {
    score = 0;
    // updates score as correct answers are clicked
    scoreDisplay.innerText = ("Score: " + score)
    questionIndex = 0;
    timer = 120;
    // hides start button and text
    startPage.classList.add("hide");
    startButton.classList.add("hide");
    // shows question and answer buttons
    contentContainer.classList.remove("hide");
    showQuestion();
    // starts timer
    var countdown = function() {
        time.innerText = ("Time: " + timer);
        timer--;
        // if timer reaches 0 ends quiz
        if(timer === -1) {
            alert("You've ran out of time!")
            endQuiz()
            //stops timer
            clearInterval(startCountdown);
            // hides next button
            nextBtn.classList.add("hide");
        }
        // when all questions are answered timer stops
        if(questionIndex >= 9) {
            clearInterval(startCountdown);
        }
    }
    var startCountdown = setInterval(countdown, 1000);
}

// when next button clicked
nextBtn.addEventListener("click", function() {
    // hides next button
    nextBtn.classList.add("hide");
    // increases question index
    questionIndex++;
    // if there are more questions
    if(questionIndex < 10) {
    // show next question
    showQuestion();
    // if no more questions
    } else {
        // end quiz
        endQuiz();
    }
});

// when quiz ends
function endQuiz() {
    // hides questions and answer buttons
    contentContainer.classList.add("hide");
    // shows start buttons
    startButton.classList.remove("hide");
    // shows start page text
    startPage.classList.remove("hide");
    // changes "start" to "restart"
    startButton.innerText = "Restart";
    // resets questions to beginning
    questionIndex = 0;
    // alerts the score
    alert("Your score is: " + score + "!");
    // if score is more than the highscore
    if(score > localHighScore) {
        // highscore is stored
        localStorage.setItem("highscore", score);
    }
    getHighScore();
};

// shows next question and answers
function showQuestion() {
    // resets buttons colors by removing classes
    btn1.classList.remove("correct", "wrong");
    btn2.classList.remove("correct", "wrong");
    btn3.classList.remove("correct", "wrong");
    btn4.classList.remove("correct", "wrong");
    // shows question based off of current question index
    questionElement.innerText = questions[questionIndex].question;
    // assigns answers to each button
    btn1.innerText = questions[questionIndex].answers[0].text;
    btn2.innerText = questions[questionIndex].answers[1].text;
    btn3.innerText = questions[questionIndex].answers[2].text;
    btn4.innerText = questions[questionIndex].answers[3].text;
    // calls answer function when button is clicked
    answerBtns.addEventListener("click", selectAnswer)
}

// changes color of answer buttons when a button is clicked
function selectAnswer() {
        // if answer is correct button will change to green
        if (questions[questionIndex].answers[0].correct == true) {
           btn1.classList.add("correct");
           // if wrong it will change to red
        } else {
            btn1.classList.add("wrong");
        };
        if (questions[questionIndex].answers[1].correct == true) {
            btn2.classList.add("correct");
         } else {
             btn2.classList.add("wrong");
         };
         if (questions[questionIndex].answers[2].correct == true) {
            btn3.classList.add("correct");
         } else {
             btn3.classList.add("wrong");
         };
         if (questions[questionIndex].answers[3].correct == true) {
            btn4.classList.add("correct");
         } else {
             btn4.classList.add("wrong");
         };
         // shows next button
         nextBtn.classList.remove("hide");
        
};

// if answer button is correct adds to score if not it subtracts time
btn1.addEventListener("click", function() {
    if (questions[questionIndex].answers[0].correct == true) {
        score++
        scoreDisplay.innerText = ("Score: " + score)
     } else {
         timer -= 10
     };
});

btn2.addEventListener("click", function() {
    if (questions[questionIndex].answers[1].correct == true) {
        score++
        scoreDisplay.innerText = ("Score: " + score)
     } else {
         timer -= 10
     };
});

btn3.addEventListener("click", function() {
    if (questions[questionIndex].answers[2].correct == true) {
        score++
        scoreDisplay.innerText = ("Score: " + score)
     } else {
         timer -= 10
     };
});

btn4.addEventListener("click", function() {
    if (questions[questionIndex].answers[3].correct == true) {
        score++
        scoreDisplay.innerText = ("Score: " + score)
     } else {
         timer -= 10
     };
});