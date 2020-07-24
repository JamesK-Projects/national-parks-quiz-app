const STORE = [
    {
        question:"What was the first National Park to be established into the National Park Service?",
        answers:["Yosemite National Park", "Yellowstone National Park", "Grand Canyon National Park", "Shenandoah National Park"],
        correctAnswer:"Yellowstone National Park"
    },
    {
        question: "Which US state has the most national parks?",
        answers: ["California", "Colorado", "Utah", "Alaska"],
        correctAnswer:"California"
    },
    {
        question:"Which national park has the most visitors each year?",
        answers:["Everglades National Park", "Arches National Park", "Great Smoky Mountains National Park", "Grand Canyon National Park"],
        correctAnswer:"Great Smoky Mountains National Park"
    },
    {
        question:"Which of these is NOT a national park?",
        answers:["White Mountains", "Dry Tortugas", "Kings Canyon", "Gateway Arch"],
        correctAnswer:"White Mountains"
    },
    {
        question:"Which national park is the largest in area?",
        answers:["Glacier National Park", "Denali National Park", "Wrangell - St. Elias National Park", "White Sands National Park"],
        correctAnswer:"Wrangell - St. Elias National Park"
    },
    {
        question:"Which national park has the famous rock formations 'Half Dome' and 'El Capitan'?",
        answers:["Zion National Park", "Lady Guadalupe National Park", "Canyonlands National Park", "Yosemite National Park"],
        correctAnswer:"Yosemite National Park"
    },
    {
        question:"Mammoth Cave National Park, the world's longest known cave system, can be found in which state?",
        answers:["Idaho", "Kentucky", "Arkansas", "New Mexico"],
        correctAnswer:"Kentucky"
    },
    {
        question:"Which national park is occasionally closed to visitors due to missile testing?",
        answers:["Indiana Dunes National Park", "Death Valley National Park", "Grand Teton National Park", "White Sands National Park"],
        correctAnswer:"White Sands National Park"
    },
    {
        question:"Which national park sits atop a supervolcano, and attracts visitors with its many geysers and thermal pools?",
        answers:["Hot Springs National Park", "Yellowstone National Park", "Hawaii Volcanoes National Park", "Mount Rainier National Park"],
        correctAnswer:"Yellowstone National Park"
    },
    {
        question:"Cadillac Mountain, the first place in the US to see the sunrise each day (for part of the year), is found in which National Park?",
        answers:["Everglades National Park", "Shenandoah National Park", "Acadia National Park", "Escalade National Park"],
        correctAnswer:"Acadia National Park"
    }
];
let score = 0;
let questionNumber = 0;
function startQuiz(){
    $('.questionPage').innerHTML = '';
    $('.answerPage').hide();
    $('.resultsPage').hide();
    $('.introPage').show();
    $('header').show();
    $('.introPage').off('click') 
    $('.introPage').on('click', 'button', function(event){
        $('.introPage').hide();
        $('.questionNumber').text(1);
        $('.questionPage').show();
        $('.questionPage').append(renderQuestion());
    })
};
function renderQuestion(){
    if (questionNumber < STORE.length){
        return createPage(questionNumber);
    }
    else {
        $('header').hide();
        $('.questionPage').hide();
        $('.resultsPage').show();
        console.log("displayResults ran");
        return displayResults();
    }
};
function createPage(questionIndex){
    let formMaker = $(`<form class="form">
        <fieldset>
            <legend class="questionText">
                ${STORE[questionIndex].question}
            </legend>
        </fieldset>
    </form>`)
    let fieldSelector = $(formMaker).find('fieldset');
    STORE[questionIndex].answers.forEach(function (answerValue, answerIndex){
        $(`<label for="${answerIndex}">
            <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
            <span>${answerValue}</span>
        </label>`)
        .appendTo(fieldSelector);
    });
    $(`<button type="submit" class="submitButton">Submit</button>`).appendTo(fieldSelector);
    console.log(formMaker);
    return formMaker;
}
function correctAnswer(){
    $('.answerPage').html(
        `<h3>${STORE[questionNumber].correctAnswer} is Correct!</h3>
        <img src="images/${questionNumber}.jpg" alt="${STORE[questionNumber].correctAnswer}" class="images"><br>
        <button type="button" class="nextButton">Next</button>`
    );
    updateScore();
}
function updateScore(){
    score++;
    $('.score').text(score);
}
function incorrectAnswer(){
    $('.answerPage').html(
        `<h3>Sorry, that's incorrect...</h3>
        <h3 class="correctAnswer">The answer is ${STORE[questionNumber].correctAnswer}</h3>
        <img src="images/${questionNumber}.jpg" alt="${STORE[questionNumber].correctAnswer}" class="images"><br>
        <button type="button" class="nextButton">Next</button>`
    );
}
function submitAnswer(){
    $('.quiz-content').on('submit', function(event){
        event.preventDefault();
       
        $('.questionPage').hide();
        $('.answerPage').show();
        let answer=$('input:checked').val();
        if (answer === STORE[questionNumber].correctAnswer){
            correctAnswer();
        }
        else {
            incorrectAnswer()
        } 
        $('.questionPage form').remove();
    })
};
function nextQuestion(){
    $('.quiz-content').on('click', '.nextButton', function(event){
        $('.answerPage').hide();
        $('.questionPage').show();
        $('.questionNumber').text(2+questionNumber++);
        let element = renderQuestion()
        console.log(element)
        $('.questionPage').append(element);
    })
};
function displayResults(){
    let resultsMessage = "";
    let resultsImage = "";
    let imageAlt = "";
    if (score > 8){
        resultsMessage = "Great Job! You're a real outdoor enthusiast!";
        resultsImage = "greatJob";
        imageAlt = "Experienced hiker looking out at a beautiful Utah landscape";
    }
    else if (score > 4 && score < 9){
        resultsMessage = "Not bad, but your life could use some more adventure!";
        resultsImage = "notBad";
        imageAlt="Man in hiking boots about to take on a mountain";
    }
    else if (score > 0 && score < 5){
        resultsMessage = "Not great. Maybe it's time to go outside...";
        resultsImage="notGreat";
        imageAlt="Door opening to the outdoors";
    }
    else {
        resultsMessage = "Do you even know what a tree looks like?"
        resultsImage = "flunk";
        imageAlt = "Angry tree";
    }
    $('.resultsPage').html(
        `<h1 class="finalScore">Final Score:</h1>
        <h1 class="finalScoreTotal">${score}/10</h1>
        <h3 class="resultsMessage">${resultsMessage}</h3>
        <img src="images/${resultsImage}.jpg" class="images" alt="${imageAlt}">
        <button type="button" class="restartQuiz">Restart Quiz</button>`
    )
};
function restartQuiz(){
    $('.quiz-content').on('click', '.restartQuiz', function(event){
        event.preventDefault();
        $('.resultsPage').hide();
        score = 0;
        questionNumber = 0;
        $('.score').text(0);
        $('.questionNumber').text(0);
        $('.questionPage form').html("");
        startQuiz();
        console.log("RestartQuiz");
    })
};
function runQuiz(){
    startQuiz()
    renderQuestion()
    submitAnswer()
    nextQuestion()
    displayResults()
    restartQuiz()
};
$(runQuiz);