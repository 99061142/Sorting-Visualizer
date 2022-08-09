import { UpdateBoardList } from "../classes/UpdateBoardList.js";

export class SelectionSort extends UpdateBoardList {
    constructor(list) {
        super();
        this.list = list;
    }

    clearWaitingStyling() {
        // for every child that has the background color that isnt green
        for(let i = 0; i < this.listDiv.children.length; i++) {
            if(this.listDiv.children.item(i).style.backgroundColor != 'green') {
                this.standard(i);
            }
        }
    }

    async run() {
        // For every number in the list
        for(let i = 0; i < this.list.length; i++) {
            let currentNumber = this.list[i];
            let smallestNumberIndex = i;
            let smallestNumber = currentNumber;
            this.current(i);

            // For every number in the list after the current number
            for(let j = i + 1; j < this.list.length; j++) {
                let nextNumber = this.list[j];
                await this.next(j);

                // If the next number is smaller than the current number
                if(nextNumber < smallestNumber) {
                    smallestNumber = nextNumber;
                    smallestNumberIndex = j;
                    this.smallest(j)
                }
            }

            // If the index of the current smallest number is not the same as the current index
            if(smallestNumberIndex && i != smallestNumberIndex) {
                // Swap the current number with the smallest number
                this.list[i] = smallestNumber;
                this.list[smallestNumberIndex] = currentNumber;
            }
            // Update the height of switched elements
            this.updateHeight(i, smallestNumber);
            this.updateHeight(smallestNumberIndex, currentNumber);

            this.clearWaitingStyling(); // Clear the styling of board except green elements
        }
        return this.list;
    }
}