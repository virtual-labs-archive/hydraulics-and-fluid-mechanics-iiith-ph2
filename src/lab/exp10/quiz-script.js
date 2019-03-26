function checkQuiz(){
    answers = [0, 0, 0, 1, 1, 0]; //the array of answers (only elements 1-5 are valid answers)
    var count = 0;
    for(var i = 1; i <= 5; i++){
        var span_id = 'q' + i.toString() + 'text';
        var radio_id_t = 'q' + i.toString() + 't';
        var radio_id_f = 'q' + i.toString() + 'f';

        if(document.getElementById(radio_id_t).checked){
            if(answers[i] == 1){
                count++;
                document.getElementById(span_id).style.color = 'green';
            }else{
                document.getElementById(span_id).style.color = 'red';
            }
        }else if(document.getElementById(radio_id_f).checked){
            if(answers[i] == 0){
                count++;
                document.getElementById(span_id).style.color = 'green';
            }else{
                document.getElementById(span_id).style.color = 'red';
            }
        }else{
            document.getElementById(span_id).style.color = 'orange';
        }
    }

    var result = document.getElementById("result");
    result.innerHTML = "You got " + count.toString() + " correct answers." 
}