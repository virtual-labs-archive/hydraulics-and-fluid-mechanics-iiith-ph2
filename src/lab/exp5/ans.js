

var myQuestions = [
    {
        question: "Q1. Venturimeter is used to measure average velocity",
        answers: {
            a: 'True',
            b: 'False'
           
        },
        correctAnswer: 'a'
    },
    {
        question: "Q2. Angle of contraction is more than angle of diversion ",
        answers: {
            a: 'True',
            b: 'False'
           
        },
        correctAnswer: 'b'
    },
    {
        question: "Q3. The inlet length of the Venturimeter’s greater than outlet pipe ",
        answers: {
            a: 'True',
            b: 'False'
           
        },
        correctAnswer: 'a'
    },
    {
        question: "Q4. Actual discharge is obtained by (A)= a x h/t ",
        answers: {
            a: 'True',
            b: 'False'
           
        },
        correctAnswer: 'a'
    },
    {
        question: "Q5. Coefficient of discharge is calculated by C_d =Q_a/Q_t ",
        answers: {
            a: 'True',
            b: 'False'
           
        },
        correctAnswer: 'a'
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


