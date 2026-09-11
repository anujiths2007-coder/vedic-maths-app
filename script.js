/* =========================================
   VEDAMATHS V2
   APPLICATION LOGIC
========================================= */


/* =========================================
   APP DATA
========================================= */

const classes = [
    {
        number: 1,
        title: "Class 1",
        description: "Numbers & basic calculations"
    },
    {
        number: 2,
        title: "Class 2",
        description: "Addition, subtraction & tables"
    },
    {
        number: 3,
        title: "Class 3",
        description: "Multiplication & division"
    },
    {
        number: 4,
        title: "Class 4",
        description: "Advanced arithmetic"
    },
    {
        number: 5,
        title: "Class 5",
        description: "Fractions & mental maths"
    },
    {
        number: 6,
        title: "Class 6",
        description: "Numbers & Vedic techniques"
    },
    {
        number: 7,
        title: "Class 7",
        description: "Algebra & arithmetic"
    },
    {
        number: 8,
        title: "Class 8",
        description: "Advanced calculations"
    },
    {
        number: 9,
        title: "Class 9",
        description: "Algebra & speed maths"
    },
    {
        number: 10,
        title: "Class 10",
        description: "Exam-focused mathematics"
    },
    {
        number: 11,
        title: "Class 11",
        description: "Higher mathematics"
    },
    {
        number: 12,
        title: "Class 12",
        description: "Advanced problem solving"
    }
];


/* =========================================
   TOPICS
========================================= */

const topics = [
    {
        id: "addition",
        icon: "➕",
        title: "Addition",
        description: "Learn faster ways to add numbers.",
        example: "48 + 27",
        explanation: "Add 48 + 20 first, then add 7.",
        idea: "Break a difficult calculation into smaller parts."
    },

    {
        id: "subtraction",
        icon: "➖",
        title: "Subtraction",
        description: "Subtract numbers quickly using mental tricks.",
        example: "83 - 47",
        explanation: "Think of 47 as 50 - 3.",
        idea: "Use nearby round numbers to make subtraction easier."
    },

    {
        id: "multiplication",
        icon: "✖️",
        title: "Multiplication",
        description: "Multiply numbers faster using patterns.",
        example: "25 × 16",
        explanation: "25 × 16 = 25 × 4 × 4 = 100 × 4.",
        idea: "Look for numbers that can be rearranged into easier calculations."
    },

    {
        id: "division",
        icon: "➗",
        title: "Division",
        description: "Understand division through simple patterns.",
        example: "144 ÷ 12",
        explanation: "Think: 12 × what number gives 144?",
        idea: "Turn division into a multiplication question."
    },

    {
        id: "squares",
        icon: "²",
        title: "Squares",
        description: "Calculate squares without a calculator.",
        example: "35²",
        explanation: "Use a nearby base number to calculate quickly.",
        idea: "Numbers close to 10, 50 or 100 can be squared efficiently."
    },

    {
        id: "speed",
        icon: "⚡",
        title: "Speed Maths",
        description: "Train your brain to calculate faster.",
        example: "19 + 28 + 31",
        explanation: "Group numbers that make round numbers.",
        idea: "Mental calculation becomes easier when you recognise patterns."
    }
];


/* =========================================
   APP STATE
========================================= */

let selectedClass = null;

let selectedTopic = "addition";

let difficulty = "easy";

let currentQuestion = null;

let questionNumber = 1;

let sessionScore = 0;

let sessionCorrect = 0;

let sessionTotal = 0;

let sessionXP = 0;


/* =========================================
   SAVED PLAYER DATA
========================================= */

let player = JSON.parse(
    localStorage.getItem("vedaMathsPlayer")
) || {

    xp: 0,

    streak: 0,

    totalQuestions: 0,

    correctAnswers: 0,

    topics: {

        addition: 0,

        subtraction: 0,

        multiplication: 0,

        division: 0,

        squares: 0,

        speed: 0

    }

};


/* =========================================
   PAGE NAVIGATION
========================================= */

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {

        page.classList.remove("active");

    });


    const selectedPage =
        document.getElementById(pageId);

    if (selectedPage) {

        selectedPage.classList.add("active");

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });


    updateUI();

}


/* =========================================
   CREATE CLASS CARDS
========================================= */

function createClassCards() {

    const grid =
        document.getElementById("classGrid");

    grid.innerHTML = "";


    classes.forEach(classItem => {

        const card =
            document.createElement("div");

        card.className = "class-card";


        card.innerHTML = `

            <div class="class-number">
                ${classItem.number}
            </div>

            <h3>
                ${classItem.title}
            </h3>

            <p>
                ${classItem.description}
            </p>

            <div class="arrow">
                →
            </div>

        `;


        card.onclick = function () {

            selectClass(classItem.number);

        };


        grid.appendChild(card);

    });

}


/* =========================================
   SELECT CLASS
========================================= */

function selectClass(classNumber) {

    selectedClass = classNumber;


    document.getElementById("learnTitle").textContent =
        `Class ${classNumber} Learning Path`;


    createTopicCards();


    showPage("learn");

}


/* =========================================
   CREATE TOPIC CARDS
========================================= */

function createTopicCards() {

    const grid =
        document.getElementById("topicGrid");

    grid.innerHTML = "";


    topics.forEach(topic => {

        const mastery =
            player.topics[topic.id] || 0;


        const card =
            document.createElement("div");

        card.className = "topic-card";


        card.innerHTML = `

            <div class="topic-icon">
                ${topic.icon}
            </div>

            <h3>
                ${topic.title}
            </h3>

            <p>
                ${topic.description}
            </p>

            <div class="topic-progress">

                <div class="skill-top">

                    <span>
                        Mastery
                    </span>

                    <strong>
                        ${mastery}%
                    </strong>

                </div>

                <div class="progress-track">

                    <div
                        class="progress-fill"
                        style="width:${mastery}%">
                    </div>

                </div>

            </div>

        `;


        card.onclick = function () {

            openLesson(topic.id);

        };


        grid.appendChild(card);

    });

}


/* =========================================
   OPEN LESSON
========================================= */

function openLesson(topicId) {

    const topic =
        topics.find(t => t.id === topicId);


    if (!topic) return;


    selectedTopic = topicId;


    document.getElementById("lessonTitle")
        .textContent = topic.title;


    document.getElementById("lessonDescription")
        .textContent = topic.description;


    document.getElementById("lessonIdea")
        .textContent = topic.idea;


    document.getElementById("lessonExample")
        .textContent = topic.example;


    document.getElementById("lessonExplanation")
        .textContent = topic.explanation;


    showPage("lesson");

}


/* =========================================
   START TOPIC PRACTICE
========================================= */

function startTopicPractice() {

    startPractice();

}


/* =========================================
   START PRACTICE
========================================= */

function startPractice() {

    questionNumber = 1;

    sessionScore = 0;

    sessionCorrect = 0;

    sessionTotal = 0;

    sessionXP = 0;


    document.getElementById("practiceTitle")
        .textContent =
        selectedClass
            ? `Class ${selectedClass} Practice`
            : "Practice Arena";


    showPage("practice");


    generateQuestion();

}


/* =========================================
   DIFFICULTY
========================================= */

function setDifficulty(level) {

    difficulty = level;


    document
        .querySelectorAll(".difficulty")
        .forEach(button => {

            button.classList.remove("active");

        });


    const button =
        document.getElementById(level + "Btn");


    if (button) {

        button.classList.add("active");

    }


    generateQuestion();

}


/* =========================================
   RANDOM NUMBER
========================================= */

function randomNumber(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}


/* =========================================
   GENERATE QUESTION
========================================= */

function generateQuestion() {

    let a;

    let b;

    let answer;

    let symbol;


    /*
       EASY QUESTIONS
    */

    if (difficulty === "easy") {

        if (selectedTopic === "addition") {

            a = randomNumber(10, 50);

            b = randomNumber(1, 40);

            answer = a + b;

            symbol = "+";

        }

        else if (selectedTopic === "subtraction") {

            a = randomNumber(30, 80);

            b = randomNumber(1, a);

            answer = a - b;

            symbol = "-";

        }

        else if (selectedTopic === "multiplication") {

            a = randomNumber(2, 12);

            b = randomNumber(2, 10);

            answer = a * b;

            symbol = "×";

        }

        else if (selectedTopic === "division") {

            b = randomNumber(2, 10);

            answer = randomNumber(2, 12);

            a = b * answer;

            symbol = "÷";

        }

        else if (selectedTopic === "squares") {

            a = randomNumber(2, 20);

            answer = a * a;

            symbol = "²";

        }

        else {

            a = randomNumber(10, 50);

            b = randomNumber(1, 30);

            answer = a + b;

            symbol = "+";

        }

    }


    /*
       MEDIUM QUESTIONS
    */

    else if (difficulty === "medium") {

        if (selectedTopic === "addition") {

            a = randomNumber(50, 500);

            b = randomNumber(50, 500);

            answer = a + b;

            symbol = "+";

        }

        else if (selectedTopic === "subtraction") {

            a = randomNumber(200, 900);

            b = randomNumber(50, a);

            answer = a - b;

            symbol = "-";

        }

        else if (selectedTopic === "multiplication") {

            a = randomNumber(10, 50);

            b = randomNumber(5, 20);

            answer = a * b;

            symbol = "×";

        }

        else if (selectedTopic === "division") {

            b = randomNumber(5, 20);

            answer = randomNumber(5, 30);

            a = b * answer;

            symbol = "÷";

        }

        else if (selectedTopic === "squares") {

            a = randomNumber(20, 50);

            answer = a * a;

            symbol = "²";

        }

        else {

            a = randomNumber(100, 500);

            b = randomNumber(20, 100);

            answer = a + b;

            symbol = "+";

        }

    }


    /*
       HARD QUESTIONS
    */

    else {

        if (selectedTopic === "addition") {

            a = randomNumber(500, 5000);

            b = randomNumber(500, 5000);

            answer = a + b;

            symbol = "+";

        }

        else if (selectedTopic === "subtraction") {

            a = randomNumber(1000, 9000);

            b = randomNumber(100, a);

            answer = a - b;

            symbol = "-";

        }

        else if (selectedTopic === "multiplication") {

            a = randomNumber(20, 100);

            b = randomNumber(10, 50);

            answer = a * b;

            symbol = "×";

        }

        else if (selectedTopic === "division") {

            b = randomNumber(10, 50);

            answer = randomNumber(10, 100);

            a = b * answer;

            symbol = "÷";

        }

        else if (selectedTopic === "squares") {

            a = randomNumber(50, 100);

            answer = a * a;

            symbol = "²";

        }

        else {

            a = randomNumber(500, 2000);

            b = randomNumber(100, 500);

            answer = a + b;

            symbol = "+";

        }

    }


    currentQuestion = {

        a: a,

        b: b,

        answer: answer,

        symbol: symbol

    };


    displayQuestion();

}


/* =========================================
   DISPLAY QUESTION
========================================= */

function displayQuestion() {

    const questionText =
        document.getElementById("questionText");


    if (currentQuestion.symbol === "²") {

        questionText.textContent =
            `${currentQuestion.a}² = ?`;

    }

    else {

        questionText.textContent =
            `${currentQuestion.a} ${currentQuestion.symbol} ${currentQuestion.b} = ?`;

    }


    document.getElementById("questionNumber")
        .textContent =
        `Question ${questionNumber}`;


    document.getElementById("questionScore")
        .textContent =
        `${sessionXP} XP`;


    document.getElementById("questionProgress")
        .style.width =
        `${Math.min((questionNumber - 1) * 10, 100)}%`;


    document.getElementById("answerInput").value = "";


    document.getElementById("feedback")
        .textContent = "";


    document.getElementById("feedback")
        .className = "feedback";


    document.getElementById("hintText")
        .textContent = "";


    document.getElementById("answerInput")
        .focus();

}


/* =========================================
   CHECK ANSWER
========================================= */

function checkAnswer() {

    const input =
        document.getElementById("answerInput");


    const userAnswer =
        Number(input.value);


    const feedback =
        document.getElementById("feedback");


    if (input.value === "") {

        feedback.textContent =
            "Enter an answer first.";

        feedback.className =
            "feedback wrong";

        return;

    }


    sessionTotal++;

    player.totalQuestions++;


    if (userAnswer === currentQuestion.answer) {

        sessionCorrect++;

        sessionScore++;

        sessionXP += 10;

        player.xp += 10;

        player.correctAnswers++;
updateStreak();

        /*
           Increase topic mastery
        */

        player.topics[selectedTopic] =
            Math.min(
                100,
                (player.topics[selectedTopic] || 0) + 2
            );


        feedback.textContent =
            "🎉 Correct! +10 XP";

        feedback.className =
            "feedback correct";


        savePlayer();

        updateUI();


        setTimeout(() => {

            questionNumber++;


            if (questionNumber > 10) {

                finishPractice();

            }

            else {

                generateQuestion();

            }

        }, 800);

    }

    else {

        feedback.textContent =
            `❌ Not quite. The answer is ${currentQuestion.answer}.`;

        feedback.className =
            "feedback wrong";


        /*
           Give the player another chance
        */

        savePlayer();

        updateUI();

    }

}


/* =========================================
   ENTER KEY
========================================= */

function handleEnter(event) {

    if (event.key === "Enter") {

        checkAnswer();

    }

}


/* =========================================
   HINT
========================================= */

function showHint() {

    const hint =
        document.getElementById("hintText");


    if (!currentQuestion) return;


    if (selectedTopic === "addition") {

        hint.textContent =
            `💡 Try adding ${currentQuestion.b}
            to ${currentQuestion.a} in smaller parts.`;

    }

    else if (selectedTopic === "subtraction") {

        hint.textContent =
            `💡 Think about how far
            ${currentQuestion.b} is from ${currentQuestion.a}.`;

    }

    else if (selectedTopic === "multiplication") {

        hint.textContent =
            `💡 Break one number into
            smaller numbers and multiply step-by-step.`;

    }

    else if (selectedTopic === "division") {

        hint.textContent =
            `💡 Ask yourself:
            ${currentQuestion.b} × what number gives ${currentQuestion.a}?`;

    }

    else if (selectedTopic === "squares") {

        hint.textContent =
            `💡 Look for a nearby round number
            and use a square identity.`;

    }

    else {

        hint.textContent =
            "💡 Look for numbers that can be grouped into round numbers.";

    }

}


/* =========================================
   FINISH PRACTICE
========================================= */

function finishPractice() {

    const accuracy =
        sessionTotal === 0
            ? 0
            : Math.round(
                (sessionCorrect / sessionTotal) * 100
            );


    document.getElementById("finalScore")
        .textContent =
        `${sessionScore}/10`;


    document.getElementById("finalAccuracy")
        .textContent =
        `${accuracy}%`;


    document.getElementById("finalXP")
        .textContent =
        `+${sessionXP}`;


    let message;


    if (accuracy >= 90) {

        message =
            "🔥 Outstanding! Your mental maths is getting seriously sharp.";

    }

    else if (accuracy >= 70) {

        message =
            "💪 Great work! Keep practising and push for 90%.";

    }

    else if (accuracy >= 50) {

        message =
            "📈 Good start! A little more practice will make you faster.";

    }

    else {

        message =
            "🌱 Don't worry. Every expert starts somewhere. Keep going!";

    }


    document.getElementById("resultMessage")
        .textContent = message;


    updateUI();


    showPage("results");

}


/* =========================================
   SAVE PLAYER
========================================= */
function updateStreak() {
    const now = new Date();

    const today =
        `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    // Already practiced today
    if (player.lastPracticeDate === today) {
        return;
    }

    // First ever practice
    if (!player.lastPracticeDate) {
        player.streak = 1;
    } else {
        const [year, month, day] =
            player.lastPracticeDate.split("-").map(Number);

        const lastDate = new Date(year, month - 1, day);

        const todayDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );

        const diffDays =
            Math.round((todayDate - lastDate) / 86400000);

        if (diffDays === 1) {
            player.streak++;
        } else {
            player.streak = 1;
        }
    }

    player.lastPracticeDate = today;

    igniteStreak();
}
function savePlayer() {

    localStorage.setItem(
        "vedaMathsPlayer",
        JSON.stringify(player)
    );

}


/* =========================================
   CALCULATE LEVEL
========================================= */

function getLevel() {

    return Math.floor(player.xp / 100) + 1;

}


/* =========================================
   UPDATE UI
========================================= */

function updateUI() {

    /*
       XP in navbar
    */

    const navXP =
        document.getElementById("navXP");

    if (navXP) {

        navXP.textContent =
            `${player.xp} XP`;

    }


    /*
       Streak
    */

    const streak =
        document.getElementById("streakValue");

    if (streak) {

        streak.textContent =
            player.streak;

    }


    const progressStreak =
        document.getElementById("progressStreak");

    if (progressStreak) {

        progressStreak.textContent =
            player.streak;

    }


    /*
       Total XP
    */

    const progressXP =
        document.getElementById("progressXP");

    if (progressXP) {

        progressXP.textContent =
            player.xp;

    }


    /*
       Accuracy
    */

    const accuracy =
        player.totalQuestions === 0
            ? 0
            : Math.round(
                (player.correctAnswers /
                player.totalQuestions) * 100
            );


    const progressAccuracy =
        document.getElementById("progressAccuracy");


    if (progressAccuracy) {

        progressAccuracy.textContent =
            `${accuracy}%`;

    }


    /*
       Level
    */

    const level =
        getLevel();


    const levelText =
        document.getElementById("levelText");


    if (levelText) {

        levelText.textContent =
            `Level ${level}`;

    }


    const currentLevelXP =
        player.xp % 100;


    const levelProgress =
        document.getElementById("levelProgress");


    if (levelProgress) {

        levelProgress.style.width =
            `${currentLevelXP}%`;

    }


    const levelXP =
        document.getElementById("levelXP");


    if (levelXP) {

        levelXP.textContent =
            `${currentLevelXP} / 100 XP`;

    }


    createSkillList();

}


/* =========================================
   SKILL LIST
========================================= */

function createSkillList() {

    const list =
        document.getElementById("skillList");


    if (!list) return;


    list.innerHTML = "";


    topics.forEach(topic => {

        const mastery =
            player.topics[topic.id] || 0;


        const item =
            document.createElement("div");


        item.className =
            "skill-item";


        item.innerHTML = `

            <div class="skill-top">

                <strong>
                    ${topic.icon}
                    ${topic.title}
                </strong>

                <span>
                    ${mastery}%
                </span>

            </div>

            <div class="skill-bar">

                <div
                    style="width:${mastery}%">
                </div>

            </div>

        `;


        list.appendChild(item);

    });

}


/* =========================================
   INITIALISE APP
========================================= */

function initialiseApp() {

    createClassCards();

    createTopicCards();

    updateUI();

}


/* =========================================
   START APP
========================================= */
function igniteStreak() {
    const fire = document.getElementById("streakFire");

    if (!fire) return;

    fire.classList.remove("ignite");

    // Restart animation
    void fire.offsetWidth;

    fire.classList.add("ignite");

    setTimeout(() => {
        fire.classList.remove("ignite");
    }, 1000);
}
initialiseApp();