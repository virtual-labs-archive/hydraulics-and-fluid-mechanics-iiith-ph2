function eval()
{
	var form = document.forms["quiz"];
	var win = window.open("","win","width=500,height=500,scrollbars");
	win.focus();
	win.document.open();
	win.document.write('<title>Solution</title>');
	win.document.write('<body bgcolor="#FFFFFF">');
        win.document.write('<center><h3>Score</h3></center>');

	/* Initialise answers */
	var a1 = "1";
	var a2 = "1";
	var a3 = "2";
	var a4 = "2";
	var a5 = "2"
	/* Extract answers */
	var q1, q2, q3, q4,q5, length;
	
	length = form["q1"].length;
	for(i=0; i<length; i++)
		if(form["q1"][i].checked)
			q1 = form["q1"][i].value;
	
	length = form["q2"].length;
	for(i=0; i<length; i++)
		if(form["q2"][i].checked)
			q2 = form["q2"][i].value;
	
	length = form["q3"].length;
	for(i=0; i<length; i++)
		if(form["q3"][i].checked)
			q3 = form["q3"][i].value;

	length = form["q4"].length;
	for(i=0; i<length; i++)
		if(form["q4"][i].checked)
			q4 = form["q4"][i].value;

	length = form["q5"].length;
	for(i=0; i<length; i++)
		if(form["q5"][i].checked)
			q5 = form["q5"][i].value;
	
	/* Evaluate answers */
	var score = 0;
	var result = "Correct answers: ";

	if(q1 == a1)
	{
		score++;
		result += "Q1, ";
	}

	if(q2 == a2)
	{
		score++;
		result += "Q2, ";
	}

	if(q3 == a3)
	{
		score++;
		result += "Q3, ";
	}

	if(q4 == a4)
	{
		score++;
		result += "Q4";
	}

	if(q5 == a5)
	{
		score++;
		result += "Q5";
	}

	/* Show result */
	var output = "Your score is " + score + "<br>";
	output += result;
	
	//alert(output);
	win.document.write(output+"<br>");
        win.document.write('<center><h3>Solution to Quiz</h3></center>');
        win.document.write("Ans 1)True"+"<br>"+"Ans 2)True"+"<br>"+"Ans 3)False"+"<br>"+"Ans 4)False"+"<br>"+"Ans 5)False");
}