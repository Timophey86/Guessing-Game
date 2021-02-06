var gQuestsTree;
var gCurrQuest;
const KEY = "Quest Tree";
var gPrevQuest = null;

function createQuestsTree() {
  if (loadFromStorage(KEY)) {
    gQuestsTree = loadFromStorage(KEY);
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
  } else {
    gQuestsTree = createQuest("Male?");
    gQuestsTree.yes = createQuest("Gandhi");
    gQuestsTree.no = createQuest("Rita");
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
  }
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  };
}

function isChildless(node) {
  return node.yes === null && node.no === null;
}

function moveToNextQuest(res) {
  // TODO: update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest;
  gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt) {
  // TODO: Create and Connect the 2 Quests to the quetsions tree
  gCurrQuest.no = createQuest(newQuestTxt);
  gCurrQuest.no.yes = createQuest(newGuessTxt);

  _saveQuestsToStorage();
}

function getCurrQuest() {
  return gCurrQuest;
}

//Storage Unit
function _saveQuestsToStorage() {
  saveToStorage(KEY, gQuestsTree);
}

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key);
  return JSON.parse(val);
}
