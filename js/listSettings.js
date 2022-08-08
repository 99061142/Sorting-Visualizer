import { List } from './list.js';

class ListSettings extends List {
    constructor() {
        super();
        this.sizeSlider = document.getElementById('listSize');
        this.listSize = Number(this.sizeSlider.value);
        this.newArray = document.getElementById('newArray');
        this.algorithmsOptions = document.getElementById("algorithms");
        this.runButton = document.getElementById('run-button');

        this.settingListeners();
        this.setRandomList();

        this.sizeSlider.max = window.innerWidth;
    }

    get listSizeValue() {
        return this.listSize;
    }

    set listSizeValue(value) {
        this.listSize = Number(value);
    }    

    listSizeListener() {
        // when user releases the slider
        this.sizeSlider.addEventListener('mouseup', () => {
            this.listSizeValue = this.sizeSlider.value;
            this.setRandomList();
        });
    }

    newArrayListener() {
        // Generate new array
        this.newArray.addEventListener('click', () => {
            this.listSizeValue = this.sizeSlider.value;
            this.setRandomList();
        });
    }

    sortArrayListener() {
        // Run array    
        this.runButton.addEventListener('click', () => {
            this.run();
        });
    }

    settingListeners() {
        this.listSizeListener();
        this.newArrayListener();
        this.sortArrayListener();
        this.windowSizeListener();
    }

    windowSizeListener() {
        window.addEventListener('resize', () => {
            this.sizeSlider.max = window.innerWidth;
            this.resizeList(); // resize list length based on the new width of the screen
            this.resizeListValues(); // resize list values on the screen based on the new width of the screen
        });
    }

    toggleSettings() {
        this.sizeSlider.disabled = this.running;
        this.newArray.disabled = this.running;
        this.algorithmsOptions.disabled = this.running;
        this.runButton.disabled = this.running;
    }
}
new ListSettings()