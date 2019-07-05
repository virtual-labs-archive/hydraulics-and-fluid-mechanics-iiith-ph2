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
		document.getElementById('plot').disabled=true;
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

			var v4=draw.rect(20,0.1).attr({
			'fill': '#00B0EA', 
			'fill-opacity':'0.7',			
			x: 883, 
			y: 330
			});

			v4.animate({
				delay:'3s'
			}).size(20,170);


			var v5=draw.rect(20,0.1).attr({
			'fill': '#00B0EA', 
			'fill-opacity':'0.7',			
			x: 903, 
			y: 310
			});

			v5.animate({
				delay:'3s'
			}).size(20,190);


			var v6=draw.rect(60,0.1).attr({
			'fill': '#00B0EA', 
			'fill-opacity':'0.7',			
			x: 923, 
			y: 317
			});

			v6.animate({
				delay:'3s'
			}).size(60,183);

			var v7=draw.rect(20,0.1).attr({
			'fill': '#00B0EA', 
			'fill-opacity':'0.7',			
			x: 983, 
			y: 305
			});

			v7.animate({
				delay:'3s'
			}).size(20,195);

			// $('#container')
		 //    .animate({
		 //      'height':170,
		 //      'top':500	
		 //    }, 7000)
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

		var Q,Q2,H,H2,n,n2,x,x2,n,m2;
		
	 	Q=document.getElementById("form").elements["water-rate1"].value;
	 	
	 	Q2=document.getElementById("form").elements["water-rate2"].value;
	 
	 	H=document.getElementById("form").elements["water-head1"].value;
	 	
	 	H2=document.getElementById("form").elements["water-head2"].value;
	 	
	 	n=document.getElementById("form").elements["revolution1"].value;

	 	n2=document.getElementById("form").elements["revolution2"].value;

	 	x=document.getElementById("form").elements["length1"].value;

	 	x2=document.getElementById("form").elements["length2"].value;

	 	m=document.getElementById("form").elements["mass1"].value;
	 	
	 	m2=document.getElementById("form").elements["mass2"].value;

	 	var omega=2*pi*n;
		var omega2=2*pi*n2;

	 	try
		{
		 		var input_power=density*g*H*Q;

		 		input_power=parseFloat(input_power)/1000;

		 		var output_power=parseFloat(omega)*m*x;


		 		var input_power2=density*g*H2*Q2;

		 		input_power2=parseFloat(input_power2)/1000;

		 		var output_power2=parseFloat(omega2)*m2*x2;

		 		var efficiency=parseFloat(output_power-output_power2)/parseFloat(input_power-input_power2); 

		 		// alert("The input power is "+input_power);
		 		// alert("The output power is "+output_power);
		 		// alert("Efficiency of the Pelton Turbine is "+efficiency);

		 		
		 		var chart = new CanvasJS.Chart("chartContainer",
				{

				    title:{
				    
				    	text: "Efficiency of the Pelton Turbine"
				    },

				    data: 
				    [
				      {
				        type: "line",

				        dataPoints: 
				        [
				        { x:input_power , y:output_power   },
				        { x:input_power2 ,y:output_power2  }
				        ]
				      }
				    ]
				});

				chart.render();

		 }

		catch(e)
		{
		 		alert("Error: "+e);
		}
	}

	function enable() 
	{
		document.getElementById('plot').disabled=false;
	}
