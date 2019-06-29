	

	function construct()
	{

			var draw=window.value;

			var v1=draw.polyline([[800,500],[1100,500],[1100,510],[800,510],[800,500]]).stroke({width:2}).attr({
				'fill':'#A3A09E'
			});

			var v2=draw.line([[800,500],[800,335]]).stroke({width:2});

			var v12=draw.line([[800,295],[800,250]]).stroke({width:2});
			
			var v3=draw.line([[1100,500],[1100,250]]).stroke({width:2});
			
			var v4=draw.path('M 800 250 q 150 -350 300 0').fill('none').stroke({width:2});
			
			var v5=draw.circle(100).fill('none').stroke({width:2}).attr({
				cx:948,
				cy:250
			});

			var v6=draw.circle(90).fill('none').stroke({width:2}).attr({
				cx:948,
				cy:250
			});

			var v14=draw.circle(30).fill('#A3A09E').stroke({width:2}).attr({
				cx:949,
				cy:250
			});



			var v15=draw.polyline([[998,260],[1025,260],[998,240]]).stroke({width:2});

			var v16=draw.polyline([[900,240],[873,240],[900,260]]).stroke({width:2});

			var v17=draw.polyline([[955,200],[955,175],[935,202]]).stroke({width:2});

			var v18=draw.polyline([[940,300],[940,325],[960,298]]).stroke({width:2});

			// var v19=draw.polyline([[976,290],[998,305],[993,275]]).stroke({width:2});

			// var v20=draw.polyline([[918,270	],[890,306],[918,250]]).stroke({width:2});
			// var v7=draw.polyline([[905,225],[880,200],[]]).fill('none').stroke({width:2});

			var v7=draw.polyline([[970,165],[970,140],[1100,140],[1100,150],[980,150],[980,165]]).fill('none').stroke({width:2});
			
			var v15=draw.polyline([[970,165],[960,171],[990,171],[980,165]]).stroke({width:2});

			var v8=draw.polyline([[850,300],[780,290],[680,290]]).fill('none').stroke({width:2});
			
			var v9=draw.polyline([[850,330],[780,340],[680,340]]).fill('none').stroke({width:2});

			// var v10=draw.polyline([[680,340],[650,330]]).fill('none').stroke({width:2});

			
			var v10=draw.path('M 680 340 Q 630 340 550 200').fill('none').stroke({width:2});
			var v11=draw.path('M 680 290 Q 640 270 610 200').fill('none').stroke({width:2});

			var v13=draw.polyline([[600,310],[780,310],[780,305],[790,315],[780,325],[780,320],[600,320]]).fill('none').stroke({width:2});

			var v14=draw.polyline([[400,650],[400,510],[1250,510],[1250,650]]).fill('none').stroke({width:2});

	}


	window.onload=function()
	{
		window.value=SVG("setup").size(1800,1000);
		construct();
	}	

	function reload()
	{
		alert("Simulation Interuppted!!");
		location.reload();
	}

	function animation()
	{

			var draw=window.value;
		
			var v1 = draw.rect(0.1,50).attr ({
			'fill': '#00B0EA', 
			'fill-opacity':'0.7',			
			x: 670, 
			y: 290
			});

			v1.animate().size(130,50);

			var v2 = draw.rect(0.1,40).attr ({
			'fill': '#00B0EA', 
			'fill-opacity':'0.7',			
			x: 800, 
			y: 295

			});

			v2.animate({
				delay:'1s'
			}).size(29,40);


			var v3 = draw.rect(0.1,30).attr ({
			'fill': '#00B0EA', 
			'fill-opacity':'0.7',			
			x: 829, 
			y: 300
			});

			v3.animate({
				delay:'2s'
			}).size(100,30);
			

			

			alert("Simulation Begins!!");

			setTimeout(function(){
 			alert('Simulation Completed!!');},3000);
	}