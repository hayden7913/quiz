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


function renderProblem(state, probElement, probNum, optAttr){
	var problemsHTML = state.problems[probNum].choices.map(
		(option, index) => 
			renderOption(option.text, index, optionTemplate)); //console.log(renderOption(option.text))}

	probElement.html(problemsHTML);
}

function renderPrompt(state, promptElement, probNum, template){
	var element = $(template);
	var promptText = state.problems[probNum].prompt;	
	element
		.find(".js-prompt")
		.text(promptText);

	promptElement.html(element);
}

function renderFeedback(radioId, probNum, probElement){
	var correctId = findCorrect(probNum);
	var correct = radioId == correctId;

	if(correct === false){
		$(probElement)
			.find("#"+radioId)
			.closest("div")
			.find(".feedback")
			.text("Incorrect")
			.css("color", "red");
	}

	$(probElement)
			.find("#"+correctId)
			.closest("div")
			.find(".feedback")
			.text("Correct")
			.css("color", "green");
	
}


// Event Handlers

function findCorrect(radioId, probNum){
	var res; 
	state.problems[probNum].choices.forEach(function (option){
		// console.log(option.id, radioId);
		if(option.correct){
			res = option.id;
		}
	});
	return res; 
}


// function isCorrect(radioId, probNum){
// 	var res; 
// 	state.problems[probNum].choices.forEach(function (option){
// 		// console.log(option.id, radioId);
// 		if(option.id == radioId){
// 			res = option.correct;
// 		}
// 	});
// 	return res; 
// }


function handleSubmit(){
	$(".js-submit").click(function (){
		$("input").each(function (){
			if($(this).is(":checked")){
				console.log("hello");
				var id = $(this).attr("id");
				console.log(id);
				//$(this).closest("div").find(".feedback").text("Chosen");
			}
		})	
	});
} 

function main(){

	var probElement = $(".js-option-list");
	var promptElement = $(".js-prompt"); 
	var probNum = 1;	
	handleSubmit();
	
	renderPrompt(state, promptElement, probNum, promptTemplate);
	renderProblem(state, probElement, probNum);	

	var id="1";
	$(probElement).find("#"+id).closest("div").find(".feedback").text("hello")
	//$("form").find("#"+id).text("hello");

	
}

$(document).ready(main());

