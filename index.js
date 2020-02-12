const STORE = [
    {
        question: 'Bows come in many styles, what bow uses a pulley system to ease the stress of the archer?',
        answers:[
            'Recurve',
            'Composite',
            'Compound',
            'Longbow'
        ],
        correctAnswer: 'Compound'
    },
    {
        question: 'How long ago was the first bow thought to have been invented?',
        answers:[
            '71,000 years',
            '7,000 years',
            '500 years',
            '46,000 years'
        ],
        correctAnswer: '71,000 years'
    },
    {
        question: 'What are the feathers on an arrow called?',
        answers:[
            'Fletching',
            'Nock',
            'Shaft',
            'Flight'
        ],
        correctAnswer: 'Fletching'
    },
    {
        question: 'Which nation is credited with inventing the crossbow?',
        answers:[
            'Mongolia',
            'India',
            'China',
            'Japan'
        ],
        correctAnswer: 'China'
    }
];

let score = 0;
let questionNum = 0;

function questionGenerator() {
    if (questionNum < STORE.length) {
        return createForm(questionNum);
    }else{
        $('.question').hide();
        finalScore();
        $('questionNum').text(5);
    }
}

function scoreUpdater() {
    score++;
    $('.score').text(score);
}

function questionNumUpdater(){
    questionNum++;
    $('.questionNum').text(questionNum + 1);
}

function quizInfoReset() {
    score = 0;
    questionNum = 0;
    $('.score').text(0);
    $('.questionNum').text(0);
}

function quizStart() {
    $('.boxAlt').hide();
    $('.start').on('click', '.startButton', function (event) {
        $('.start').hide();
        $('.questionNum').text(1);
        $('.question').show();
        $('.question').prepend(questionGenerator());
    });
}

function submitAnswer() {
    $('.quizBorder').on('submit', function (event) {
        event.preventDefault();
        $('.boxAlt').hide();
        $('.respond').show();
        let selected = $('input:checked');
        let answer = selected.val();
        let correct = STORE[questionNum].correctAnswer;
        if (answer === correct) {
            correctAnswer();
        }else {
            wrongAnswer();
        }
    });
}

function createForm(questionIndex) {
    let questionForm = $(`<form>
        <fieldset>
            <legend class = "questionText">${STORE[questionIndex].question}</legend>
        </fieldset>
    </form>`)

    let formField = $(questionForm).find('fieldset');

    STORE[questionIndex].answers.forEach(function(answerVal, answerInd){
        $(`<label class="trackerBar" for="${answerInd}">
            <input class="radio" type="radio"
            id="${answerInd}" value=${answerVal}" name="answer" required>
            <span>${answerVal}</span>
        </label>`).appendTo(formField);
    });
    $(`<button type="submit" class="submitButton button">Submit</button>`).appendTo(formField);
    return questionForm;
}

function correctAnswer(){
    $('.respond').html(
        `<h3>That's Correct!</h3>
        <img src="images/bullseye.jpg" alt="A Bullseye Target" class="photos" width="200px">
        <p class="trackerBar">Good Shot!</p>
        <button type="button" class="nextButton button">Next</button>`
    );
    scoreUpdater();
}
function wrongAnswer(){
    $('.respond').html(`<h3>That was the wrong choice.</h3>
    <img src="images/brokenBow.jpg" alt="A Broken Recurve Bow." class="photos" width="200px">
    <p class="trackerBar">Here is the right option.</p>
    <p class="trackerBar">${STORE[questionNum].correctAnswer}</p>
    <button type="button" class="nextButton button">Next</button>`
    );
}
function nextQ(){
    $('.quizBorder').on('click', '.nextButton',
    function(event){
        $('.boxAlt').hide();
        $('.question').show();
        questionNumUpdater();
        $('.question form').replaceWith(questionGenerator());
    });
}

function finalScore(){
    $('.final').show();

    const pass = [
        'Well Done!',
        'images/bullseye.jpg',
        'Bullseye',
        'What A Shot!!.'
    ];

    const fail = [
        'Try again',
        'images/brokenBow.jpg',
        'A Broken Recurve Bow',
        'Pick up those arrows and try again.'

    ];

    if (score >= 3) {
        array = pass;
    }else {
        array = fail;
    }
    return $('.final').html(
        `<h3>${array[0]}</h3>
        <img src="${array[1]}" alt="${array[2]}" class="photos">
        <h3>Your score is ${score} / 5</h3>
        <p class="trackerBar">${array[3]}</p>
        <button type="submit" class="restartButton button">Restart</button>`
    );
}

function quizReset(){
    $('.quizBorder').on('click', '.restartButton', function(event){
        event.preventDefault();
        quizInfoReset();
        $('.boxAlt').hide();
        $('.quizStart').show();
    });
}

function runQuiz(){
    quizStart();
    questionGenerator();
    submitAnswer();
    nextQ();
    quizReset();
}

$(runQuiz);
