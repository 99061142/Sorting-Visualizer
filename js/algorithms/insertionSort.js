import { UpdateBoardList } from "../classes/updateBoardList.js"

export class InsertionSort extends UpdateBoardList {
    constructor(list) {
        super();
        this.list = list
    }

    async setLeftElementsFound(currentIndex) {
        // Set all elements left of the currentIndex index to found
        for(let i = currentIndex; i >= 0; i--) {
            await this.found(i);
        }
    }

    async smallest(currentIndex) {
        let currentNumber = this.list[currentIndex]
        let previousIndex = currentIndex - 1;
        let previousNumber = this.list[previousIndex];

        // Go from current index to start index except when left number is smaller than the current number
        while(currentIndex > 0 && previousNumber > currentNumber) {
            await this.next(currentIndex);
            this.switch(currentIndex, currentNumber, previousIndex, previousNumber);
            
            previousIndex--;
            currentIndex--;
            currentNumber = this.list[currentIndex];
            previousNumber = this.list[previousIndex];
        }
        await this.setLeftElementsFound(currentIndex); // Set all elements left of the currentIndex index to found
    }

    async run() {
        this.clearBoard();
        await this.found(0); // Always set the first element to found

        // For every number in the list
        for(let i = 1; i < this.list.length; i++) {
            await this.smallest(i); // Move highest number to the end of the list
            this.clearBoardExceptFound(); // Clear board except found childs
        }
        await this.setLeftElementsFound(this.list.length - 1); // Set all elements to found
        return this.list;
    }
}