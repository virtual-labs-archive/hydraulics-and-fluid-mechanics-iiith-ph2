var img;

function construct() {

    var draw = window.value;

    var v1 = draw.polyline([
        [800,   500],
        [1100,  500],
        [1120,  510],
        [780,   510],
        [800,   500]
    ]).fill('#A3A09E').stroke({
        width: 2
    });

    var v2 = draw.line([
        [800, 500],
        [800, 339]
    ]).stroke({
        width: 2
    });

    var v3 = draw.line([
        [800, 292],
        [800, 250]
    ]).stroke({
        width: 2
    });

    var v3 = draw.line([
        [1100, 500],
        [1100, 250]
    ]).stroke({
        width: 2
    });

	var v5=draw.path('M 800 250 A 100 100 0 0 1 1100 250').fill('none').stroke({
    	width:2
    })

    
    var v6 = draw.polyline([
        [970, 160],
        [970, 140],
        [1150,140],
        [1150,150],
        [980, 150],
        [980, 160]
    ]).fill('#A3A09E').stroke({
        width: 2
    });

    var v7=draw.polyline([
        [1150,100],
        [1160,100],
        [1160,600],
        [1150,600],
        [1150,100]
    ]).fill('#A3A09E').stroke({
        width:2
    });

    var v8 = draw.polyline([
        [970, 155],
        [960, 165],
        [990, 165],
        [980, 155]
    ]).stroke({
        width: 2
    });

    var v9 = draw.polyline([
        [680, 290],
        [800, 290],
        [820, 300],
        [865, 300]
    ]).fill('none').stroke({
        width: 2
    });

    var v10 = draw.polyline([
        [680, 340],
        [800, 340],
        [820, 330],
        [865, 330]
    ]).fill('none').stroke({
        width: 2
    });


    var v11 = draw.polyline([
        [680, 340],
        [630, 340],
        [630, 180]
    ]).fill('none').stroke({
        width: 2
    });

    var v12 = draw.polyline([
        [680, 290],
        [680, 180]
    ]).fill('none').stroke({
        width: 2
    });


    var v13 = draw.polyline([
        [600, 310],
        [780, 310],
        [780, 305],
        [790, 315],
        [780, 325],
        [780, 320],
        [600, 320]
    ]).fill('none').stroke({
        width: 2
    });

    var v14=draw.polyline([
        [615,200],
        [615,230],
        [695,230],
        [695,200],
        [615,200]
    ]).fill('#A3A09E').stroke({
            width:2
    });

    var v15=draw.polyline([
        [615,213],
        [560,213],
        [560,217],
        [615,217]
    ]).fill('#A3A09E').stroke({
        width:2
    });

    var v16=draw.polyline([
        [560,213],
        [560,100],
        [550,100],
        [550,600],
        [560,600],
        [560,213]
    ]).fill('#A3A09E').stroke({
        width:2
    });

    var v17=draw.polyline([
        [750,600],
        [750,510],
        [1140,510],
        [1140,600]
    ]).fill('none').stroke({
        width:2
    });

    // var v18=draw.polyline([
    //     [1150,250],
    //     [1150,260],
    //     [1020,260],
    //     [1020,250],
    //     [1150,250]
    // ]).fill('#A3A09E').stroke({
    //     width:2
    // });

    var v19=draw.polyline([
        [400,600],
        [1300,600]
    ]).stroke({
        width:2
    });

    // var v18=draw.circle().attr({
    //     cx:1020,
    //     cy:148,
    //     r:10
    // }).fill('none').stroke({
    //         width:5
    // }).attr({
    //     stroke:' #e82a2a '
    // });

    // var v13 = draw.polyline([
    //     [1200, 580],
    //     [450, 580],
    //     [650, 400],
    //     [800, 400]
    // ]).fill('none').stroke({
    //     width: 2
    // });

    // var v14 = draw.polyline([
    //     [1100, 400],
    //     [1350, 400],
    //     [1200, 580]
    // ]).fill('none').stroke({
    //     width: 2
    // });

    // var v15 = draw.polyline([
    //     [450, 580],
    //     [450, 600],
    //     [1200, 600],
    //     [1200, 580]
    // ]).fill('none').stroke({
    //     width: 2
    // });

    // var v16 = draw.polyline([
    //     [1200, 600],
    //     [1350, 420],
    //     [1350, 400]
    // ]).fill('none').stroke({
    //     width: 2
    // });

    // var v17 = draw.polyline([
    //     [500, 600],
    //     [500, 760],
    //     [520, 760],
    //     [520, 600]
    // ]).fill('none').stroke({
    //     width: 2
    // });


    // var v18 = draw.polyline([
    //     [630, 600],
    //     [630, 670],
    //     [650, 670],
    //     [650, 600]
    // ]).fill('none').stroke({
    //     width: 2
    // });


    // var v19 = draw.polyline([
    //     [1130, 600],
    //     [1130, 760],
    //     [1150, 760],
    //     [1150, 600]
    // ]).fill('none').stroke({
    //     width: 2
    // });


    // var v20 = draw.polyline([
    //     [1310, 467],
    //     [1310, 600],
    //     [1330, 600],
    //     [1330, 442]
    // ]).fill('none').stroke({
    //     width: 2
    // });


    img = draw.image('images/pelton.jpg');
    img.size(130, 130).move(878, 190);

    img2 = draw.image('images/meter.jpeg');
    img2.size(30,28).move(640, 201);

    img3=draw.image("images/water.jpg");
    img3.size(65,65).move(705,224);

}

window.onload = function() {
    window.value = SVG("setup").size(1800, 800);
    document.getElementById('plot').disabled = true;
    construct();
}

function reload() {
    document.getElementById('start').disabled = true;

    location.reload();
}


var degrees=60;
function rotat(el)
{
            el.animate([
                {transform:'rotate(-60)'},
                {repeatCount:'indefinite'}]
            );
}

function animation(btn) {

    document.getElementById(btn.id).disabled = true;

    var draw = window.value;

    var v0 = draw.rect(48, 0.1).attr({
        'fill': '#00B0EA',
        x: 631,
        y: 200
    });

    v0.animate().size(48, 139);

    v0.animate({
        delay:'7s'
    }).size(48,0.1);


     var v_0 = draw.rect(48, 0.1).attr({
        'fill': '#FFFFFF',
        x: 631,
        y: 200
    });

    v_0.animate({
        delay:'7s'
    }).size(48, 139);


    var v1 = draw.rect(0.01, 48).attr({
        'fill': '#00B0EA',
        // 'fill-opacity':'0.7',			
        x: 678,
        y: 291
    });

    v1.animate({
        delay: '1s'
    }).size(123, 48);

    var v_1 = draw.rect(0.01, 48).attr({
        'fill': '#FFFFFF',
        // 'fill-opacity':'0.7',            
        x: 670,
        y: 291
    });

    v_1.animate({
        delay: '8s'
    }).size(131, 48);

    var v2 = draw.rect(0.00001, 45).attr({
        'fill': '#00B0EA',
        // 'fill-opacity':'0.7',			
        x: 800,
        y: 294

    });

    v2.animate({
        delay: '2s'
    }).size(15, 42);


    var v_2 = draw.rect(0.0001, 45).attr({
        'fill': '#FFFFFF',
        // 'fill-opacity':'0.7',            
        x: 800,
        y: 294

    });

    v_2.animate({
        delay: '9s'
    }).size(16, 42);


    construct();

    var v3 = draw.rect(0.0001, 28).attr({
        'fill': '#00B0EA',
        // 'fill-opacity':'0.7',			
        x: 810,
        y: 301
    });

    v3.animate({
        delay: '2.75s'
    }).size(90, 28);

    var v_3 = draw.rect(0.0001, 28).attr({
        'fill': '#FFFFFF',
        // 'fill-opacity':'0.7',            
        x: 805,
        y: 301
    });

    v_3.animate({
        delay: '9.75s'
    }).size(95, 28);


    // // construct();

    // var v4 = draw.rect(0.1, 18).attr({
    //     'fill': '#00B0EA',
    //     // 'fill-opacity':'0.7',			
    //     x: 910,
    //     y: 305
    // });

    // v4.animate({
    //     delay: '3.65s'
    // }).size(15, 18);


    // // construct();

    // var v_4 = draw.rect(0.001, 18).attr({
    //     'fill': '#FFFFFF',
    //     // 'fill-opacity':'0.7',            
    //     x: 910,
    //     y: 315
    // });

    // v_4.animate({
    //     delay: '9.65s'
    // }).size(15, 18);



    var v5 = draw.rect(0.1, 15).attr({
        'fill': '#00B0EA',
        // 'fill-opacity':'0.7',			
        x: 900,
        y: 313
    });

    v5.animate({
        delay: '3.75s'
    }).size(83, 15);


    // construct();

    var v_5 = draw.rect(0.1, 15).attr({
        'fill': '#FFFFFF',
        // 'fill-opacity':'0.7',            
        x: 900,
        y: 313
    });

    v_5.animate({
        delay: '10.75s'
    }).size(84, 15);


    var v7 = draw.rect(83, 0.1).attr({
        'fill': '#00B0EA',
        // 'fill-opacity':'0.7',			
        x: 900,
        y: 313
    });

    v7.animate({
        delay: '5s'
    }).size(83, 181);

    // construct()

    var v_7 = draw.rect(85, 0.1).attr({
        'fill': '#FFFFFF',
        // 'fill-opacity':'0.7',            
        x: 899,
        y: 312
    });

    v_7.animate({
        delay: '10.75s'
    }).size(85, 88);



    $('#container').delay(5000)
        .animate({
            'height':'+=50px',
            'top': 585
        }, 2500);


    $('#container').delay(4000)
        .animate({
            'height':'+=30px',
             'top':555
        },2500);

    img.animate({
        delay: '3.75s'
    }).rotate(-80);

    img.animate().rotate(-150);
    img.animate().rotate(-250);
    img.animate().rotate(-360);
    img.animate().rotate(-80);
    img.animate().rotate(-150);
    img.animate().rotate(-230);
    img.animate().rotate(-280);

    // construct();
    // var temp=setTimeout(construct(),13000);

}


function b() {
    var g = 9.81;
    var density = 1000;
    var pi = 3.14159265359;

    var Q, Q2, H, H2, n, n2, x, x2, n, m2;

    Q = document.getElementById("form").elements["water-rate1"].value;

    Q2 = document.getElementById("form").elements["water-rate2"].value;

    H = document.getElementById("form").elements["water-head1"].value;

    H2 = document.getElementById("form").elements["water-head2"].value;

    n = document.getElementById("form").elements["revolution1"].value;

    n2 = document.getElementById("form").elements["revolution2"].value;

    x = document.getElementById("form").elements["length1"].value;

    x2 = document.getElementById("form").elements["length2"].value;

    m = document.getElementById("form").elements["mass1"].value;

    m2 = document.getElementById("form").elements["mass2"].value;

    var omega = 2 * pi * n;
    var omega2 = 2 * pi * n2;

    try {
        var input_power = density * g * H * Q;

        input_power = parseFloat(input_power) / 1000;

        var output_power = parseFloat(omega) * m * x;


        var input_power2 = density * g * H2 * Q2;

        input_power2 = parseFloat(input_power2) / 1000;

        var output_power2 = parseFloat(omega2) * m2 * x2;

        var efficiency = parseFloat(output_power - output_power2) / parseFloat(input_power - input_power2);

        // alert("The input power is "+input_power);
        // alert("The output power is "+output_power);
        // alert("Efficiency of the Pelton Turbine is "+efficiency);


        var chart = new CanvasJS.Chart("chartContainer", {

            title: {

                text: "Efficiency of the Pelton Turbine"
            },

            data: [{
                type: "line",

                dataPoints: [{
                        x: input_power,
                        y: output_power
                    },
                    {
                        x: input_power2,
                        y: output_power2
                    }
                ]
            }]
        });

        chart.render();

    } catch (e) {
        alert("Error: " + e);
    }
}

function enable() {
    document.getElementById('plot').disabled = false;
}