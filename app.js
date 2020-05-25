// Templates
var promptTemplate = (
  "<div>" +
  "<span class='js-prompt'></span>" +
  "</div>"
);

var optionTemplate = (
  "<div class='option-wrap'>" +
  "<input type='radio' class='js-radio' name='radio-option' required> " +
  "<span class='js-option option'></span>" +
  "<span class='feedback'></span>" +
  "</div>"
);

// State modification
var toggleNextAndSubmitDisabled;

function makeToggleNextAndSubmitDisabled(nextButton, submitButton) {
  return function () {
    submitButton.prop('disabled', function (i, v) {
      return !v;
    });
    nextButton.prop('disabled', function (i, v) {
      return !v;
    });
  }
}

function isCorrect(state, radioId) {
  var correctId = findCorrect(radioId, state.currentProblem);
  return radioId == correctId;
}

function findCorrect(radioId) {
  var res;
  res = state.problems[state.currentProblem].choices.find(function (option) {
    return option.correct;
  });
  return res.id;
}

function changeProblem(state) {
  state.currentProblem++;
}

function incrementCorrect(state, id) {
  if (isCorrect(state, id)) {
    state.numCorrect++;
  }
}

// Rendering
function renderOption(optText, optId, template, optAttr) {
  var element = $(template);
  element
    .find(".js-option")
    .text(optText);
  element
    .find(".js-radio")
    .attr("id", optId)

  return element;
}

function renderProblem(state, optListElement, optAttr) {
  var problemsHTML = state.problems[state.currentProblem].choices.map(
    (option, index) =>
      renderOption(option.text, index, optionTemplate));

  optListElement.html(problemsHTML);
}

function renderPrompt(state, promptElement, template) {
  var element = $(template);
  var promptText = state.problems[state.currentProblem].prompt;
  element
    .find(".js-prompt")
    .text(promptText);

  promptElement.html(element);
}

function renderFeedback(state, radioId, optListElement) {
  var correctId = findCorrect(radioId, state.currentProblem);
  var correct = isCorrect(state, radioId);

  if (correct === false) {
    $(optListElement)
      .find("#" + radioId)
      .closest("div")
      .find(".feedback")
      .text("Incorrect")
      .css("color", "red");
  }

  $(optListElement)
    .find("#" + correctId)
    .closest("div")
    .find(".feedback")
    .text("Correct")
    .css("color", "#3cb356");

}

function renderMetrics(state, currProbElement, numCorrectElement, numAnsweredElement) {
  currProbElement.text(state.currentProblem + 1);
  numCorrectElement.text(state.numCorrect);
  numAnsweredElement.text(" " + state.numAnswered);
}

function renderAll(
  state, promptElement, promptTemplate, optListElement, currProbElement, numCorrectElement, numAnsweredElement
) {
  renderPrompt(state, promptElement, promptTemplate);
  renderProblem(state, optListElement);
  renderMetrics(state, currProbElement, numCorrectElement, numAnsweredElement);
}


// Event Handlers
function handleSubmit(state, optListElement, currProbElement, numCorrectElement, numAnsweredElement) {
  $(".js-submit").click(function () {
    $("input").each(function () {
      if ($(this).is(":checked")) {
        var id = $(this).attr("id");
        state.numAnswered++;
        incrementCorrect(state, id);
        renderFeedback(state, id, optListElement);
        renderMetrics(state, currProbElement, numCorrectElement, numAnsweredElement)
        toggleNextAndSubmitDisabled();
      }
    })

  });
}

function handleNext(state, promptElement, optListElement, promptTemplate, currProbElement, numCorrectElement, numAnsweredElement) {
  $(".js-next").click(function (event) {
    event.preventDefault();

    if (state.currentProblem === state.problems.length - 1) {
      $(".js-quiz-page").css("display", "none");
      $(".js-results-page").css("display", "block");
      return;
    }

    changeProblem(state);
    renderAll(state, promptElement, promptTemplate, optListElement, currProbElement, numCorrectElement, numAnsweredElement);
    toggleNextAndSubmitDisabled();
  })
}

function main() {
  var optListElement = $(".js-option-list");
  var promptElement = $(".js-prompt");
  var currProbElement = $(".js-currProb");
  var numCorrectElement = $(".js-numCorrect");
  var numAnsweredElement = $(".js-answered");
  var startButtonElement = $(".js-start-button");
  var nextButtonElement = $(".js-next");
  var submitButtonElement = $(".js-submit");
  var tryAgainButtonElement = $(".js-try-again-button");
  var welcomePage = $(".js-welcome-page");
  var quizPage = $(".js-quiz-page");
  var totalProb = state.problems.length;
  toggleNextAndSubmitDisabled = makeToggleNextAndSubmitDisabled(nextButtonElement, submitButtonElement);

  startButtonElement.click(function () {
    welcomePage.css("display", "none");
    quizPage.css("display", "block");
  });

  tryAgainButtonElement.click(function () {
    state.currentProblem = 0;
    state.numCorrect = 0;
    state.numAnswered = 0;

    $(".js-results-page").css("display", "none");
    $(".js-quiz-page").css("display", "block");
    renderAll(state, promptElement, promptTemplate, optListElement, currProbElement, numCorrectElement, numAnsweredElement);
  })

  $(".js-totalProb").text(totalProb);
  renderAll(state, promptElement, promptTemplate, optListElement, currProbElement, numCorrectElement, numAnsweredElement);
  handleSubmit(state, optListElement, currProbElement, numCorrectElement, numAnsweredElement);
  handleNext(state, promptElement, optListElement, promptTemplate, currProbElement, numCorrectElement, numAnsweredElement);
}

$(document).ready(main());

