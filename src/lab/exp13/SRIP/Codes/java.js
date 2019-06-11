
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

			var rectA = two.makeRectangle(910, 600, 800, 800);
			rectA.stroke = 'black';

			rectA.fill='grey';
			rectA.opacity=0.10;

			two.update();
		}

		