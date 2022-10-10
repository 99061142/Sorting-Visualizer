export class UpdateBoardList {
    constructor() {
        this.colors = {
            standard: 'blue',
            next: 'orange',
            found: 'green',
            smallest: 'red'
        };

        this.listDiv = document.getElementById('list');
        this.listDivChildren = this.listDiv.children;
        this.smallestIndex = null;
        this.dict = this.startingDict();
        this.speedRange = document.getElementById('listSortingSpeed')
    }

    get numbers() {
        return this.dict.map((element) => {
            return element.height;
        });
    }

    get listSize() {
        let length = this.listDiv.children.length;
        return length;
    }

    startingDict() {
        // Create a dictionary with the elements and their heights 
        let dict = Array.prototype.slice.call(this.listDivChildren).map((element) => {
            return {
                element: element, 
                height: element.offsetHeight
            }
        });
        return dict;
    }

    nextSmallest(currentIndex) {
        // If the current index is the last element, return false
        if(currentIndex == this.listDivChildren.length - 1) { return false; }

        // Compare the current element height with the next element height
        let currentHeight = this.dict[currentIndex].height;
        let nextHeight = this.dict[currentIndex+1].height;
        return currentHeight > nextHeight;
    }

    previousSmallest(currentIndex) {
        // If the current index is the first element, return false
        if(currentIndex == 0) { return false; }

        // Compare the current element height with the previous element height
        let currentHeight = this.dict[currentIndex].height;
        let previousHeight = this.dict[currentIndex-1].height;
        return currentHeight < previousHeight;
    }

    currentSmallest(currentIndex) { 
        // If the element with the index has the smallest height of all the elements that were compared
        return this.smallestIndex == currentIndex;
    }

    elementHeight(elementIndex) {
        return this.dict[elementIndex].height;
    }

    swapElementHeights(currentIndex, otherIndex) {
        let currentHeight = this.elementHeight(currentIndex);
        let otherHeight = this.elementHeight(otherIndex);

        // Swap element heights
        this.dict[otherIndex].element.style.height = currentHeight + 'px';
        this.dict[currentIndex].element.style.height = otherHeight + 'px';
    }

    swapDictHeights(currentIndex, otherIndex) {
        let currentHeight = this.elementHeight(currentIndex);
        let otherHeight = this.elementHeight(otherIndex);

        // Swap dict height
        this.dict[currentIndex].height = otherHeight
        this.dict[otherIndex].height = currentHeight
    }

    async switch(currentIndex, otherIndex) {
        // If the other index is out of bounds, return
        if(otherIndex < 0 || otherIndex >= this.listDivChildren.length) { return; }

        this.swapElementHeights(currentIndex, otherIndex);
        this.swapDictHeights(currentIndex, otherIndex);
    }

    async fullBoardFound() {
        // For every element on the board
        for(let i = 0; i < this.listDivChildren.length; i++) {
            // If element was not already found, set it to found
            if(!this.elementFound(i)) { 
                await this.found(i);
            }
        }
    }

    clearBoardExceptFound() {
        // For every element on the board
        for(let i = 0; i < this.listDivChildren.length; i++) {
            // If element was not found, set it to standard
            if(!this.elementFound(i)) { 
                this.standard(i); 
            }
        }
    }

    clearBoard() {
        // Set every element on the board to standard
        for(let i = 0; i < this.listDivChildren.length; i++) {
            this.standard(i);
        }
    }

    elementFound(i) {
        // If the element was found
        return this.dict[i].element.style.backgroundColor == this.colors['found'];
    }

    elementNext(i) {
        // If the element was next
        return this.dict[i].element.style.backgroundColor == this.colors['next'];
    }

    elementSmallest(i) {
        // If the element was smallest
        return this.dict[i].element.style.backgroundColor == this.colors['smallest'];
    }

    elementStandard(i) {
        // If the element was standard
        return this.dict[i].element.style.backgroundColor == this.colors['standard'];
    }

    async found(i) {
        await this.sleep();

        // Set element to found
        let color = this.colors['found'];
        this.setChildBackgroundColor(i, color);

        // Set smallest index as current index
        this.smallestIndex = i;
    }

    async next(i) {
        await this.sleep();

        // Set element to next
        let color = this.colors['next'];
        this.setChildBackgroundColor(i, color);
    }
    
    standard(i) {
        // Set element to standard
        let color = this.colors['standard'];
        this.setChildBackgroundColor(i, color);
    }

    current(i) {
        // Set element to smallest
        let color = this.colors['smallest'];
        this.setChildBackgroundColor(i, color);
    }


    setChildBackgroundColor(i, color) {
        this.dict[i].element.style.backgroundColor = color;
    }

    sleep() {
        let max_speed = this.speedRange.max
        let current = this.speedRange.value
        let ms = max_speed - current;
        if(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
    }
}