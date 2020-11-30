const question = document.getElementById("question");
const questionImage = document.getElementById("questionImage");
const explanation = document.getElementById("explanation");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const nextquestion = document.getElementById("nextquestion");
const choicecontainer = document.getElementsByClassName("choice-container");
const progressBarFull = document.getElementById("progressBarFull");

// console.log(choices, choices[3].parentElement);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    questionImage:
      "<img alt='view of Washington Monument through the trees' src='images/eoy-q1.jpg' width='100%'>",
    question: "Without volunteers, Casey Trees did not plant in 2020.",
    explanation:
      "False! The show must go. Or rather, the trees must grow. Thanks to our meticulous planning and planting process, we have trees planted, picked, and shipped to DC from our Farm long before the volunteer events kick-off. We had trees to get in the ground, even if they were planted without the fanfare of volunteers.",
    choice1: "True",
    choice2: "False",
    answer: 2,
  },
  {
    questionImage:
      "<img alt='new crew with old crew' src='images/eoy-q2.jpg' width='100%'>",
    question:
      "Casey Trees had to hire additional crew members to fill the gap left by the work of our volunteers.",
    explanation:
      "Yes! It’s true. Our volunteers work tirelessly throughout each weekend in the spring planting trees. Without their help, we had to hire 6 crew members. Many hands make light work and while we don’t have nearly as many hands as we did with Team Leaders, Group Volunteers, etc, we certainly have more help! We are looking forward to expanding our work with volunteers and expanded crew in the coming seasons!",
    choice1: "True",
    choice2: "False",
    answer: 1,
  },
  {
    questionImage:
      "<img alt='all the staff like it used to be' src='images/eoy-q3.jpg' width='100%'>",
    question:
      "Plantings feel the same without Citizen Foresters, volunteers, and community members.",
    explanation:
      "That could not be more false! Plantings without volunteers are (literally) all work and no play. While it feels great to continue our mission of planting trees, volunteers bring the spark, joy, and indescribable community feel to each and every planting. Crew member Alex said it best, “Volunteers  at a planting would give you extra energy - that drive to get you going since they want to be out there planting so badly.” Every day folks from every corner of the city, from different careers with different experiences coming together for a common goal - you can’t replicate that. We miss it dearly!",
    choice1: "True",
    choice2: "False",
    answer: 2,
  },
  {
    questionImage:
      "<img alt='newly planted trees' src='images/eoy-q4.jpg' width='100%'>",
    question:
      "We planted almost half as many trees this year as we did last year. (Not just Community Tree Plantings, we’re talking about all planting programs including our residential plantings, community plantings, park plantings, etc).",
    explanation:
      "When we said many hands make light work, we weren’t kidding! Last year we planted over 4,440 trees. This year? Thanks to shutdowns, stay at home orders, necessary safety protocols, and additional pandemic logistical limitations, we’ve planted 2,418 trees. We’re incredibly proud of that number - but it goes to show what an impact our volunteers make.",
    choice1: "True",
    choice2: "False",
    answer: 1,
  },
  {
    questionImage:
      "<img alt='casey tree farm' src='images/eoy-q5.jpg' width='100%'>",
    question:
      "We’ve cut back production at the Casey Tree Farm due to low planting numbers.",
    explanation:
      "We plan years in advance at the Casey Tree Farm. Our fields are full of trees that are destined for greatness - destined to be planted in the District of the Columbia! Regardless of our planting numbers, the Farm keeps on producing, which is why we’re so thankful to our crew for their continued hard work getting trees in the ground. It’s also a huge reason we miss our volunteers - they help us accomplish so much! At the end of the day, it’s nice to know no matter what the universe throws at us, we’ll have trees to dig up in Virginia and plant in Washington.",
    choice1: "True",
    choice2: "False",
    answer: 2,
  },
];

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
    return window.location.assign(
      "https://connect.clickandpledge.com/w/Form/75ace67d-9469-48de-a04f-3f86dfb86f7e?utm_source=leaflet&utm_medium=email&utm_campaign=eoy&utm_content=email3&trk=givingtuesday3"
    );
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

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    const correctAnswer = currentQuestion.answer;

    console.log(choices, choices[correctAnswer - 1].parentElement);
    console.log(correctAnswer);

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    if (classToApply === "incorrect") {
      choices[correctAnswer - 1].parentElement.classList.add("correct");
    }

    console.log(questionImage.innerText);

    selectedChoice.parentElement.classList.add(classToApply);
    explanation.classList.remove("correct-answer-hidden");
    explanation.classList.add("correct-answer-showing");

    setTimeout(() => {
      //selectedChoice.parentElement.classList.remove(classToApply);
      //choices[correctAnswer-1].parentElement.classList.remove("correct");
      //explanation.classList.remove("correct-answer-showing");
      //explanation.classList.add("correct-answer-hidden");
      //getNewQuestion();
    }, 2000);
  });
});

nextquestion.addEventListener("click", (e) => {
  getNewQuestion();

  explanation.classList.remove("correct-answer-showing");
  explanation.classList.add("correct-answer-hidden");

  for (var i = 0; i < choices.length; i++) {
    choices[i].parentElement.classList.remove("correct", "incorrect");
  }

  questionImage.scrollIntoView();
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
