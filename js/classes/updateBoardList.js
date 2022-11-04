export class UpdateBoardList {
    constructor() {
        this.elements = [...document.getElementById('board').children];
        this.numbers = null;
        this.init();
    }

    init() {
        let list = [];
        
        // For every element on the board
        for(let i = 0; i < this.elements.length; i++) {
            let number = this.element(i).offsetHeight;
            // Add the number to the list
            list.push(number);
        }
        this.numbers = list;
    }

    clearBoard() {
        // Set every element on the board to standard if they are not standard
        for(let i = 0; i < this.elementsAmount; i++) {
            if(!this.elementStandard(i) && !this.elementStandard(i)) {
                this.standard(i);
            }
        }
    }

    element(i) {
        return this.elements[i];
    }

    isSelected(i) {
        return this.element(i).className.includes("selected");
    }

    elementSorted(i) {
        return this.element(i).className.includes("sorted");
    }

    elementNext(i) {
        return this.element(i).className.includes("next");
    }

    elementSelected(i) {
        return this.element(i).className.includes("selected");
    }

    elementStandard(i) {
        let elementSorted = this.elementSorted(i);
        let elementNext = this.elementNext(i);
        let elementSelected = this.elementSelected(i);

        return !elementSorted && !elementNext && !elementSelected;
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

    setElementClassname(i, classname) {
        this.element(i).className = classname;
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

    async fullBoardSorted() {
        // Set every element on the board to sorted if they are not sorted
        for(let i = 0; i < this.numbersAmount; i++) {
            if(!this.elementSorted(i) && !this.elementSorted(i)) { 
                await this.sorted(i);
            }
        }
    }

    clearBoardExceptSorted() {
        // Set every element on the board to standard if they are not sorted
        for(let i = 0; i < this.numbersAmount; i++) {
            if(!this.elementSorted(i) && !this.elementStandard(i)) { 
                this.standard(i); 
            }
        }
    }

    nextSmallest(i) {
        if(i+1 == this.numbersAmount) { return false; }

        // Return if right number is smaller than current number
        let currentNumber = this.numbers[i];
        let rightNumber = this.numbers[i+1];
        return rightNumber < currentNumber;
    }

    previousSmaller(i) {
        if(i == 0) { return false; }

        // Return if left number is smaller than current number
        let currentNumber = this.numbers[i];
        let leftNumber = this.numbers[i-1];
        return leftNumber < currentNumber;
    }

    get numbersAmount() {
        return this.numbers.length;
    }

    number(i) {
        return this.numbers[i];
    }

    async swapHeights(i, j) {
        let numberOne = this.number(i);
        let numberTwo = this.number(j);

        this.updateHeight(i, numberOne);
        this.updateHeight(j, numberTwo);
    }

    swapNumbers(i, j) {
        let list = this.numbers;

        // Swap the elements at the left and right indices
        let temp = list[i];
        list[i] = list[j];
        list[j] = temp;

        // Swap the elements in the DOM
        this.swapHeights(i, j);
    }

    updateHeight(i, height) {
        let element = this.element(i);
        let pixelHeight = height + "px";
        element.style.height = pixelHeight;
    }

    updateNumber(i, number) {
        this.numbers[i] = number;

        // Update element height in the DOM
        this.updateHeight(i, number);
    }

    updateListNumber(listI, fullListI, number, list) {
        // Set the number in the list
        list[listI] = number;

        // Set the number in the full list
        this.updateNumber(fullListI, number);
    }
}