c=0;
$('#quiz-result').click(
    function(){
        if($("#q1t").is(':checked')) {
            $('#Q1').css("background-color", "green");
            c+=3;
        }
        if($("#q1f").is(':checked')){
            $('#Q1').css("background-color", "red");
            c-=1;
        }
        if($("#q2f").is(':checked')) {
            $('#Q2').css("background-color", "green");
            c+=3;
        }
        if($("#q2t").is(':checked')){
            $('#Q2').css("background-color", "red");
            c-=1;
        }
        if($("#q3f").is(':checked')) {
            $('#Q3').css("background-color", "green");
            c+=3;
        }
        if($("#q3t").is(':checked')){
            $('#Q3').css("background-color", "red");
            c-=1;;
        }
        if($("#q4t").is(':checked')) {
            $('#Q4').css("background-color", "green");
            c+=3;
        }
        if($("#q4f").is(':checked')){
            $('#Q4').css("background-color", "red");
            c-=1;
        }
        if($("#q5t").is(':checked')) {
            $('#Q5').css("background-color", "green");
            c+=3;
        }
        if($("#q5f").is(':checked')){
            $('#Q5').css("background-color", "red");
            c-=1;
        }

        alert("You scored "+c+"/15. Congrats!");
        c=0;
    }
);
