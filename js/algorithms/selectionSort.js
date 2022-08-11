import { UpdateBoardList } from "../classes/updateBoardList.js";

export class SelectionSort extends UpdateBoardList {
    constructor(list) {
        super();
        this.currentNumber = null;
        this.smallestNumberIndex = null;
        this.smallestNumber = null;
        this.list = list;
    }

    async smallest(currentIndex) {
        // For every number in the list after the current index
        for(let j = currentIndex + 1; j < this.list.length; j++) {
            await this.next(j);
            let nextNumber = this.list[j];

            // If the next number is smaller than the current number
            if(nextNumber < this.smallestNumber) {
                // Save the position of the smallest number and the number itself
                this.smallestNumber = nextNumber;
                this.smallestNumberIndex = j;
                this.smallest(j); // Set child to smallest color
            }
        }
    }

    switch(currentIndex) {
        // Swap the current number with the smallest number
        this.list[currentIndex] = this.smallestNumber;
        this.list[this.smallestNumberIndex] = this.currentNumber;

        // Update the height of switched elements
        this.updateHeight(currentIndex, this.smallestNumber);
        this.updateHeight(this.smallestNumberIndex, this.currentNumber);
    }

    async run() {
        this.clearBoard();

        // For every number in the list
        for(let i = 0; i < this.list.length; i++) {
            this.currentNumber = this.list[i];
            this.smallestNumberIndex = i;
            this.smallestNumber = this.currentNumber;

            await this.next(i); // Set current child to next color
            await this.smallest(i); // Check every number and set smallest child
            this.clearBoardExceptFound();
            if(i != this.smallestNumberIndex) { this.switch(i); } // Switch current with lowest number
            await this.found(i); // Set current child to found
        }
        return this.list
    }
}