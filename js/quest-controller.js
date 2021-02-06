"use strict";

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$(".btn-start").click(onStartGuessing);
$(".btn-yes").click({ ans: "yes" }, onUserResponse);
$(".btn-no").click({ ans: "no" }, onUserResponse);
$(".restart-btn").click(onRestartGame)
$(".btn-add-guess").click(onAddGuess);


function init() {
  console.log("Started...");
  createQuestsTree();
}

function onStartGuessing() {
  // TODO: hide the game-start section
  $(".game-start").hide();
  renderQuest();
  // TODO: show the quest section
  $(".quest").show();
}

function renderQuest() {
  // TODO: select the <h2> inside quest and update
  // its text by the currQuest text
  $(".quest h2").text(gCurrQuest.txt);
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  console.log("This the currQuest at hand ", getCurrQuest());
  // If this node has no children
  if (isChildless(getCurrQuest()) || gCurrQuest[res] === null) {
    console.log('hooooo');
    if (res === "yes") {
      alert("Yes, I knew it!");
      $(".restart-btn").show()
      // TODO: improve UX
    } else {
      alert("I dont know...teach me!");
      // TODO: hide and show new-quest section
      $(".quest").hide();
      $(".new-quest").show();
    }
  } else {
    // TODO: update the lastRes global var
    console.log("I got itttt");
    gLastRes = res;
    moveToNextQuest(res);
    renderQuest();}
}

function onAddGuess(ev) {
  ev.preventDefault();
  // TODO: Get the inputs' values
  var newGuess = $("#newGuess").val();
  var newQuest = $("#newQuest").val();
  // TODO: Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes);
  onRestartGame();
}

function onRestartGame() {
  $(".new-quest").hide();
  $(".game-start").show();
  $(".quest").hide();
  $(".restart-btn").hide()
  gLastRes = null;
  gCurrQuest = gQuestsTree;
}
