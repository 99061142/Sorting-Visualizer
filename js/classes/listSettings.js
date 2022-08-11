import { List } from './list.js';

export class ListSettings extends List {
    constructor() {
        super();
        // Attributes
        this.sizeSlider = document.getElementById('listSize');
        this.newArray = document.getElementById('newArray');
        this.runButton = document.getElementById('run-button');
        this.algorithmOptions = document.getElementById("algorithms");
        this.testButton = document.getElementById('test-algorithms');

        // Add event listeners
        this.sizeSliderEvent();
        this.newArrayButtonEvent();
        this.runButtonEvent();
        this.windowSizeEvent();
        this.testButtonEvent();
        
        // When page is loaded
        this.maxValue = window.innerWidth; // Set max size value to the width of the window
        this.updateList(); // Create random list
    }

    sizeSliderEvent() {
        // when user releases the slider
        this.sizeSlider.addEventListener('mouseup', () => {
            this.updateList();
        });
    }

    newArrayButtonEvent() {
        // Generate new array
        this.newArray.addEventListener('click', () => {
            this.updateList();
        });
    }

    runButtonEvent() {
        // Run array    
        this.runButton.onclick = () => {
            this.run();
        }
    }

    windowSizeEvent() {
        window.addEventListener('resize', () => {
            if(this.running) { return; }
            this.maxValue = window.innerWidth; // Set max size value to the width of the window
            this.resizeList(); // Delete values out of list when window size is decreased
            this.resizeListValues(); // resize list values on the screen based on the new width of the screen
        });
    }

    testButtonEvent() {
        // test arrays    
        this.testButton.onclick = () => {
            this.runTests();
        }
    }


    toggleSettings() {
        // Disable or enable setting attributes when run button is clicked
        this.sizeSlider.disabled = this.running;
        this.newArray.disabled = this.running;
        this.algorithmOptions.disabled = this.running;
        this.runButton.disabled = this.running;
    }
}
new ListSettings();