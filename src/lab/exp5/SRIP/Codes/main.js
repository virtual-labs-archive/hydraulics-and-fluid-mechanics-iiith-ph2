



function move() {
  var elem = document.getElementById("myBar");   
  var width = 1;
  
  function frame() {
    if (width >= 57) {
      clearInterval(id);

    } else {
      width=width+0.05; 
      elem.style.width = width + "%"; 
    }
  }
  var id = setInterval(frame, 10);
}
/*function move01() {
  var elem = document.getElementById("myBar");   
elem.removeAttribute("style","width");
}
function move02() {
  var elem = document.getElementById("myBar1");   
elem.removeAttribute("style","width");
}
*/
function move2() {


  var elem = document.getElementById("myBar1");   
  var width = 1;

  function frame() {
    if (width >= 45) {
      clearInterval(id);
    } else {
      width=width+0.06; 
      elem.style.width = width + "%"; 
    }
  }
  var id = setInterval(frame, 10);
}
function t1()
{
var path = document.querySelector('#top1');
var length = path.getTotalLength();
path.style.transition = path.style.WebkitTransition = 'none';
path.style.strokeDasharray = length + " " + length;
path.style.strokeDashoffset = '0';



path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 12s ease-in-out';
path.style.strokeDashoffset = length;
}

function t2()
{
	var path2 = document.querySelector('#top2');
var length2 = path2.getTotalLength();
path2.style.transition = path2.style.WebkitTransition = 'none';
path2.style.strokeDasharray = length2 + " " + length2;
path2.style.strokeDashoffset = '0';



path2.style.transition = path2.style.WebkitTransition = 'stroke-dashoffset 12s ease-in-out';
path2.style.strokeDashoffset = length2;

	}
	function t3()
{
	var path3 = document.querySelector('#top3');
var length3 = path3.getTotalLength();
path3.style.transition = path3.style.WebkitTransition = 'none';
path3.style.strokeDasharray = length3 + " " + length3;
path3.style.strokeDashoffset = '0';


path3.style.transition = path3.style.WebkitTransition = 'stroke-dashoffset 12s ease-in-out';
path3.style.strokeDashoffset = -length3;
}
function t4()
{

	var path4 = document.querySelector('#top4');
var length4 = path4.getTotalLength();
path4.style.transition = path4.style.WebkitTransition = 'none';
path4.style.strokeDasharray = length4 + " " + length4;
path4.style.strokeDashoffset = '0';


path4.style.transition = path4.style.WebkitTransition = 'stroke-dashoffset 12s ease-in-out';
path4.style.strokeDashoffset = -length4;
	}
function t()
{
	var path = document.querySelector('#top');
var length = path.getTotalLength();
path.style.transition = path.style.WebkitTransition = 'none';
path.style.strokeDasharray = length + " " + length;
path.style.strokeDashoffset = '0';


path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 12s ease-in-out';
path.style.strokeDashoffset = length;
	}




/*
function t11()
{
var path = document.querySelector('#top1');
path.removeAttribute("style");
}
function t01()
{
var path = document.querySelector('#top');
path.removeAttribute("style");
}
function t21()
{
var path = document.querySelector('#top2');
path.removeAttribute("style");
}
function t31()
{
var path = document.querySelector('#top3');
path.removeAttribute("style");
}
function t41()
{
var path = document.querySelector('#top4');
path.removeAttribute("style");
}
*/




















