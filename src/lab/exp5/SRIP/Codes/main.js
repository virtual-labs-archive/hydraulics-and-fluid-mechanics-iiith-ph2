




function move() {
  var elem = document.getElementById("myBar");   
  var width = 1;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 60) {
      clearInterval(id);
    } else {
      width=width+0.1; 
      elem.style.width = width + '%'; 
    }
  }
}
function move2() {


  var elem = document.getElementById("myBar1");   
  var width = 1;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 40) {
      clearInterval(id);
    } else {
      width=width+0.1; 
      elem.style.width = width + '%'; 
    }
  }
}

