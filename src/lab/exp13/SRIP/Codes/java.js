	

	function construct()
	{

			var draw=window.value;
			var v1=draw.polyline([[200,100],[350,100],[350,200]]).fill('none').stroke({width:2});
			var v2=draw.polyline([[200,70],[380,70],[380,200]]).fill('none').stroke({width:2});
			
			var v3=draw.polyline([[250,180],[250,400],[480,400],[480,180]]).fill('none').stroke({width:2});

			var v4=draw.polyline([[350,400],[350,530],[600,530]]).fill('none').stroke({width:2});
			var v5=draw.polyline([[380,400],[380,500],[600,500]]).fill('none').stroke({width:2});
			var v6=draw.polyline([[900,515],[970,515],[980,515],[970,540],[900,515],[900,585],[900,595],[875,585],[900,515],[830,515],[820,515],[830,490],[900,515],[900,445],[900,435],[925,445],[900,515]]).fill('none').stroke({width:2});

	}


	window.onload=function()
	{
		window.value=SVG("setup").size(1200,1200);
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
		
			var v1 = draw.rect(0.1,30).attr ({
			'fill': '#00B0EA', 
			x: 200, 
			y: 70
			});

			v1.animate().size(180,30);


			var v2 = draw.rect(30,0.01).attr({
			'fill': '#00B0EA', 
			x:350, 
			y:100 
			});

			v2.animate({
				delay:'1s'
			}).size(30,200);

			var v3 = draw.rect(30,0.01).attr({
			'fill': '#00B0EA', 
			x:350, 
			y:400 
			});

			v3.animate({
				delay:'3s'
			}).size(30,130);

			var v4 = draw.rect(0.01,30).attr({
			'fill': '#00B0EA', 
			x:380, 
			y:500 
			});

			v4.animate({
				delay:'4s'
			}).size(400,30);

			var v5=draw.rect(230,0.01).attr({
			'fill':'#00B0EA',
			x:250,
			y:180
			});

			v5.animate({
				delay:'2s'
			}).size(230,220);



			$('#tankLeft')
			.animate({'height': 0},6000)
			.animate({'height': 150, 'top': 405}, 7000)

			alert("Simulation Begins!!");

			setTimeout(function(){
 			alert('Simulation Completed!!');},5000);
	}