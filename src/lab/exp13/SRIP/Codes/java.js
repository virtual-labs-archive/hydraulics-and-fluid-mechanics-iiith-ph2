	var img;

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
			
			// var v15=draw.polyline([[998,260],[1025,260],[998,240]]).stroke({width:2});

			// var v16=draw.polyline([[900,240],[873,240],[900,260]]).stroke({width:2});

			// var v17=draw.polyline([[955,200],[955,175],[935,202]]).stroke({width:2});

			// var v18=draw.polyline([[940,300],[940,325],[960,298]]).stroke({width:2});

			// var v19=draw.polyline([[976,290],[998,305],[993,275]]).stroke({width:2});

			var v7=draw.polyline([[970,165],[970,140],[1100,140],[1100,150],[980,150],[980,165]]).fill('none').stroke({width:2});
			
			var v15=draw.polyline([[970,165],[960,171],[990,171],[980,165]]).stroke({width:2});

			var v8=draw.polyline([[850,300],[780,290],[680,290]]).fill('none').stroke({width:2});
			
			var v9=draw.polyline([[850,330],[780,340],[680,340]]).fill('none').stroke({width:2});

			// var v10=draw.polyline([[680,340],[650,330]]).fill('none').stroke({width:2});

			
			var v10=draw.path('M 680 340 Q 630 340 550 200').fill('none').stroke({width:2});
			
			var v11=draw.path('M 680 290 Q 640 270 610 200').fill('none').stroke({width:2});

			var v13=draw.polyline([[600,310],[780,310],[780,305],[790,315],[780,325],[780,320],[600,320]]).fill('none').stroke({width:2});

			var v14=draw.polyline([[400,650],[400,510],[1250,510],[1250,650],[400,650]]).fill('none').stroke({width:2});
	
			img = draw.image('34542.png');
			img.size(135,135).move(880, 190);
	}

	window.onload=function()
	{
		window.value=SVG("setup").size(1800,800);
		construct();
	}	

	function reload()
	{
		document.getElementById('start').disabled = true;

		location.reload();
	}

	function animation(btn)
	{

			document.getElementById(btn.id).disabled = true;

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
			}).size(75,30);


			$('#container')
		    .animate({
		      'height':170,
		      'top':500	
		    }, 7000)
		 //    .animate({
		 //      'height': 150,
		 //      'top': 500
		// }, 3000);
			
			img.animate({
			delay:'3s'
			}).rotate(-50);
	}

	function b()
	{
		var g=9.81;
		var density=1000;
		var pi=3.14159265359;
	 	var Q=document.getElementById("form").elements["water-rate"].value;
	 	var H=document.getElementById("form").elements["water-head"].value;
	 	var n=document.getElementById("form").elements["revolution"].value;
	 	var x=document.getElementById("form").elements["length"].value;
	 	var m=document.getElementById("form").elements["mass"].value;

	 	var omega=2*pi*n;

	 	try
	 	{
	 		if(Q==""||Q==null,H==""||H==null,n==""||n==null,x==""||x==null,m==""||m==null)
	 		throw("Fill all the inputs");
	 		
	 		if(Q<=0||H<=0||n<=0||x<=0||m<=0)
	 		throw("The input value should be positive");

	 		var input_power=density*g*H*Q;

	 		alert("The input power is "+input_power);

	 		var output_power=parseFloat(omega)*m*x;

	 		// alert(omega,m,x);

	 		alert("The output power is "+output_power);

	 		// var efficiency=output_power/input_power;

	 		// alert("Efficiency of the Pelton Turbine is "+efficiency);
	 	}

	 	catch(e)
	 	{
	 		alert("Error: "+e);
	 	}
	 	
	}
