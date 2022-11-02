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
let run = new Run(switchSettingsState);
let test = new Test(switchSettingsState, resetBoard);
let board  = new Board();

function switchSettingsState(state) {
    algorithmOptions.disabled = state;
    runButton.disabled = state;
    testButton.disabled = state;
    sizeSlider.disabled = state;
    newArrayButton.disabled = state;
}

function resetBoard() {
    board.resetBoard();
}

// Run the algorithm
runButton.addEventListener('click', () => {
    run.run();
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
    board.resize();
});

// When the size is changed, update the board
sizeSlider.addEventListener('input', () => {
    board.update();
});

// When the test button is clicked, run the test
testButton.addEventListener('click', () => {
    test.test();
});