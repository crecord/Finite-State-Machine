window.onload = function() {
gripDiv = document.getElementById("gripDiv");
resizableDiv = document.getElementById("resizableDiv");
gripDiv.style.background = "blue";

placeGrip();

function placeGrip(){

gripDiv.style.height= "10px";
gripDiv.style.width="10px";
gripDiv.style.float = "right";
var currentHeight = parseInt(resizableDiv.style.height);
console.log(currentHeight);
var posForGrip = currentHeight - parseInt(gripDiv.style.height);
console.log(posForGrip);
gripDiv.style.marginTop= posForGrip ;
}

function reDraw(x,y){
	resizableDiv.style.height= y+"px";
	resizableDiv.style.width=x+"px";
	placeGrip();
	console.log("got in function");
	/*
	var bigDiv = document.createElement("div");
	bigDiv.id="resizableDiv";
	bigDiv.style.height = x + "px";
	bigDiv.style.height = x + "px";
	bigDiv.style.background = "green";
	bigDiv.style.position = "relative";
	document.documentElement.appendChild(bigDiv);
	
	var littleDiv = document.createElement("div");
	littleDiv.id="gripDiv";
	bigDiv.appendChild(littleDiv);
	
	placeGrip();
	var stateMachine = new StateMachine(bigDiv, littleDiv);
	*/
}




function startDivMove(event, attachedElement){
console.log("mouse Down");
gripDiv.style.background= "red";
reDraw(event.x,event.y);
console.log(event);
}

function resize(event, attachedElement){
// delete everything
//deleteEveryThing(); 
//redraw at correct size
reDraw(event.x,event.y);
console.log("resize");
}

function solidifyDiv(event, attachedElement){
console.log("Mouse Up");
gripDiv.style.background= "blue";
reDraw(event.x,event.y);
}

function deleteEveryThing(){
    	//resizableDiv.removeChild(resizableDiv);
		document.body.removeChild(resizableDiv);
		console.log("delete");
}    

windowDiv = document.getElementById("windowDiv");
var drag = {
	states: [
	{
		name: "start",
		transitions: [
		{
			input: "mouseDown",
			action: startDivMove,
			endState: "moving"
		}
		
		]
	},
	{
		name: "moving",
		transitions: [
			{
				input: "mouseMove",
				action: resize,
				endState: "moving",
				element: windowDiv
				
			},
			{
				input: "mouseMove",
				action: resize,
				endState: "moving",
				element: resizableDiv
				
			},
			{
				input: "mouseUp", 
				action: solidifyDiv, 
				endState: "start",
				element: windowDiv
			},
			{
				input: "mouseUp", 
				action: solidifyDiv, 
				endState: "start",
			}
		] 
	}
	]
	}

console.log(drag);
console.log(gripDiv);
 var stateMachine = new StateMachine(drag, gripDiv, windowDiv, resizableDiv);

};