//State

var state = {
	problems: [
		{
			prompt: "Find d/dx of x^2",
			choices: [ 
				{
					text: "x^3",
					correct: false,
					id: 0
				},
				{
					text: "2x^3",
					correct: false,
					id: 1
				},
				{
					text: "2x",
					correct: true,
					id: 2
				},
				{
					text: "1/2x",
					correct: false,
					id: 3
				}

			] 
		},

		{
			prompt: "Integrate x^2",
			choices: [ 
				{
					text: "x^3",
					correct: false,
					id: 0
				},
				{
					text: "2x^3",
					correct: false,
					id: 1
				},
				{
					text: "2x",
					correct: true,
					id: 2
				},
				{
					text: "1/2x",
					correct: true,
					id: 3
				}

			] 
		}
	]
}

var promptTemplate = (
	"<div>"+
		"<span class='js-prompt'></span>"+
	"</div>"
);

var optionTemplate = (
		"<div>"+
"			<input type='radio' class='js-radio' name='radio-option' > "+
"			<span class='js-option option'>Hiya</span>"+
"			<span class='feedback'></span>"+
"		</div>"
);

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

function renderProblem(state, optListElement, probNum, optAttr){
	var problemsHTML = state.problems[probNum].choices.map(
		(option, index) => 
			renderOption(option.text, index, optionTemplate)); //console.log(renderOption(option.text))}

	optListElement.html(problemsHTML);
}

function renderPrompt(state, promptElement, probNum, template){
	var element = $(template);
	var promptText = state.problems[probNum].prompt;	
	element
		.find(".js-prompt")
		.text(promptText);

	promptElement.html(element);
}

function findCorrect(radioId, probNum){
	var res;
	state.problems[probNum].choices.forEach(function (option){
		if(option.correct){
			res = option.id;
		}
	});
	return res; 
}

function renderFeedback(radioId, probNum, optListElement){
	var correctId = findCorrect(radioId, probNum);
	var correct = radioId == correctId;

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


// Event Handlers



function handleSubmit(probNum, optListElement){
	$(".js-submit").click(function (){
		$("input").each(function (){
			if($(this).is(":checked")){
				var id = $(this).attr("id");
				renderFeedback(id, probNum, optListElement);
				console.log(probNum);
			}
		})	
	});
} 

function main(){
	var optListElement = $(".js-option-list");
	var promptElement = $(".js-prompt"); 
	var probNum = 1;	
	handleSubmit(probNum, optListElement);
	
	renderPrompt(state, promptElement, probNum, promptTemplate);
	renderProblem(state, optListElement, probNum);	

	
}

$(document).ready(main());

