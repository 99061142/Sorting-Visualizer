export class UpdateBoardList {
    constructor() {
        this.elements = document.getElementById('board').children;
        this.elementsAmount = this.elements.length;
        this.dict = this.startingDict();
    }


    number(i) {
        return this.elements[i].offsetHeight;
    }

    element(i) {
        return this.elements[i];
    }

    nextSmallest(i) {
        if(i+1 == this.elementsAmount) { return false; }

        // Return if right number is larger than current number
        let currentHeight = this.elements[i].offsetHeight;
        let nextHeight = this.elements[i+1].offsetHeight;
        return currentHeight > nextHeight;
    }

    previousSmaller(i) {
        if(i == 0) { return false; }

        // Return if left number is larger than current number
        let currentHeight = this.elements[i].offsetHeight;
        let previousHeight = this.elements[i-1].offsetHeight;
        return currentHeight < previousHeight;
    }

    elementSorted(i) {
        return this.elements[i].className.includes("sorted");
    }

    elementNext(i) {
        return this.elements[i].className.includes("next");
    }

    elementSelected(i) {
        return this.elements[i].className.includes("selected");
    }

    elementStandard(i) {
        let elementSorted = this.elementSorted(i);
        let elementNext = this.elementNext(i);
        let elementSelected = this.elementSelected(i);

        return !elementSorted && !elementNext && !elementSelected;
    }

    clearBoard() {
        // Set every element on the board to standard
        for(let i = 0; i < this.elementsAmount; i++) {
            if(!this.elementStandard(i)) {
                this.standard(i);
            }
        }
    }

    async fullBoardSorted() {
        // Set every element on the board to found if they are not already
        for(let i = 0; i < this.elementsAmount; i++) {
            if(!this.elementSorted(i)) { 
                await this.sorted(i);
            }
        }
    }

    async sorted(i) {
        await this.sleep();
        this.setElementClassname(i, "sorted");
    }

    async next(i) {
        await this.sleep();
        this.setElementClassname(i, "next");
    }
    
    standard(i) {
        this.setElementClassname(i, "");
    }

    selected(i) {
        this.setElementClassname(i, "selected");
    }

    setElementClassname(i, classname) {
        this.elements[i].className = classname;
    }

    sleep() {
        let speedRange = document.getElementById('speedSlider')
        let max_speed = speedRange.max
        let current = speedRange.value
        let ms = max_speed - current;
        
        if(ms) { 
            return new Promise(resolve => setTimeout(resolve, ms)); 
        }
    }

    clearBoardExceptSorted() {
        // For every element on the board
        for(let i = 0; i < this.elementsAmount; i++) {
            // If element was not found, set it to standard
            if(!this.elementSorted(i)) { 
                this.standard(i); 
            }
        }
    }

    elementPixelHeight(elementIndex) {
        return this.elements[elementIndex].style.height;
    }

    async switchHeight(currentIndex, otherIndex) {
        let currentHeight = this.elementPixelHeight(currentIndex);
        let otherHeight = this.elementPixelHeight(otherIndex);

        // Swap element heights
        this.elements[otherIndex].style.height = currentHeight;
        this.elements[currentIndex].style.height = otherHeight;
    }

    startingDict() {
        let elementsList = Array.prototype.slice.call(this.elements);

        // Create a dictionary with the elements and their heights 
        let dict = elementsList.map((element, index) => {
            return {
                index: index,
                number: element.offsetHeight
            };
        });
        return dict;
    }

    async sortElementHeights(startingDict, sortedDict) {
        let highestNumber = null;
        let highestIndex = null;

        for(let i = 0; i < sortedDict.length; i++) {
            let number = sortedDict[i].height;
            let index = startingDict[i].index

            // If the highest number is not set or the current number is higher than the highest number
            if(highestNumber == null || number > highestNumber) {
                // If the highest number is set, set the element with the highest number to standard
                if(highestIndex != null) {
                    await this.next(highestIndex);
                }

                // Set the currently highest number and element to sorted and save the index and number
                await this.sorted(index);
                highestNumber = number;
                highestIndex = index;
            } 
            else {
                await this.next(index);
            }

            // Set element height to the sorted height
            let element = this.elements[index];
            let pixelHeight = sortedDict[i].number + "px";
            element.style.height = pixelHeight;
        }
        this.standard(highestIndex);
    }
}