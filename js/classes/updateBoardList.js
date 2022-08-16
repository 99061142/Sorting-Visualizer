export class UpdateBoardList {
    constructor() {
        this.colors = {
            standard: 'blue',
            next: 'orange',
            found: 'green',
            smallest: 'red'
        }

        this.listDiv = document.getElementById('list');
        this.speedRange = document.getElementById('listSortingSpeed')
        this.smallestIndex = null;
    }

    switch(currentIndex, currentNumber, previousIndex, previousNumber) {
        // Swap the current number with the number left of it
        this.list[currentIndex] = previousNumber;
        this.list[previousIndex] = currentNumber;
        this.updateHeight(currentIndex, previousNumber);
        this.updateHeight(previousIndex, currentNumber);
    }

    clearBoard() {
        for(let i = 0; i < this.children.length; i++) {
            this.standard(i);
        }
    }

    clearBoardExceptFound() {
        for(let i = 0; i < this.listDiv.children.length; i++) {
            if(!this.childFound(i)) { this.standard(i); }
        }
    }

    setChildBackgroundColor(i, color) {
        this.getChild(i).style.backgroundColor = color;
    }

    getChild(i) {
        return this.listDiv.children.item(i);
    }

    getChildBackgroundColor(i) {
        return this.getChild(i).style.backgroundColor;
    }

    childFound(i) {
        return this.getChild(i).style.backgroundColor == this.colors['found'];
    }

    sleep() {
        let max_speed = this.speedRange.max
        let current = this.speedRange.value
        let ms = max_speed - current;
        if(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
    }

    get children() {
        return this.listDiv.children;
    }

    async found(i) {
        await this.sleep();
        let color = this.colors['found'];
        this.setChildBackgroundColor(i, color);
    }

    async next(i) {
        await this.sleep();
        let color = this.colors['next'];
        this.setChildBackgroundColor(i, color);
    }
    
    standard(i) {
        let color = this.colors['standard'];
        this.setChildBackgroundColor(i, color);
    }

    smallest(i) { 
        // Set child to smallest and save child value when the child value is smaller than the current smallest value
        if(this.smallestIndex) { 
            this.next(this.smallestIndex); 
        }
        this.smallestIndex = i;

        let color = this.colors['smallest'];
        this.setChildBackgroundColor(i, color);
    }

    updateHeight(i, elementHeight) {
        this.children.item(i).style.height = `${elementHeight}px`;
        return;
    }
}