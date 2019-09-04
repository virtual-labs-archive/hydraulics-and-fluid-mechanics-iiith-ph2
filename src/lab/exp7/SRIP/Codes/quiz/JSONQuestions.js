var questions = [
["When is orifice called ‘large orifice?", 
		"If the head of liquid is less than 5 times the depth of orifice",
        "If the head of liquid is less than 2.5 times the depth of orifice",
        "If the head of liquid is less Hence, 4 times the depth of orifice",
        "If the head of liquid is less than 1.5 times the depth of orifice", "1"],

["Find the discharge through totally drowned orifice of width 3.3 m if the difference of water levels on both side of the orifice be 50 cm. The height of water from to and bottom of the orifice are 2.25 m and 2.67 m respectively", 
		"2.8 m^3/s",
        "2.7 m^3/s",
        "2.6 m^3/s",
        "2.5 m3/s","1"],

["Find the discharge through a rectangular orifice 2.2 m wide and 1.3 m deep fitted to a easier tank. The water level in a team is 2.5 m above the top edge of orifice",  
		"11.5 m^3/s",
        "13.9 m^3/s",
        "16.9 m^3/s",
        "8.7 m^3/s","2"],

["What is Co-efficient of Discharge?", 
		"ratio of actual velocity of jet at vena-contracta to the theoritical velocity",
        "ratio of area of jet at the vena-contracta to the area of orifice",
        "ratio of actual discharge to theoritical discharge",
        "None of the above","3"],

["A rectangular orifice of 2 m width and 1.2 m deep is fitted in one side of large tank. The easier level on one side of the orifice is 3m above the top edge of the orifice while on the other side of the orifice the water level is 0.5 m below it’s top edge. Calculate discharge if Cd = .64", 
        "5.67 m^3/s",
        "3.56 m^3/s",
        "6.75 m^3/s",
        "4.95 m^3/s","4"],

["What is Co-efficient of contraction?", 
		"ratio of actual velocity of jet at vena-contracta to the theoritical velocity",
        "ratio of area of jet at the vena-contracta to the area of orifice",
        "ratio of actual discharge to theoritical discharge",
        "None of the above","2"],

["A beaker contains water up to a certain height. If the water is allowed to get discharged through a small pipe (of a uniform diameter), what type of flow will it be in the pipe?", 
		"steady and uniform",
        "unsteady and uniform",
        "steady and non-uniform",
        "unsteady and non-uniform","2"],

["The approximate distance ofvenacontracta from the centre of orifice is" , 
			"d",
            "d/4",
            "d/2",
            "d/8","3"],

["What is Co-efficient of velocity?", 
		"ratio of actual velocity of jet at vena-contracta to the theoritical velocity",
        "ratio of area of jet at the vena-contracta to the area of orifice",
        "ratio of actual discharge to theoritical discharge",
        "None of the above","1"],

["The time taken to empty the tank is __________ of Cd but depends only on the height and acceleration due to gravity", 
        "directly proprotional",
        "inversely proprotional",
        "independent",
        "none of the above","3"]
];

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
} 

shuffle(questions);