var myQuestions = [
    {
        question: "Q1. Bernoulli’s equation holds good for non ideal fluids ",
        answers: {
            a: 'True',
            b: 'False',
        },
        correctAnswer: 'b'
    },
    {
        question: "Q2. The pressure head is given by",
        answers: {
            a: 'P/γ',
            b: 'V2/2g ',
        },
        correctAnswer: 'a'
    },
    {
        question: "Q3. Incompressible ideal fluids are fluids which have constant density.",
        answers: {
            a: 'True',
            b: 'False',
        },
        correctAnswer: 'a'
    },
    {
        question: "Q4. Bernoulli’s theorem deals with law conservation of momentum",
        answers: {
		a: 'True',
            b: 'False',
        },
        correctAnswer: 'b'
    }
];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

    function showQuestions(questions, quizContainer){
        var output = [];
        var answers;
        for(var i=0; i<questions.length; i++){
            answers = [];
            for(letter in questions[i].answers){
                answers.push(
                    '<label>'
                        + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                        + letter + ': '
                        + questions[i].answers[letter]
                    + '</label>'
                );
            }
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        // finally combine our output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer, resultsContainer){
        var answerContainers = quizContainer.querySelectorAll('.answers');
        var userAnswer = '';
        var numCorrect = 0;
        for(var i=0; i<questions.length; i++){
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            if(userAnswer===questions[i].correctAnswer){
                numCorrect++;
                answerContainers[i].style.color = 'green';
            }
            else{
                answerContainers[i].style.color = 'red';
            }
        }
        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
    }
    showQuestions(questions, quizContainer);
    submitButton.onclick = function(){
        showResults(questions, quizContainer, resultsContainer);
    }

}
