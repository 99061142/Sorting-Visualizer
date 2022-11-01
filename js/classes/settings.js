import { Run } from './run.js';
import { Test } from './test.js';
import { Board } from './board.js';

// Setting buttons
let runButton = document.getElementById("runButton");
let newArrayButton = document.getElementById("newArray");
let sizeSlider = document.getElementById("sizeSlider");
let algorithmOptions = document.getElementById("algorithms");
let testButton = document.getElementById("testButton");

// Classes
let runClass = new Run(switchSettingsState);
let testClass = new Test(switchSettingsState, resetBoard);
let boardClass  = new Board();

function switchSettingsState(state) {
    algorithmOptions.disabled = state;
    runButton.disabled = state;
    testButton.disabled = state;
    sizeSlider.disabled = state;
    newArrayButton.disabled = state;
}

function resetBoard() {
    boardClass.resetBoard();
}

// Run the algorithm
runButton.addEventListener('click', () => {
    runClass.run();
});

// When the user clicks the new array button, create a new array
newArrayButton.addEventListener('click', () => {
    resetBoard();
});

// When the algorithm is changed, create a new array
algorithmOptions.addEventListener('change', () => {
    resetBoard();
});

// When the window is resized, update the board
window.addEventListener('resize', () => {
    boardClass.resize();
});

// When the size is changed, update the board
sizeSlider.addEventListener('input', () => {
    boardClass.update();
});

// When the test button is clicked, run the test
testButton.addEventListener('click', () => {
    testClass.test();
});