
function experimentSetup() {
    
    var draw = SVG("bernoulli-animation").size(1300,1000);

    var tankLeft = draw.polyline([[200,200],[220,220],[220,450],[400,450],[400,220],[420,200]]).fill('none').stroke ({
    	width: 3 
	});  
	
	var incomingPipe = draw.polyline([[300,250],[300,150],[150,150],[150,170],[280,170],[280,250]]).fill('none').stroke ({
		width: 3
	});

	var ductLower = draw.polyline([[400,425],[460,405],[650,405],[710,425]]).fill('none').stroke ({
    	width: 3
	});

	var ductUpper = draw.line([[400,380],[710,380]]).stroke ({ 
    	width: 3
	});

	var tankRight = draw.polyline([[690,200],[710,220],[710,450],[890,450],[890,220],[910,200]]).fill('none').stroke ({ 
    	width: 3
	});

	var verticalPipe1 = draw.polyline([[430,380],[430,220],[445,220],[445,380]]).fill('none').stroke ({ 
    	width: 3
	});

	var verticalPipe2 = draw.polyline([[465,380],[465,220],[480,220],[480,380]]).fill('none').stroke ({ 
    	width: 3
	});

	var verticalPipe3 = draw.polyline([[500,380],[500,220],[515,220],[515,380]]).fill('none').stroke ({
    	width: 3
	});

	var verticalPipe4 = draw.polyline([[535,380],[535,220],[550,220],[550,380]]).fill('none').stroke ({
    	width: 3
	});

	var verticalPipe5 = draw.polyline([[570,380],[570,220],[585,220],[585,380]]).fill('none').stroke ({
    	width: 3
	});

	var verticalPipe6 = draw.polyline([[605,380],[605,220],[620,220],[620,380]]).fill('none').stroke ({
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











