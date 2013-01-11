// this will be a simple animation using Soney's method

window.onload = function () {
	permLine = [];
	console.log(permLine); 
    var canvas = document.getElementById("myCanvas");
    console.log(canvas);
    var context = canvas.getContext("2d");
    var doodle = new Doodle(context);
    var doodle2 = new Doodle(context);
	
	context.save();
	
	function line(x, startXer, startYer ){
	var sline1 = new Line({
		startX: startXer,
		startY: startYer,
		endX: 3*x/2,
		endY: x,
		color: "red",
		lineWidth: 10
	});
	doodle.children[0]= sline1;
	console.log (doodle.children);
    doodle.draw();
    return sline1;
	}
	

	
	function draw(params, startT){		
		var percentage = (getTime()-startT)/params.duration;

		//debugger;
		//console.log(Anim.end);
		//console.log(Anim.start);
		//the drawing code
		var x = (params.end- params.start)*percentage+params.start;
		// feed this into line
		deleteEverything();
		var currentLine = line(x, params.startXer, params.startYer );
		console.log(percentage);
		if (percentage < 1) { // the animation is not done
			setTimeout(function (){ // call draw later
				//console.log(x);
				drawSolidifyLines();
				draw(params, startT); 
			},30);
		}
		else if (percentage >= 1){
		console.log("something is being added to PermLine");
			if (typeof(line) === "object"){
			solidifyLine(currentLine);
			}
		}
	}
	

	function solidifyLine(line){
		console.log("something is being added to PermLine");
		permLine.push(line);
	}
	
	function drawSolidifyLines(){
		console.log(permLine);
		for(var i =0; i < permLine.length-1; i++){
			var line = permLine[i];
			var inChildren = i;
			if (typeof(line) === "object"){
				doodle2.children[i] = line;
			}
			
			console.log (line);
			
		}
		console.log(doodle2.children);
		doodle2.draw();
	}
	//draw();
	
	function deleteEverything(){
//		context.save();
		context.clearRect(0,0,canvas.width, canvas.height);
//		context.restore();
		
	}
	
	function getTime(){
		var currentTime= (new Date()).getTime();
		return currentTime;
	}
	
function drawDownLeftToRight(event, element){
	var Anim ={
		duration: 3000,
		start: 20,
		end:300,
		startXer:20,
		startYer: 20
	} 
	var startTime = getTime();	
	console.log(startTime);
	var endTime= startTime + Anim.duration;
	draw(Anim, startTime);
}

function drawDownRightToLeft(event, element){
	var Anim ={
		duration: 3000,
		start: 600,
		end:100,
		startXer:200,
		startYer: 200
	} 
	var startTime = getTime();	
	console.log(startTime);
	var endTime= startTime + Anim.duration;
	draw(Anim, startTime);
	solidifyLine();
}




var animation = {
	states: [
	{
		name: "start",
		transitions: [
		{
			input: "keyLeft",
			action: drawDownLeftToRight,
			endState: "start"
		},
		{	
			input: "keyDown",
			action: drawDownRightToLeft,
			endState: "start"
		}
		]
	}
	]

};



    var stateMachine = new StateMachine(animation,  canvas );

}; 