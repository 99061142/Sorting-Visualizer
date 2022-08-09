import { UpdateBoardList } from "../classes/UpdateBoardList.js";

export class SelectionSort extends UpdateBoardList {
    constructor() {
        super();
    }

    async run(list) {
        this.clearBoard();

        // For every number in the list
        for(let i = 0; i < list.length; i++) {
            let currentNumber = list[i];
            let smallestNumberIndex = i;
            let smallestNumber = currentNumber;

            await this.next(i); // Set current child to next color

            // For every number in the list after the current number
            for(let j = i + 1; j < list.length; j++) {
                await this.next(j);
                let nextNumber = list[j];

                // If the next number is smaller than the current number
                if(nextNumber < smallestNumber) {
                    // Save the position of the smallest number and the number itself
                    smallestNumber = nextNumber;
                    smallestNumberIndex = j;
                    this.smallest(j); // Set child to smallest color
                }
            }

            // If the index of the current smallest number is not the same as the current index
            if(smallestNumberIndex && i != smallestNumberIndex) {
                // Swap the current number with the smallest number
                list[i] = smallestNumber;
                list[smallestNumberIndex] = currentNumber;

                // Update the height of switched elements
                this.updateHeight(i, smallestNumber);
                this.updateHeight(smallestNumberIndex, currentNumber);
            }
            await this.found(i); // Set current child to found color
            this.clearBoardExceptFound();
        }
        return list
    }
}