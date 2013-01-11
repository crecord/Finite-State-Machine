window.onload = function() {

    var canvas = document.getElementById("myCanvas");
    //console.log(canvas);
    var context = canvas.getContext("2d");
    var doodle = new Doodle(context);  


//    var stateMachine = new StateMachine(buttonTest,  myDiv, windowDiv );


function drawLine (startRex, startYon, endRex,endYon){
		var followLine = new Line({
        color: "black",
        lineWidth: 1,
        startX: startRex,
        startY: startYon,
        endX: endRex,
        endY: endYon
	});
	draw(followLine);
	return followLine
	}

//draws using the library 
function draw (objName){
		//uses only index 0 so that is draws one as a time
    	doodle.children[0]=objName;
    	//console.log (doodle.children);
    	doodle.draw();
    	}

function deleteEveryThing(){
    	context.save();
		context.clearRect(0, 0, canvas.width, canvas.height);
		// Restore the transform
		console.log("delete");
		context.restore()
}    

function deleteEveryThingForReal(){
linesToKeep = [];
deleteEveryThing();
}

var lastLine = null;
var linesToKeep =[]; 

function startLine(event, action){
	startx = event.x;
	starty = event.y;
	//console.log (" I am starting the line at"+ startx + "," + starty )
	var endx = event.x;
	var endy = event.y; 
	var theLine = drawLine(startx, starty, endx, endy);
	
	console.log (" the line width"+ theLine.lineWidth) 
}

function drawLine2(event, action){
	endx= event.x;
	endy = event.y; 
	// delete everything
	deleteEveryThing();
	//redraw all the solidified lines
	for(var i=0; i < linesToKeep.length; i++){
		draw(linesToKeep[i]);
	} 
	//draw the current line
	theLine = drawLine(startx, starty, endx, endy);

}
	
function solidifyLine (event3, action){
	endx= event3.x;
	endy = event3.y; 
	var newLine = drawLine(startx, starty, endx, endy);
	linesToKeep.push(newLine);
}


var lineTest = {
	states: [
	{
		name: "start",
		transitions: [
		{
			input: "mouseDown",
			action: startLine,
			endState: "drawing"
		},
		{ 
			input: "keyUp",
			action: deleteEveryThingForReal,
			endState: "start"
		}
		
		]
	},
	{
		name: "drawing",
		transitions: [
			{
				input: "mouseMove",
				action: drawLine2,
				endState: "drawing"
				
			},
			{
				input: "mouseUp", 
				action: solidifyLine, 
				endState: "start"
			},
			{ 
				input: "keyUp",
				action: deleteEveryThing,
				endState: "start"
				}
			
			] 
	}
	]

};



    var stateMachine = new StateMachine(lineTest,  canvas );
};