
var bool = true;

function highlightButton (e, attachedElement) {
	console.log("highlighting button");
	attachedElement.style.backgroundColor = "blue";
	
}

function releaseInside (e, attachedElement){
	console.log("the Button is Pressed"); 
	attachedElement.style.backgroundColor = "red";
	var header= document.getElementById("buttonHeader");
	console.log(header);
	console.log("bool time");
	console.log(bool);
	if (bool===true)
	{
	header.style.color= "blue";
	}
	else{
	header.style.color= "black";
	}
	
	bool = !(bool); 
	
}


function releaseOutside (e, attachedElement){
	console.log("released but no action"); 
	myDiv.style.backgroundColor = "grey";
}  

function doNothing (e, attachedElement){
console.log("I'm doing nothing");
}

window.onload = function() {
  myDiv = document.getElementById("circleButton");
  windowDiv = document.getElementById("windowDiv");
  centerEle = document.getElementById("centerEle");
  intstruct = document.getElementById("instruct");
  console.log("printing:"+myDiv + windowDiv);

var buttonTest = {
	states: [
	{
		name: "start",
		transitions: [
		{
			input: "mouseDown",
			action: highlightButton,
			endState: "mouseIn"
		}]
	},
	{
		name: "mouseIn",
		transitions: [
			{
				input: "mouseUp",
				action: releaseInside,
				endState: "start"
				
			},
			{
				input: "mouseOut", 
				action: doNothing, 
				endState: "outsideRegion"
			}] 
	},
	{
		name: "outsideRegion",
		transitions: [
			{
				input: "mouseUp",
				action: releaseOutside,
				endState: "start",
				element: windowDiv,
				elementToActOn: windowDiv
			},
			{
				input: "mouseUp",
				action: releaseOutside,
				endState: "start",
				element: centerEle,
				elementToActOn: centerEle
			},
			{
				input: "mouseUp",
				action: releaseOutside,
				endState: "start",
				element: instruct,
			},
			{
				input: "mouseIn",
				action: doNothing, 
				endState: "mouseIn"
			}]
	}
	]

};

    var stateMachine = new StateMachine(buttonTest,  myDiv, windowDiv, centerEle, instruct );
};