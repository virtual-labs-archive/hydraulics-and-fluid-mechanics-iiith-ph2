
var draw = SVG("bernoulli-setup").size(1300, 1000); //GLOBAL VARIABLE : DRAW

	

function experimentSetup() {


    var tankLeft = draw.polyline([[200, 200],[220, 220],[220, 450],[400, 450],[400, 220],[420, 200]]).fill('none').stroke ({
    	width: 3,
	});  
	
	var incomingPipe = draw.polyline([[300,250],[300,150],[150,150],[150,170],[280,170],[280,250]]).fill('none').stroke ({
		width: 3
	});
	
	
	var ductLower = draw.polygon([[400,425],[460,405],[650,405],[710,425],[710,380],[400,380]]).fill('#023141').stroke ({
    	width: 3
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
	
	var duct = draw.rect(0.01,3).attr ({ 
		x: 400, 
		y: 390, 
		'fill': '#00B0EA'
	});
	
	duct.animate(4600,'',2500).size(307,1)
	
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
	
	outgoingPipeVertical.animate({delay: '8.6s'}).size(18,140);
	
	$('#tankLeft')
		.animate({'height': 0},2000)
		.animate({'height': 150, 'top': 307}, 1000)
	
	$('#verticalPipe1')
		.animate({'height': 0}, 3200)
		.animate({'height': 145, 'top': 242},1000)
	
	$('#verticalPipe2')
		.animate({'height': 0}, 4200)
		.animate({'height': 115, 'top': 272},1000)
	
	$('#verticalPipe3')
		.animate({'height': 0}, 5200)
		.animate({'height': 85, 'top': 302},1000)
	
	$('#verticalPipe4')
		.animate({'height': 0}, 6200)
		.animate({'height': 55, 'top': 332},1000)
		
	
	$('#tankRight')
		.animate({'height': 0},7200)
		.animate({'height': 150, 'top': 307}, 1000)
	
	$('#measureTank')
		.animate({'height': 0},9600)
		.animate({'height': 60, 'top': 497}, 1000)
	
	
}


window.onload = function() {
	
	experimentSetup();
	toggleAnimation();
		
}












