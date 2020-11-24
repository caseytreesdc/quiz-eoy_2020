const question = document.getElementById("question");
const questionImage = document.getElementById("questionImage");
const explanation = document.getElementById("explanation");
const choices = Array.from( document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const nextquestion = document.getElementById("nextquestion");
const choicecontainer = document.getElementsByClassName("choice-container");
const progressBarFull = document.getElementById("progressBarFull");

console.log(choices, choices[3].parentElement);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
    questionImage: "<img alt='aerial shot of tidal basin' src='images/facts-air.jpg' width='100%'>",
    question: "Poor air quality is a common problem in many urban areas. How many tons of pollutants are removed from the air each year by D.C.’s trees?",
    explanation: "At a time when hospital space is in high demand, this leads to 1006 fewer acute respiratory incidences, 4 fewer hospital visits and 2 fewer deaths per year.",
    choice1: "619",
    choice2: "301", 
    choice3: "548",
    choice4: "111",
    answer: 1
    },
    {
    questionImage: "<img alt='big tree trunks!' src='images/facts-carbon.jpg' width='100%'>",
    question: "Trees sequester carbon in new growth each year and the amount of carbon sequestered annually increases with the size and health of the trees. How much carbon is stored in D.C.’s trees each year?",
    explanation: "During one year a single mature tree will absorb more than 48 pounds of CO2.", 
    choice1: "53,400 tons",
    choice2: "26,700 tons", 
    choice3: "31,300 tons",
    choice4: "18,900 tons",
    answer: 2, 
    },
    {
    questionImage: "<img alt='a beautiful magnolia near the house' src='images/facts-ac.jpg' width='100%'>",
    question: "We’re approaching another hot summer. How much can carefully positioned trees reduce a household’s energy consumption for air conditioning?",
    explanation: "The proper placement of only three trees (like those you can get for your yard through our residential planting programs) can save an average household between $100 and $250 in energy costs annually.",
    choice1: "30%",
    choice2: "20%", 
    choice3: "90%",
    choice4: "15%",
    answer: 1
    },
    {
    questionImage: "<img alt='tulip leaves in the fall' src='images/facts-tulip.jpg' width='100%'>",
    question: "What species of tree as a population sequesters the most carbon in D.C.?",
    explanation: "These fast-growing large canopy trees account for 2,765 tons of net carbon sequestration each year in D.C. all by themselves!",
    choice1: "American Beech",
    choice2: "Box Elder", 
    choice3: "Sweetgum",
    choice4: "Tulip Tree",
    answer: 4
    },
    {
    questionImage: "<img alt='trees in downtown' src='images/facts-health.jpg' width='100%'>",
    question: "Of trees surveyed in D.C., what percentage were found to be in good to excellent health?",
    explanation: "Tree health helps determine how resilient the canopy can be when faced with various pests and diseases.",
    choice1: "75%",
    choice2: "62%", 
    choice3: "91%",
    choice4: "83%",
    answer: 4
    },
]

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    //console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
   if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        return window.location.assign("https://connect.clickandpledge.com/w/Form/fde9cd97-fc42-4d0e-a5e5-1fbe1322bf83?trk=spring20quiz");
      }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    explanation.innerText = currentQuestion.explanation;
    questionImage.innerHTML = currentQuestion.questionImage;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });


    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers=false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const correctAnswer = currentQuestion.answer;

        console.log(choices, choices[correctAnswer-1].parentElement);
        console.log(correctAnswer);
        
        const classToApply = 
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

            if (classToApply === "correct") {
                incrementScore(CORRECT_BONUS);
            }

            if (classToApply === "incorrect") {
                choices[correctAnswer-1].parentElement.classList.add("correct");
            }

            console.log(questionImage.innerText);
          

        selectedChoice.parentElement.classList.add(classToApply);
        explanation.classList.remove("correct-answer-hidden");
        explanation.classList.add("correct-answer-showing");

        setTimeout( () => {
           //selectedChoice.parentElement.classList.remove(classToApply);
           //choices[correctAnswer-1].parentElement.classList.remove("correct");
           //explanation.classList.remove("correct-answer-showing");
           //explanation.classList.add("correct-answer-hidden");
            //getNewQuestion();
        }, 2000)

        
    });
});

nextquestion.addEventListener("click", e => {
    getNewQuestion();

    explanation.classList.remove("correct-answer-showing");
    explanation.classList.add("correct-answer-hidden");
        
    for (var i = 0; i < choices.length; i++) {
            choices[i].parentElement.classList.remove("correct", "incorrect");
        }

    questionImage.scrollIntoView();
    
});


incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();


