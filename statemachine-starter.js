iterator = 0;


// Your task is to fill in the rest of this file with your state machine, and then save
// the file to statemachine.js.
function StateMachine(description, elementToAttach) {
// the description is an object that stores an array of objects of different states
console.log(description.states);
var stateTable = description.states;
var currentState = stateTable[iterator];
console.log(currentState);
// the event that is currently being called
//function is called every time there is an event
//Parameters: it passes in its name (aka how it will be identified in the state-machine)
//			  and the event itself ("currentEvent")
	function checkTransition (name,currentEvent) { 
		//console.log("the event is:" + currentEvent);
		console.log("what is wrong with OutsideRegion?" + "," + currentState.name +"," +  currentState.transitions.length);
		for (var i =0; i< currentState.transitions.length; i++){
			//console.log("the iterator is:" + i);
			var trans = currentState.transitions[i];
			if (trans.input === name){
				//console.log("in the if!");
				trans.action(currentEvent, elementToAttach);
				//console.log("the length is:" + stateTable.length);
				//console.log("the current iterator before is:" + iterator);
				// call a function that moves the currentState to the appropriate 
				//state.
				iterator = nextTranstionByName(trans,stateTable);
				currentState = stateTable[iterator];
				}	
			//if (iterator >= stateTable.length-1){
			//	iterator =0;
			//	}
			//else {
			//	iterator++; }
			//console.log("the current iterator after is:" + iterator);		
			
		}
	}
//categorize all input into being recognizable as "mouse up" "mouse down"
  elementToAttach.addEventListener("mousedown",function(event){
  	var currentEvent=event;
  	var name= "mouseDown"
  	checkTransition (name,currentEvent);
  });   
  elementToAttach.addEventListener("mouseup",function(event){
  	var currentEvent=event;
  	var name= "mouseUp"
  	checkTransition (name,currentEvent);
  }); 
  elementToAttach.addEventListener("click",function(event){
    currentEvent=event;
    var name= "click"
  	checkTransition (name,currentEvent);
  }); 
  elementToAttach.addEventListener("mousemove",function(event){
    currentEvent=event;
  	var name= "mouseMove"
  	checkTransition (name,currentEvent);
  }); 
  elementToAttach.addEventListener("mouseout",function(event){
    currentEvent=event;
    var name= "mouseOut"
  	checkTransition (name,currentEvent);
  });
  elementToAttach.addEventListener("mousein",function(event){
    currentEvent=event;
    var name= "mouseIn"
  	checkTransition (name,currentEvent);
  }); 
    elementToAttach.addEventListener("keypress",function(event){
    currentEvent=event;
    var name= "keyPress"
  	checkTransition (name,currentEvent);
  }); 
  
}

function nextTranstionByName(activeTransition,stateArray){
	//Find the endstate of of the given transition
	var endState = activeTransition.endState;
	console.log(endState);
	//Find what index that name is places at in the description
	for (var i=0; i < stateArray.length; i++){
		var object  = stateArray[i];
		if (object.name === endState){
			//return it
			return stateArray.indexOf(object);
		}
	}
	console.log( "Error:did not find state matching end state");
}


