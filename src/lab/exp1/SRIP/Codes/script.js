
var draw = SVG("bernoulli-setup").size(1200, 620); //GLOBAL VARIABLE : DRAW

//FUNCTION experimentSetup() TO DRAW EXPERIMENT OUTLINES

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
	


	var verticalPipe2 = draw.polyline([[500,380],[500,220],[515,220],[515,380]]).fill('none').stroke ({
    	width: 3
	});



	var verticalPipe3 = draw.polyline([[570,380],[570,220],[585,220],[585,380]]).fill('none').stroke ({
    	width: 3
	});

	
	
	var verticalPipe4 = draw.polyline([[640,380],[640,220],[655,220],[655,380]]).fill('none').stroke ({ 
    	width: 3
	});



	var measureTank = draw.polyline([[890,390],[1000,390],[1000,450],[1150,450],[1150,550],[920,550],[920,450],[980,450],[980,410],	[890,410]]).fill('none').stroke ({
    
    	width: 3   
	});
	

	
}

// FUNCTION toggleAnimation() IS FOR THE WATER ANIMATIONS IN THE EXPERIMENT

	function toggleAnimation() {
	
	
	// HORIZONTAL WATER ANIMATIONS USING SVG.JS
		
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
	
		
		
	// VERTICAL WATER ANIMATIONS USING JQUERY.JS
		
	$('#tankLeft')
		.animate({'height': 0},2000)
		.animate({'height': 150, 'top': 405}, 1000)
	
	$('#verticalPipe1')
		.animate({'height': 0}, 3200)
		.animate({'height': 145, 'top': 341},1000)
	
	$('#verticalPipe2')
		.animate({'height': 0}, 4200)
		.animate({'height': 115, 'top': 371},1000)
	
	$('#verticalPipe3')
		.animate({'height': 0}, 5200)
		.animate({'height': 85, 'top': 401},1000)
	
	$('#verticalPipe4')
		.animate({'height': 0}, 6200)
		.animate({'height': 55, 'top': 431},1000)
		
	
	$('#tankRight')
		.animate({'height': 0},7200)
		.animate({'height': 150, 'top': 405}, 1000)
	
	$('#measureTank')
		.animate({'height': 0},9600)
		.animate({'height': 60, 'top': 596}, 1000)
	
	
}


// CALLS EXPERIMENT SETUP AND EMPTY GRAPH AFTER LOADING THE HTML BODY  
window.onload = function() {

	
experimentSetup();
plotGraph();
	
}

// FUNCTIONING OF THE START, RESET AND CALCULATIONS BUTTONS

var startButton = document.getElementById("start");
var resetButton = document.getElementById("reset");


startButton.onclick = function() {
	
	toggleAnimation();
	
	setTimeout(function(){
 		alert('Simulation Completed!');
		location.reload();
 },10600) 
	
	
	
}

resetButton.onclick = function() {
	location.reload();
}



var calcButton = document.getElementById("calc-button");

calcButton.onclick = function() {
	document.getElementById("myForm").scrollIntoView({behavior: 'smooth', block: 'center'});
}


// FUNCTION calculate() IS FOR THE CALCULATIONS PERFORMED IN THE EXPERIMENT 

function calculate() {
	
	var volume = document.getElementById("volume").value;
	
	var time = document.getElementById("time").value;
	
	var area = document.getElementById("area").value;
	
	var pressure = document.getElementById("pressure").value;
	
	var volume2 = document.getElementById("volume2").value;
	
	var time2 = document.getElementById("time2").value;
	
	var area2 = document.getElementById("area2").value;
	
	var pressure2 = document.getElementById("pressure2").value;
	
	if (volume == null || volume == "", time == null || time == "", area == null || area == "", pressure == null || pressure == "" || volume2 == null || volume2 == "", time2 == null || time2 == "", area2 == null || area2 == "", pressure2 == null || pressure2 == "")
        {
            alert("Please fill all the inputs!");
            return false;
        }
	
	try {
		// HANDLING EXCEPTIONS
		if(time <= 0 || time2 <= 0 || volume < 0 || volume2 < 0 || area <= 0 || area2 <= 0 || pressure < 0 || pressure2 < 0) {
			throw("Invalid input(s)! Values of Time and Area must be positive, values of Volume and Pressure must be non-negative");
		}
		
		else {
			
	//FOR READING 1		
	var discharge = parseFloat(volume)/parseFloat(time);
		
	
	var velocity = discharge/parseFloat(area);
	
	var velocityHead = (velocity*velocity)/19.6;
	
	var pressureHead = parseFloat(pressure)/0.0098;
	
	var totalHead = velocityHead + pressureHead;
			
	//FOR READING 2
			
	var discharge2 = parseFloat(volume2)/parseFloat(time2);
		
	
	var velocity2 = discharge2/parseFloat(area2);
	
	var velocityHead2 = (velocity2*velocity2)/19.6;
	
	var pressureHead2 = parseFloat(pressure2)/0.0098;
	
	var totalHead2 = velocityHead2 + pressureHead2;
	
	var avgTotalHead = (totalHead + totalHead2)/2; 
	
	if(!isNaN(totalHead)) {
			

		plotGraph(velocityHead,velocityHead2,pressureHead,pressureHead2,totalHead,totalHead2);
		alert("Average Total Head is " + avgTotalHead+ " cm");
		
		
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

// FUNCTION plotGraph() PLOTS THE GRAPH BY USING THE ANSWERS OBTAINED BY calculate() FUNCTION USING CANVAS.JS

function plotGraph(vh1,vh2,ph1,ph2,th1,th2) {
		var chart = new CanvasJS.Chart("chartContainer", {
		
			
		
	title:{
		
		text: "vs Total Head (in cm)",
		
	
	},
	axisY:[{
		title: "Pressure Head (in cm)",
		lineColor: "#C24642",
		tickColor: "#C24642",
		labelFontColor: "#C24642",
		titleFontColor: "#C24642",
		
	},
	{
		title: "Velocity Head (in cm)",
		lineColor: "#369EAD",
		tickColor: "#369EAD",
		labelFontColor: "#369EAD",
		titleFontColor: "#369EAD"
		
	}],
	
	toolTip: {
		shared: true
	},
	legend: {
		cursor: "pointer",
		itemclick: toggleDataSeries
	},
	data: [{
		type: "line",
		name: "Velocity Head",
		color: "#369EAD",
		showInLegend: true,
		axisYIndex: 1,
		dataPoints: [
			{ x: th1, y: vh1 }, 
			{ x: th2, y: vh2 }
			
		]
	},
	{
		type: "line",
		name: "Pressure Head",
		color: "#C24642",
		axisYIndex: 0,
		showInLegend: true,
		dataPoints: [
			{ x: th1, y: ph1 }, 
			{ x: th2 , y: ph2 }
		]
	},
	{
		
	}]
});
chart.render();

function toggleDataSeries(e) {
	if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	} else {
		e.dataSeries.visible = true;
	}
	e.chart.render();
}
}

// FUNCTIONING OF THE CALCULATE AND CLEAR BUTTONS
 
resultButton = document.getElementById("result");

resultButton.onclick = function() {
	calculate();
		
	
}

var clearButton = document.getElementById("clear-btn");

clearButton.onclick = function() {
	plotGraph();

}










