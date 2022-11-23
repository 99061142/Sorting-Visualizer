import { Run } from './run.js';
import { Test } from './test.js';
import { Board } from './board.js';

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
let runButton = document.getElementById("runButton");
runButton.addEventListener('click', () => {
    run.run();
});

// When the user clicks the new array button, create a new array
let newArrayButton = document.getElementById("newArray");
newArrayButton.addEventListener('click', () => {
    resetBoard();
});

// When the algorithm is changed, create a new array
let algorithmOptions = document.getElementById("algorithms");
algorithmOptions.addEventListener('change', () => {
    resetBoard();
});

// When the window is resized, update the board
window.addEventListener('resize', () => {
    // If the algorithm is running, return
    if(run.running) { return; }
    board.resize();
});

// When the size is changed, update the board
let sizeSlider = document.getElementById("sizeSlider");
sizeSlider.addEventListener('input', () => {
    board.update();
});

// When the test button is clicked, run the test
let testButton = document.getElementById("testButton");
testButton.addEventListener('click', () => {
    test.test();
});