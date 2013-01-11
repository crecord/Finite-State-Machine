window.onload = function() {

snipDiv = document.getElementById("snippableDiv");
windowDiv = document.getElementById("windowDiv");
var yPos;


function doNothing(){
console.log("doing nada");
}

function recordY(event){
console.log("recording X: "+ event.y);
yPos = event.y; 
}

function doSnip(){
console.log("snipping Now");
snipDiv.style.height= yPos;
}

function reGrow(){
console.log("reGrowing div");
snipDiv.style.height= "600px";
}

var snippy = {
	states: [
	{
		name: "start",
		transitions: [
		{
			input: "mouseDown",
			action: doNothing,
			endState: "cutting",
			element: windowDiv
		},
		{
			input: "keyUp",
			action: reGrow,
			endState: "start",
			element: windowDiv
		}
		
		]
	},
	{
		name: "cutting",
		transitions: [
			{
				input: "mouseMove",
				action: recordY,
				endState: "snip",
				element: snipDiv
				
			},
			{
				input: "mouseUp",
				action: doNothing,
				endState: "start",
				element: windowDiv
				
			}
		] 
	},
	{
		name: "snip",
		transitions: [
			{
				input: "mouseUp",
				action: doSnip,
				element: windowDiv,
				endState: "start"
			},
			{
				input: "mouseUp",
				action: doNothing,
				element: snipDiv,
				endState: "start"
			}
		]	
	}
	]
	}


 var stateMachine = new StateMachine(snippy,  windowDiv, snipDiv);

};