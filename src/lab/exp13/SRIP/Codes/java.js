
		var degrees=360;

		function rotat(el,speed)
		{

			var looper;

			var elem=document.getElementById(el);
			elem.style.transform="rotate("+degrees+"deg)";
			looper=setTimeout('rotat(\''+el+'\','+speed+')',speed);
			degrees--;

			if(degrees<1)
				degrees=360;

		}

		function draw()
		{
			// var elem = document.getElementById('draw-shapes');
			// var params = { width: 285, height: 200 };
			// var two = new Two(params).appendTo(elem);

			// // two has convenience methods to create shapes.
			// var rect = two.makeRectangle(213, 100, 1000, 1000);

			// //rect.fill = 'rgb(0, 0, 0)';
			// //rect.opacity = 0.10;
			// rect.Stroke='black';

			// // Don't forget to tell two to render everything
			// // to the screen


			var elem = document.getElementById('draw-shapes');
			var two = new Two({ fullscreen: true }).appendTo(elem);

			var rectA = two.makeRectangle(900, 400, 1500, 700);
			rectA.stroke = 'black';

			rectA.fill='grey';
			rectA.opacity=0.10;

			two.update();

			// var d=SVG("draw-shapes").size(1500,1100);
			// var rect=d.rect(1500,700).attr({
			// 	'fill':'#000000',
			// 	'stroke':'#000000',
			// 	'stroke-width':'3px',
			// 	'opacity':0.10
			// });

			// rect.x(300);
			// rect.y(100);
			
		}


		function line()
		{
			var d=SVG("lines").size(800,800);
			var l1=d.line([[480,500],[800,500]]).stroke({width:2})

			var l2=d.line([[500,480],[800,480]]).stroke({width:2})

			var l3=d.line([[480,300],[480,500]]).stroke({width:2})

			var l4=d.line([[500,300],[500,480]]).stroke({width:2})

			var l5=d.line([[500,300],[575,300]]).stroke({width:2})

			var l6=d.line([[480,300],[400,300]]).stroke({width:2})

			var l7=d.line([[400,300],[400,100]]).stroke({width:2})

			var l8=d.line([[575,300],[575,100]]).stroke({width:2})

		}

