import { List } from './list.js';

class ListSettings extends List {
    constructor() {
        super();
        // Attributes
        this.sizeSlider = document.getElementById('listSize');
        this.newArray = document.getElementById('newArray');
        this.algorithmsOptions = document.getElementById("algorithms");
        this.runButton = document.getElementById('run-button');

        // Add event listeners
        this.sizeSliderEvent();
        this.newArrayButtonEvent();
        this.runButtonEvent();
        this.windowSizeEvent();
        
        // When page is loaded
        this.setRandomList(); // Create random list
        this.sizeSlider.max = window.innerWidth; // Set max size value to the width of the window
    }

    get listSizeValue() {
        return Number(this.sizeSlider.value);
    }

    set listSizeValue(value) {
        this.listSize = Number(value);
    }    

    sizeSliderEvent() {
        // when user releases the slider
        this.sizeSlider.addEventListener('mouseup', () => {
            this.listSizeValue = this.sizeSlider.value;
            this.setRandomList();
        });
    }

    newArrayButtonEvent() {
        // Generate new array
        this.newArray.addEventListener('click', () => {
            this.setRandomList();
        });
    }

    runButtonEvent() {
        // Run array    
        this.runButton.addEventListener('click', () => {
            this.run();
        });
    }

    windowSizeEvent() {
        window.addEventListener('resize', () => {
            this.sizeSlider.max = window.innerWidth; // Set max size value to the width of the window
            this.resizeList(); // Delete values out of list when window size is decreased
            this.resizeListValues(); // resize list values on the screen based on the new width of the screen
        });
    }

    toggleSettings() {
        // Disable or enable setting attributes when run button is clicked
        this.sizeSlider.disabled = this.running;
        this.newArray.disabled = this.running;
        this.algorithmsOptions.disabled = this.running;
        this.runButton.disabled = this.running;
    }
}
new ListSettings();