//State

var promptTemplate = (
	"<div>"+
		"<span class='js-prompt'></span>"+
	"</div>"
);

var optionTemplate = (
		"<div>"+
"			<input type='radio' class='js-radio' name='radio-option' > "+
"			<span class='js-option option'></span>"+
"			<span class='feedback'></span>"+
"		</div>"
);

//State modification

function isCorrect(state, radioId){
	var correctId = findCorrect(radioId, state.currentProblem);
	return radioId == correctId;
}

function findCorrect(radioId){
	var res;
	res = state.problems[state.currentProblem].choices.find(function(option){
		return option.correct;
	});
	return res.id; 
}

function changeProblem(state){
	state.currentProblem++;
}

function incrementCorrect(state, id) {
		if(isCorrect(state, id)){
			state.numCorrect++;
		}
}

//Rendering

function renderOption(optText, optId, template, optAttr){
	var element = $(template);
	element
		.find(".js-option")
		.text(optText);
	element
		.find(".js-radio")
		.attr("id", optId)

	return element;
}

function renderProblem(state, optListElement, optAttr){
	var problemsHTML = state.problems[state.currentProblem].choices.map(
		(option, index) => 
			renderOption(option.text, index, optionTemplate)); //console.log(renderOption(option.text))}

	optListElement.html(problemsHTML);
}

function renderPrompt(state, promptElement, template){
	var element = $(template);
	var promptText = state.problems[state.currentProblem].prompt;	
	element
		.find(".js-prompt")
		.text(promptText);

	promptElement.html(element);
}


function renderFeedback(state, radioId,  optListElement){
	var correctId = findCorrect(radioId, state.currentProblem);
	var correct = isCorrect(state, radioId);

	if(correct === false){
		$(optListElement)
			.find("#"+radioId)
			.closest("div")
			.find(".feedback")
			.text("Incorrect")
			.css("color", "red");
	}

	$(optListElement)
			.find("#"+correctId)
			.closest("div")
			.find(".feedback")
			.text("Correct")
			.css("color", "green");
	
   }

 function renderMetrics(state, currProbElement, numCorrectElement, numAnsweredElement){
 	currProbElement.text(state.currentProblem);
 	numCorrectElement.text(state.numCorrect);
 	numAnsweredElement.text(state.numAnswered);

 }

 function renderAll(
 	state, promptElement,  promptTemplate, optListElement, currProbElement, numCorrectElement , numAnsweredElement){
   	renderPrompt(state, promptElement,  promptTemplate);
	renderProblem(state, optListElement);	
	renderMetrics(state, currProbElement, numCorrectElement ,numAnsweredElement);
   }


// Event Handlers

function handleSubmit(state, optListElement, currProbElement, numCorrectElement, numAnsweredElement){
	$(".js-submit").click(function (){
		$("input").each(function (){
			if($(this).is(":checked")){				
				var id = $(this).attr("id");
				state.numAnswered++;
				incrementCorrect(state, id);
				renderFeedback(state, id,  optListElement);
				renderMetrics(state, currProbElement, numCorrectElement, numAnsweredElement)
			}
		})

	});
}

function handleNext(state, promptElement, optListElement, promptTemplate, currProbElement, numCorrectElement, numAnsweredElement){
	$(".js-next").click(function() {
		changeProblem(state);
		renderAll(state, promptElement, promptTemplate, optListElement , currProbElement, numCorrectElement, numAnsweredElement);
	})
}

function main(){
	var optListElement = $(".js-option-list");
	var promptElement = $(".js-prompt"); 
	var currProbElement = $(".js-currProb");
	var numCorrectElement = $(".js-numCorrect");
	var numAnsweredElement= $(".js-answered");
	var totalProb = state.problems.length;
	$(".js-totalProb").text(totalProb);	
	renderAll(state, promptElement,  promptTemplate, optListElement, currProbElement, numCorrectElement, numAnsweredElement);
	handleSubmit(state, optListElement, currProbElement, numCorrectElement, numAnsweredElement);
	handleNext(state, promptElement, optListElement, promptTemplate , currProbElement, numCorrectElement);

}

$(document).ready(main());

