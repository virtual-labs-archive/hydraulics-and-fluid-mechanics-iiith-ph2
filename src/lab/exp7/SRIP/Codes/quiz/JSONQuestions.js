var questions = [
["For centrifugal pump impeller, the maximum value of the vane exit angle is", 
			"100 to 150",
            "150 to 200",
            "200 to 250",
            "250 to 300", "3"],

["In which turbine the pressure energy of water is first converted into kinetic energy by means of nozzle kept close to the runner?", 
			"Impulse turbine",
            "Reaction turbine",
            "Both a and b",
            "None of the mentioned","1"],

["The pressure of water is atmospheric and remains constant while passing over the runner in",  
			"Impulse turbine",
            "Reaction turbine",
            "Both a and b",
            "None of the mentioned","1"],

["The energy of water entering the reaction turbine is", 
			"fully the kinetic energy",
            "fully the pressure energy",
            "partly the pressure energy and partly the kinetic energy",
            "unpredictable","3"],

["Which of the following is an example of impulse turbine", 
			"Propeller turbine",
            "Francis turbine",
            "Kaplan turbine",
            "Pelton wheel","4"],

["What is the head of water available at turbine inlet in hydro-electric power plant called", 
			"head race",
            "tail race",
            "gross head",
            "net head","4"],

["Gross head is the difference between", 
			"head race and tail race",
            "head race and net head",
            "head race and friction losses",
            "net head and friction losses","1"],

["What is runaway speed of the runner of Pelton wheel" , 
			"maximum unsafe speed of the runner due to sudden increase in load on turbine",
            "minimum safe speed of the runner due to sudden increase in load on turbine",
            "maximum unsafe speed of the runner due to sudden decrease in load on turbine",
            "minimum safe speed of the runner due to sudden decrease in load on turbine","3"],

["Power required to drive a centrifugal pump is directly proportional to __________ of its impeller.", 
			"cube of diameter",
            "fourth power of diameter",
            "diameter",
            "square of diameter","2"],

["The hydraulic efficiency of Pelton turbine will be maximum when blade velocity is equal to", 
			"V/2",
            "V/3",
            "V/4",
            "V/5","1"],

["In Pelton turbine ___________ is defined as ratio between power delivered to runner and power supplied at inlet of turbine", 
			"Mechanical efficiency",
            "Volumetric efficiency",
            "Hydraulic efficiency",
            "Overall efficiency","3"],

["The maximum efficiency of Pelton turbine is", 
			"80%",
            "70%",
            "50%",
            "88%","3"],

["In Pelton turbine product of mechanical efficiency and hydraulic efficiency is known as", 
			"Mechanical efficiency",
            "Volumetric efficiency",
            "Hydraulic efficiency",
            "Overall efficiency", "4"],

["Among the following which turbine has least efficiency", 
			"Pelton turbine",
            "Kaplan turbine",
            "Francis turbine",
            "Propeller turbine", "1"],

["In Pelton experiment,____________ is ratio of volume of water actually striking the runner and volume of water supplied to turbine",  
			"Mechanical efficiency",
            "Volumetric efficiency",
            "Hydraulic efficiency",
            "Overall efficiency", "2"],

["In Pelton turbine the ratio of volume available at shaft of turbine and power supplied at the inlet of the turbine is", 
			"Mechanical efficiency",
            "Volumetric efficiency",
            "Hydraulic efficiency",
            "Overall efficiency", "4"],

["The expression for maximum hydraulic efficiency of Pelto turbine is given by ", 
			"(1+cos k)/2 where k is outlet blade angle",
            "(2+cos k)/2 where k is outlet blade angle",
            "(3+cos k)/2 where k is outlet blade angle",
            "(4+cos k)/2 where k is outlet blade angle", "1"],

["In the expression for overall efficiency of turbine, which is p/ (k*g*q*h), where “k” is known as", 
			"Specific density of liquid",
            "Density of liquid",
            "Specific gravity of liquid",
            "Volume of liquid", "2"],

["Number of buckets on runner of Pelton wheel is given by expression? (D-diameter of runner and d- diameter of jet)", 
			"15 + D/2d",
            "15 + 3D/2d",
            "15 + D/d",
            "15 + 2D/d", "1"],

["The expression for hydraulic efficiency is given by", 
			"2(V1-u)[1+cos k]u/V1*V1",
            "2(V1+u)[1+cos k]u/V1*V1",
            "2(V1-u)[1-cos k]u/V1*V1",
            "2(V1+u)[1+cos k]u/V1*V1",, "1"],

["In Pelton turbine inlet velocity of jet is 85.83m/s, inlet and outlet whirl velocities be 85.83 and 0.143 and blade velocity be 38.62 then its hydraulic efficiency is",  
			"80%",
            "70%",
            "90.14%",
            "85%", "3"],

["Design of Pelton wheel means the following data is to be determined",  
			"Width of buckets",
            "Depth of buckets",
            "Number of buckets",
            "All of the mentioned", "4"],

["The width of buckets of Pelton wheel is",  
			"2 times diameter of jet",
            "3 times diameter of jet",
            "4 times diameter of jet",
            "5 times diameter of jet", "4"],

["The depth of buckets of Pelton wheel", 
			"1.2 times diameter of jet",
            "1.3 times diameter of jet",
            "1.4 times diameter of jet",
            "1.5 times diameter of jet", "1"],

["The ratio of diameter of jet to diameter of runner is", 
			"1:3",
            "1:6",
            "1:5",
            "3:4", "2"]
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