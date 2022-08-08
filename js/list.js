import { Run } from './run.js';

export class List extends Run {
    constructor() {
        super();
        this.list = [];
        this.listDiv = document.getElementById('list');
    }

    setRandomList() {
        this.list = this.randomList;
        this.showList();
    }

    get randomList() {
        let list = [];

        for(let i = 0; i < this.listSize; i++) {
            let random_num = Math.floor(Math.random() * 100);

            if(random_num == 0) { random_num = 1; }
            list.push(random_num);
        }
        return list;
    }

    deleteListShow() {
        // get every list div child
        let listDivChildren = this.listDiv.children;
        
        // delete every child
        while (listDivChildren.length > 0) {
            this.listDiv.removeChild(listDivChildren[0]);
        }
    }

    sizeWidth() {
        // get current width of the screen
        let width = window.innerWidth;

        // calculate how big 1 div should be based on the width of the screen and the number of values in the list
        let size = width / this.list.length;
        return `${size}px`;
    }

    createListShow() {
        for(let value of this.list) {
            // add each value to the list
            let div = document.createElement('div');

            div.style.height = `${value}px`;
            div.style.width = this.sizeWidth();
            this.listDiv.appendChild(div);
        }
    }

    resizeListValues() {
        // get every list div child
        let listDivChildren = this.listDiv.children;
        
        // resize every child
        for(let child of listDivChildren) {
            child.style.width = this.sizeWidth();
        }
    }

    showList() {
        // if list div isn't empty, delete every child inside the list div
        this.deleteListShow();
        this.createListShow();
    }

    resizeList() {
        while(this.list.length > this.sizeSlider.value) {
            this.list.pop() // remove last value
            this.listDiv.removeChild(this.listDiv.lastChild); // remove last child 
        }
    }
}