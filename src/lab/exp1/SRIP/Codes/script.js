
var draw = SVG("bernoulli-setup").size(1300, 1000); //GLOBAL VARIABLE : DRAW

	function toggleAnimation() {
	
	
	
	var incomingPipeHorizontal = draw.rect(1,18).attr ({
		'fill': '#00B0EA', 
		x: 151, 
		y: 151
	});
	
	incomingPipeHorizontal.animate().size(148,18);
	
	var incomingPipeVertical = draw.rect(18,0.01).attr ({ 
		'fill': '#00B0EA', 
		x: 281, 
		y: 168
	});
	
	incomingPipeVertical.animate({delay: '1s'}).size(18,280);
	
	var ductRect = draw.rect(0.01,23).attr ({ 
		x: 401, 
		y: 381, 
		'fill': '#00B0EA'
	});
	
	ductRect.animate(4600,'',2500).size(307,23)
	
	ductTriangle1 = draw.polygon([[401,404],[401,433],[401.1,401]]).attr ({ 
		'fill': '#00B0EA'
	});
	
	ductTriangle1.animate(1000,'',2500).size(70,21.5);
	
	ductTriangle2 = draw.polygon([[650.5,401],[652.1,400],[652.1,406.5]]).attr ({
		'fill':'#00B0EA'
	});
	
	ductTriangle2.animate(920,'',6210).size(57.8,23.3);
	
	
	
	var outgoingPipeHorizontal = draw.rect(0.01,18).attr ({
		'fill': '#00B0EA',
		x: 891 ,
		y: 391 
	});
	
	outgoingPipeHorizontal.animate({delay: '7.6s'}).size(108,18);
	
	var outgoingPipeVertical = draw.rect(18,0.01).attr ({
		'fill': '#00B0EA',
		x: 981 ,
		y: 409
	});
	
	outgoingPipeVertical.animate({delay: '8.6s'}).size(18,139);
	
	$('#tankLeft')
		.animate({'height': 0},2000)
		.animate({'height': 150, 'top': 435}, 1000)
	
	$('#verticalPipe1')
		.animate({'height': 0}, 3200)
		.animate({'height': 145, 'top': 370},1000)
	
	$('#verticalPipe2')
		.animate({'height': 0}, 4200)
		.animate({'height': 115, 'top': 400},1000)
	
	$('#verticalPipe3')
		.animate({'height': 0}, 5200)
		.animate({'height': 85, 'top': 430},1000)
	
	$('#verticalPipe4')
		.animate({'height': 0}, 6200)
		.animate({'height': 55, 'top': 460},1000)
		
	
	$('#tankRight')
		.animate({'height': 0},7200)
		.animate({'height': 150, 'top': 435}, 1000)
	
	$('#measureTank')
		.animate({'height': 0},9600)
		.animate({'height': 60, 'top': 625}, 1000)
	
	
}



function experimentSetup() {


    var tankLeft = draw.polyline([[200, 200],[220, 220],[220, 450],[400, 450],[400, 220],[420, 200]]).fill('none').stroke ({
    	width: 3,
	});  
	
	var incomingPipe = draw.polyline([[300,250],[300,150],[150,150],[150,170],[280,170],[280,250]]).fill('none').stroke ({
		width: 3
	});
	
	
	var ductLower = draw.polygon([[400,425],[460,405],[650,405],[710,425],[710,380],[400,380]]).fill('none').stroke ({
    	width: 3,
		
	});
	

	var tankRight = draw.polyline([[690,200],[710,220],[710,450],[890,450],[890,220],[910,200]]).fill('none').stroke ({ 
    	width: 3
	});

		var verticalPipe1 = draw.polyline([[430,380],[430,220],[445,220],[445,380]]).fill('none').stroke ({ 
    	width: 3
	});
	


	var verticalPipe3 = draw.polyline([[500,380],[500,220],[515,220],[515,380]]).fill('none').stroke ({
    	width: 3
	});



	var verticalPipe5 = draw.polyline([[570,380],[570,220],[585,220],[585,380]]).fill('none').stroke ({
    	width: 3
	});

	
	
	var verticalPipe7 = draw.polyline([[640,380],[640,220],[655,220],[655,380]]).fill('none').stroke ({ 
    	width: 3
	});



	var measureTank = draw.polyline([[890,390],[1000,390],[1000,450],[1150,450],[1150,550],[920,550],[920,450],[980,450],[980,410],	[890,410]]).fill('none').stroke ({
    
    	width: 3   
	});
	

	
}



window.onload = function() {
	
	experimentSetup();
	
		
}

var startButton = document.getElementById("start");
var resetButton = document.getElementById("reset");


startButton.onclick = function() {
	closeForm();
	//toggleAnimation();
	
	setTimeout(function(){
 		alert('Simulation Completed!');
		location.reload();
 },10600) 
	
	
	
}

resetButton.onclick = function() {
	location.reload();
}



function openForm() {


  document.getElementById("myForm").style.display = "block";
	
	}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}



function calculate() {
	var volume = document.getElementById("volume").value;
	
	var time = document.getElementById("time").value;
	
	var area = document.getElementById("area").value;
	
	var pressure = document.getElementById("pressure").value;
	
	if (volume == null || volume == "", time == null || time == "", area == null || area == "", pressure == null || pressure == "")
        {
            alert("Please fill all the inputs!");
            return false;
        }
	
	try {
		
		if(time <= 0 && volume < 0 && area <= 0 && pressure < 0) {
			throw("Invalid inputs! Values of Time and Area must be positive, values of Volume and Pressure must be non-negative");
		}
		else if(time <=0 && volume < 0 && pressure < 0){
			throw("Invalid inputs! Value of Time must be positive, values of Volume and Pressure must be non-negative")
			
		}
		else if(time <=0 && area <=0 && volume < 0) {
			throw("Invalid inputs! Values of Time and Area must be positive, value of Volume must be non-negative")
			
		}
		else if(time <=0 && area <=0 && pressure < 0) {
			throw("Invalid inputs! Values of Time and Area must be positive, value of Pressure must be non-negative")
			
		}
		else if (volume < 0 && pressure < 0 && area <= 0) {
			throw("Invalid inputs! Value of Area must be positive, values of Volume and Pressure must be non-negative")
			
		}
		else if(time <= 0 && volume < 0) {
			throw("Value of Time must be postive and value of Volume must be non-negative");
		}
		else if(time <= 0 && pressure < 0) {
			throw("Value of Time must be postive and value of Pressure must be non-negative");
		}
		else if(time <= 0 && area <= 0) {
			throw("Value of Time and Cross-Sectional Area must be postive.");
		}
		else if(volume < 0 && pressure < 0) {
			throw("Value of Volume and Pressure must be non-negative");
		}
		else if(volume < 0 && area <= 0) {
			throw("Value of Cross-Sectional Area must be postive and value of Volume must be non-negative");
		}
		else if(area <= 0 && pressure < 0) {
			throw("Value of Cross-Sectional Area must be postive and value of Pressure must be non-negative");
		}
		else if(time <= 0) {
			throw("Value of Time must be positive.");
		}
		else if (volume < 0) {
			throw("Value of Volume must be non-negative.");
			
		}
		else if (area <= 0) {
			throw("Value of Cross-Sectional Area must be postive.");
		}
		else if (pressure < 0) {
			throw("Value of Pressure must be non-negative.");
		}
		else {
	var discharge = parseFloat(volume)/parseFloat(time);
		
	
	var velocity = discharge/parseFloat(area);
	
	var velocityHead = (velocity*velocity)/19.6;
	
	var pressureHead = parseFloat(pressure)/0.0098;
	
	var totalHead = velocityHead + pressureHead;

	
	
	if(!isNaN(totalHead)) {
		alert("Total head is " + totalHead+ " cm");
	}
	else {
		alert("NaN");
	}
	
	}
	}
	catch(e) {
		alert("Error: " + e);
	}
}

function toggleAnimationAlternative() {
	
	
	
	var incomingPipeHorizontal = draw.rect(1,18).attr ({
		'fill': '#00B0EA', 
		x: 151, 
		y: 151
	});
	
	incomingPipeHorizontal.animate().size(148,18);
	
	var incomingPipeVertical = draw.rect(18,0.01).attr ({ 
		'fill': '#00B0EA', 
		x: 281, 
		y: 168
	});
	
	incomingPipeVertical.animate({delay: '1s'}).size(18,280);
	
	var ductRect = draw.rect(0.01,23).attr ({ 
		x: 401, 
		y: 381, 
		'fill': '#00B0EA'
	});
	
	ductRect.animate(4600,'',2500).size(307,23)
	
	ductTriangle1 = draw.polygon([[401,404],[401,433],[401.1,401]]).attr ({ 
		'fill': '#00B0EA'
	});
	
	ductTriangle1.animate(1000,'',2500).size(70,21.5);
	
	ductTriangle2 = draw.polygon([[650.5,401],[652.1,400],[652.1,406.5]]).attr ({
		'fill':'#00B0EA'
	});
	
	ductTriangle2.animate(920,'',6210).size(57.8,23.3);
	
	
	
	var outgoingPipeHorizontal = draw.rect(0.01,18).attr ({
		'fill': '#00B0EA',
		x: 891 ,
		y: 391 
	});
	
	outgoingPipeHorizontal.animate({delay: '7.6s'}).size(108,18);
	
	var outgoingPipeVertical = draw.rect(18,0.01).attr ({
		'fill': '#00B0EA',
		x: 981 ,
		y: 409
	});
	
	outgoingPipeVertical.animate({delay: '8.6s'}).size(18,139);
	
	$('#tankLeft')
		.animate({'height': 0},2000)
		.animate({'height': 150, 'top': 435}, 1000)
	
	$('#verticalPipe1')
		.animate({'height': 0}, 3200)
		.animate({'height': 145, 'top': 370},1000)
	
	$('#verticalPipe2')
		.animate({'height': 0}, 4200)
		.animate({'height': 115, 'top': 400},1000)
	
	$('#verticalPipe3')
		.animate({'height': 0}, 5200)
		.animate({'height': 85, 'top': 430},1000)
	
	$('#verticalPipe4')
		.animate({'height': 0}, 6200)
		.animate({'height': 55, 'top': 460},1000)
		
	
	$('#tankRight')
		.animate({'height': 0},7200)
		.animate({'height': 150, 'top': 435}, 1000)
	
	$('#measureTank')
		.animate({'height': 0},9600)
		.animate({'height': 60, 'top': 625}, 1000)
	
	
}

resultButton = document.getElementById("result");

resultButton.onclick = function() {
	calculate();
	
}











