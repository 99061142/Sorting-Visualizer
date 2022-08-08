import { Run } from './run.js';

export class List extends Run {
    constructor() {
        super();
        this.list = [];
        this.listDiv = document.getElementById('list');
    }

    get maxValue() {
        return Number(this.sizeSlider.max);
    }

    set maxValue(value) {
        this.sizeSlider.max = value;
    }

    get minValue() {
        return Number(this.sizeSlider.min);
    }

    get currentValue() {
        return Number(this.sizeSlider.value);
    }
    
    get randomNumber() {
        // Get a random number between the min range value and 600
        return Math.floor(Math.random() * (600 - this.minValue)) + this.minValue;
    }

    set randomList(list) {
        this.list = list;
    }

    get randomList() {
        return Array.from({length: this.currentValue}, () => this.randomNumber);
    }

    set windowList(list) {
        // Show each value in the list on the screen
        for(let value of list) {
            let div = document.createElement('div');

            div.style.height = `${value}px`;
            div.style.width = this.sizeWidth;
            this.listDiv.appendChild(div);
        }
    }

    get windowList() {
        return this.listDiv.children;
    }

    updateList() {
        let list = this.randomList;
        this.randomList = list;
        this.windowList = list;
    }

    get sizeWidth() {
        // calculate how big 1 div should be based on the width of the screen and the number of values in the list
        let width = window.innerWidth / this.list.length;
        return `${width}px`;
    }

    resizeListValues() {
        // resize every child based on the width of the screen
        for(let child of this.listDiv.children) {
            child.style.width = this.sizeWidth;
        }
    }

    resizeList() {
        // Pop off the last child / list value when the window size is decreased until the list is <= the window size
        while(this.list.length > this.sizeSlider.value) {
            this.list.pop(); // remove last value
            this.listDiv.removeChild(this.listDiv.lastChild); // remove last child 
        }
    }
}