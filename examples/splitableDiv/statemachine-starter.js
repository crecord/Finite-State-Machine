//Caroline Record Project 3

// global iterator that keeps track of position in state array
iterator = 0;

//this function adds listeners to all the elements passed in and transitions through 
//predefined states depending on what events occur
// parameters: description is the stateMachine and elementToAttach is the domElement
//to listen to and effect. Other parameters may be passed in if the user wants to attach
//the state machine to multiple objects 
function StateMachine(description, elementToAttach ) {

// storing all the elements that need event listeners in an array (assumes the user 
// passed in more than two arguments) 
var elements = [];
for (var i =1; i < arguments.length; i++){
	elements.push(arguments[i]);
	//console.log(arguments[i]);
}

//accesses the array of states within the object "description"
var stateTable = description.states;
// uses the global iterator to keep track of the current state
var currentState = stateTable[iterator];

//this function is called every time there is an event
//Parameters: it passes in its name (aka how it will be identified in the state-machine)
//			  and the event itself ("currentEvent")
	function checkTransition (name,currentEvent) { 
		// it goes through each transition within the current state
		for (var i = 0; i< currentState.transitions.length; i++){
			//looks at the current transition
			var trans = currentState.transitions[i];
			//define a boolean that determines whether the current-event's corresponding
			// DomElement is the correct one to be listening too
			//for that particular transition.
			var eventElementMatch;
			if (trans.element === undefined){
					eventElementMatch = (elements[0] === event.srcElement);
				}
				else{
					eventElementMatch = (trans.element === event.srcElement);
				}
			if (name=== "keyUp"){
			console.log("I've got a key");
			console.log("my boolean is: "+ eventElementMatch);
			console.log("I am trying to match" + trans.input);
			}
			
			//console.log( event.srcElement);
			// check if the input specified in the FMS matches the current event type
			if (trans.input === name & eventElementMatch ){
				console.log("calling something");
				//console.log("currentState:" + currentState.name);
				//console.log("trans.input:" + trans.input);
				//console.log("trans.endState:" + trans.endState);
				//console.log("I was listening to this element: " + event.toElement.id);
				
				//defines the right element to call the action on
				var correctElement; 
				if (trans.elementToActOn === undefined){
					if (trans.element === undefined){
						correctElement = elements[0];
					}
					else{
						correctElement = trans.element
					}
				}
				else {
					correctElement = trans.elementToActOn;
				}
			
				//calls the action on the correct event
				
				trans.action(currentEvent, correctElement);
				//updates the iterator by calling helper function
				iterator = nextTranstionByName(trans,stateTable);
				//updates the current state using the iterator
				currentState = stateTable[iterator];
				}	
			
		}
	}


// iterates backwards through all the elements that the FMS it to be attached to
for (var i= (elements.length-1); i >= 0; i--){
  console.log("iterator:" + i)
  element  = elements[i];
  
  //console.log("hello");
    element.addEventListener("keyup",function(event){
    console.log(event);
    currentEvent=event;
    var name= "keyUp"
  	checkTransition (name,currentEvent, element);
  }); 
  element.addEventListener("mousedown",function(event){
  	//console.log("the mouse is down");
  	var currentEvent=event;
  	var name= "mouseDown"
  	checkTransition (name,currentEvent,event);
  });   
  element.addEventListener("mouseup",function(event){
  	//console.log("the mouse is up now");
  	var currentEvent=event;
  	var name= "mouseUp"
  	checkTransition (name,currentEvent, element);
  }); 
  element.addEventListener("click",function(event){
  	//console.log ("I was clicked")
    currentEvent=event;
    var name= "click"
  	checkTransition (name,currentEvent, element);
  }); 
  element.addEventListener("mousemove",function(event){
    currentEvent=event;
  	var name= "mouseMove"
  	checkTransition (name,currentEvent, element);
  }); 
  element.addEventListener("mouseout",function(event){
    
    //console.log("I just Moused out of : "+ event.toElement.id);
    currentEvent=event;
    var name= "mouseOut"
  	checkTransition (name,currentEvent,element);
  });
  element.addEventListener("mouseover",function(event){
  // console.log("I just Moused out into: "+ event.toElement.id);
    currentEvent=event;
    var name= "mouseIn"
  	checkTransition (name,currentEvent, element);
  }); 


  }
}


//returns the appropriate index of the current state
//Parameters:the transition that was just completed and the name of the state Array
function nextTranstionByName(activeTransition,stateArray){
	//Find the endstate of of the given transition
	var endState = activeTransition.endState;
	//Find the index of that name in the array of states
	for (var i=0; i < stateArray.length; i++){
		var object  = stateArray[i];
		if (object.name === endState){
			//return it
			return stateArray.indexOf(object);
		}
	}
	console.log( "Error:did not find state matching end state");
}


